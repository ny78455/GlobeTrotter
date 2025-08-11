import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from config import Config
from models import db, User, Preference, Itinerary, UpcomingTrip
import uuid, json, datetime
import google.generativeai as genai

def clean_gemini_response(raw_text: str) -> str:
    """
    Trim and remove common markdown wrappers (```json ... ```),
    and stop at triple single quotes if present.
    """
    if raw_text is None:
        return ""
    text = raw_text.strip()
    # remove leading ```json or ``` and trailing ```
    if text.startswith("```json"):
        text = text[len("```json"):].strip()
    elif text.startswith("```"):
        text = text[3:].strip()

    triple_single_quote_pos = text.find("'''")
    if triple_single_quote_pos != -1:
        text = text[:triple_single_quote_pos].strip()

    if text.endswith("```"):
        text = text[:-3].strip()
    return text

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    CORS(app, resources={r"/api/*": {"origins": "*"}})
    db.init_app(app)

    with app.app_context():
        db.create_all()

    @app.get('/')
    def index():
        return jsonify({'message': 'TravelPlan API running'})

    # existing register, preferences endpoints...
    # (keep your register and save_preferences code here but remove hardcoded API key)
    # I'll show the updated preference endpoint usage briefly below.

    @app.post('/api/preferences')
    def save_preferences():
        data = request.get_json() or {}
        user_id = data.get('user_id')
        budget = data.get('budget')
        age = data.get('age')
        place_types = data.get('placeTypes', [])
        location = data.get('location')
        cuisines = data.get('cuisines', [])

        if not all([user_id, budget, age, place_types, location, cuisines]):
            return jsonify({'error': 'Missing required fields'}), 400

        pref = Preference(
            user_id=user_id,
            budget=budget,
            age=age,
            place_types=json.dumps(place_types),
            location=location,
            cuisines=json.dumps(cuisines)
        )
        db.session.add(pref)
        db.session.commit()

        # Gemini API Call - prompt should ask for safe JSON output
        prompt = f"""
Return EXACTLY a JSON array (no extra text or explanation). Each item:
{{"place_name": "...", "budget": number, "description": "...", "image_url": "...", "itinerary": ["day 1 ...","day 2 ..."]}}
My budget is ₹{budget} and my age is {age}.
I like {', '.join(place_types)}.
My location is {location}.
I like {', '.join(cuisines)}.
Return 10 places.
"""

        # configure API key from environment variable (do NOT hardcode)
        api_key = os.environ.get("GEMINI_API_KEY")
        if not api_key:
            return jsonify({'error': 'Gemini API key not configured on server'}), 500
        genai.configure(api_key=api_key)
        model = genai.GenerativeModel("gemini-1.5-flash")
        response = model.generate_content(prompt)
        cleaned_json_text = clean_gemini_response(response.text)

        try:
            gemini_json = json.loads(cleaned_json_text)
        except Exception as e:
            app.logger.exception("Invalid Gemini response")
            return jsonify({'error': 'Invalid Gemini response', 'details': str(e)}), 500

        itinerary = Itinerary(user_id=user_id, data=gemini_json)
        db.session.add(itinerary)
        db.session.commit()

        return jsonify({'message': 'Preferences saved and itinerary generated'}), 201

    # ---------------------------
    # Gemini popular cities endpoint
    # ---------------------------
    @app.get('/api/dashboard/popular_cities')
    def popular_cities():
        """
        Returns a JSON array of popular cities (ask Gemini for top cities and an image URL).
        Optionally accept query params like ?country=India to narrow results.
        """
        country = request.args.get('country', 'India')
        api_key = os.environ.get("GEMINI_API_KEY")
        if not api_key:
            return jsonify({'error': 'Gemini API key not configured on server'}), 500

        prompt = f"""
Return EXACTLY a JSON array of objects (no extra text). Each object:
{{"city":"...", "state_or_region":"...", "why_popular":"...", "image_url":"..."}}
Provide top 8 most popular cities for travelers in {country}. For image_url, provide a good public image url (Unsplash or Wikimedia preferred).
"""
        genai.configure(api_key=api_key)
        model = genai.GenerativeModel("gemini-1.5-flash")
        response = model.generate_content(prompt)
        cleaned = clean_gemini_response(response.text)
        try:
            data = json.loads(cleaned)
        except Exception as e:
            app.logger.exception("Gemini popular_cities JSON parse failed")
            return jsonify({'error': 'Invalid Gemini response', 'details': str(e), 'raw': cleaned[:500]}), 500

        return jsonify(data)

    # ---------------------------
    # Upcoming trips endpoints
    # ---------------------------
    @app.post('/api/trips')
    def create_trip():
        payload = request.get_json() or {}
        user_id = payload.get('user_id')
        title = payload.get('title')
        destination = payload.get('destination')
        start_date = payload.get('start_date')  # expect YYYY-MM-DD
        end_date = payload.get('end_date')
        notes = payload.get('notes', '')

        if not all([user_id, title, destination, start_date]):
            return jsonify({'error': 'Missing required fields'}), 400

        try:
            sd = datetime.datetime.strptime(start_date, "%Y-%m-%d").date()
            ed = datetime.datetime.strptime(end_date, "%Y-%m-%d").date() if end_date else None
        except Exception:
            return jsonify({'error': 'Invalid date format. Use YYYY-MM-DD'}), 400

        trip = UpcomingTrip(
            user_id=user_id,
            title=title,
            destination=destination,
            start_date=sd,
            end_date=ed,
            notes=notes
        )
        db.session.add(trip)
        db.session.commit()
        return jsonify({'message': 'Trip created', 'trip': trip.to_dict()}), 201

    @app.get('/api/trips/<user_id>')
    def get_trips(user_id):
        trips = UpcomingTrip.query.filter_by(user_id=user_id).order_by(UpcomingTrip.start_date).all()
        return jsonify([t.to_dict() for t in trips])

    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True)
