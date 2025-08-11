from flask import Flask, request, jsonify
from flask_cors import CORS
from config import Config
from models import db, User, Preference, Itinerary
import uuid, json
import google.generativeai as genai

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

    @app.post('/api/auth/register')
    def register():
        data = request.get_json() or {}
        name, email, mobile = data.get('name'), data.get('email'), data.get('mobile')

        if not all([name, email, mobile]):
            return jsonify({'error': 'Missing required fields'}), 400

        if User.query.filter_by(email=email).first():
            return jsonify({'error': 'Email already registered'}), 409

        user = User(id=str(uuid.uuid4()), name=name, email=email, mobile=mobile)
        db.session.add(user)
        db.session.commit()
        return jsonify({'message': 'User registered', 'user': user.to_dict()}), 201

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
        My salary is ₹{budget} and my age is {age}.
        I like {', '.join(place_types)}.
        My location is {location}.
        I like {', '.join(cuisines)}.
        Give me 30 best locations to visit in my budget along with itinerary.
        Return only valid JSON with fields: place_name, budget, description, image_url, itinerary (array of daily plan)
        """

        genai.configure(api_key="AIzaSyApDq0xuq_uhGM6RPCat00cI0dg-ep3QcQ")
        model = genai.GenerativeModel("gemini-1.5-flash")
        response = model.generate_content(prompt)

        try:
            gemini_json = json.loads(response.text)
        except Exception:
            return jsonify({'error': 'Invalid Gemini response'}), 500

        itinerary = Itinerary(user_id=user_id, data=gemini_json)
        db.session.add(itinerary)
        db.session.commit()

        return jsonify({'message': 'Preferences saved and itinerary generated'}), 201

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
