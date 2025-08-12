from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from config import Config
from models import db, User, Preference, Itinerary, Trip
import datetime
import os
import uuid
import json
import google.generativeai as genai
from werkzeug.security import generate_password_hash, check_password_hash
import pathlib


def clean_gemini_response(raw_text: str) -> str:
    """
    Cleans Gemini's JSON output by removing markdown wrappers and trailing text.
    """
    text = raw_text.strip()
    if text.startswith("```json"):
        text = text[len("```json"):].strip()

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

    # Serve images from frontend/public/images
    @app.route('/images/<path:filename>')
    def serve_image(filename):
        return send_from_directory('frontend/public/images', filename)

    # API to list all images in frontend/public/images
    @app.get('/api/images')
    def list_images():
        images_dir = pathlib.Path('/home/nitin/Downloads/Travel_planner/frontend/public/images')
        if not images_dir.exists():
            return jsonify({'error': 'Images folder not found'}), 404
        image_files = [
            f.name for f in images_dir.iterdir()
            if f.is_file() and f.suffix.lower() in {'.jpg', '.jpeg', '.png', '.gif', '.webp','.avif'}
        ]
        image_urls = [f'/images/{filename}' for filename in image_files]
        return jsonify(image_urls)

    # ---------- AUTH ROUTES ----------
    @app.post('/api/auth/register')
    def register():
        data = request.get_json() or {}
        name = data.get('name')
        email = data.get('email')
        password = data.get('password')

        if not all([name, email, password]):
            return jsonify({'error': 'Missing required fields'}), 400

        if User.query.filter_by(email=email).first():
            return jsonify({'error': 'Email already registered'}), 409

        user = User(id=str(uuid.uuid4()), name=name, email=email)
        user.password_hash = generate_password_hash(password)

        db.session.add(user)
        db.session.commit()

        return jsonify({'message': 'User registered', 'user': user.to_dict()}), 201

    @app.post('/api/auth/login')
    def login():
        data = request.get_json() or {}
        email = data.get('email')
        password = data.get('password')

        if not all([email, password]):
            return jsonify({'error': 'Missing required fields'}), 400

        user = User.query.filter_by(email=email).first()
        if not user or not check_password_hash(user.password_hash, password):
            return jsonify({'error': 'Invalid credentials'}), 401

        return jsonify({'message': 'Login successful', 'user': user.to_dict()}), 200

    # ---------- TRIP ROUTES ----------
    @app.post('/api/trips')
    def create_trip():
        data = request.get_json() or {}
        user_id = data.get('user_id')
        name = data.get('name')
        description = data.get('description', '')
        start_date = data.get('startDate')
        end_date = data.get('endDate')
        budget = data.get('budget')
        cover_image = data.get('coverImage', '')

        if not all([user_id, name, start_date, end_date]):
            return jsonify({'error': 'Missing required fields'}), 400

        trip = Trip(
            id=str(uuid.uuid4()),
            user_id=user_id,
            name=name,
            description=description,
            start_date=datetime.datetime.strptime(start_date, "%Y-%m-%d").date(),
            end_date=datetime.datetime.strptime(end_date, "%Y-%m-%d").date(),
            budget=budget,
            cover_image=cover_image
        )

        db.session.add(trip)
        db.session.commit()

        return jsonify({'message': 'Trip created', 'trip': trip.to_dict()}), 201

    @app.get('/api/trips/<user_id>')
    def get_trips(user_id):
        trips = Trip.query.filter_by(user_id=user_id).order_by(Trip.created_at.desc()).all()
        return jsonify([t.to_dict() for t in trips])

    # ---------- PREFERENCES & ITINERARY ----------
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

        # Gemini API Call
        prompt = f"""
My budget is ₹{budget} and my age is {age}.
I like {', '.join(place_types)}.
My location is {location}.
I like {', '.join(cuisines)}.
Give me exactly 10 best locations to visit in my budget with itinerary and for images get from google or some other platform.
Return ONLY valid JSON with no comments or extra text.
The JSON should be an array with fields: place_name, budget, description, image_url, itinerary (array of daily plan).
"""

        genai.configure(api_key="AIzaSyApDq0xuq_uhGM6RPCat00cI0dg-ep3QcQ")
        model = genai.GenerativeModel("gemini-1.5-flash")
        response = model.generate_content(prompt)

        cleaned_json_text = clean_gemini_response(response.text)
        print(cleaned_json_text)

        try:
            gemini_json = json.loads(cleaned_json_text)
        except Exception as e:
            print("JSON decode error:", e)
            return jsonify({'error': 'Invalid Gemini response'}), 500

        itinerary = Itinerary(user_id=user_id, data=gemini_json)
        db.session.add(itinerary)
        db.session.commit()

        os.makedirs("itineraries", exist_ok=True)
        file_path = os.path.join("itineraries", f"{user_id}.json")
        with open(file_path, "w", encoding="utf-8") as f:
            json.dump(gemini_json, f, ensure_ascii=False, indent=2)

        return jsonify({'message': 'Preferences saved and itinerary generated'}), 201

    @app.get('/api/local-itinerary/<user_id>')
    def get_local_itinerary(user_id):
        file_path = os.path.join("itineraries", f"{user_id}.json")
        if not os.path.exists(file_path):
            return jsonify({'error': 'Itinerary not found'}), 404
        return send_from_directory("itineraries", f"{user_id}.json")

    @app.get('/api/itineraries/<user_id>')
    def get_itineraries(user_id):
        itin = Itinerary.query.filter_by(user_id=user_id).order_by(Itinerary.created_at.desc()).first()
        if not itin:
            return jsonify({'error': 'No itineraries found'}), 404
        return jsonify(itin.data)

    return app


if __name__ == '__main__':
    app = create_app()
    app.run(debug=True)
