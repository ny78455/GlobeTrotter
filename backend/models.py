from flask_sqlalchemy import SQLAlchemy
import datetime

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.String(36), primary_key=True)
    name = db.Column(db.String(150), nullable=False)
    email = db.Column(db.String(255), nullable=False, unique=True)
    mobile = db.Column(db.String(50), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)

    preferences = db.relationship("Preference", backref="user", lazy=True)
    itineraries = db.relationship("Itinerary", backref="user", lazy=True)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'email': self.email,
            'mobile': self.mobile,
            'created_at': self.created_at.isoformat()
        }

class Preference(db.Model):
    __tablename__ = 'preferences'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.String(36), db.ForeignKey('users.id'), nullable=False)
    budget = db.Column(db.Integer, nullable=False)
    age = db.Column(db.Integer, nullable=False)
    place_types = db.Column(db.Text, nullable=False)  # store JSON string
    location = db.Column(db.String(255), nullable=False)
    cuisines = db.Column(db.Text, nullable=False)  # store JSON string
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)

class Trip(db.Model):
    __tablename__ = 'trips'
    id = db.Column(db.String(36), primary_key=True)
    user_id = db.Column(db.String(36), db.ForeignKey('users.id'), nullable=False)
    name = db.Column(db.String(150), nullable=False)
    description = db.Column(db.Text, nullable=True)
    start_date = db.Column(db.Date, nullable=False)
    end_date = db.Column(db.Date, nullable=False)
    budget = db.Column(db.Integer, nullable=True)
    cover_image = db.Column(db.String(255), nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'name': self.name,
            'description': self.description,
            'startDate': self.start_date.isoformat(),
            'endDate': self.end_date.isoformat(),
            'budget': self.budget,
            'coverImage': self.cover_image,
            'created_at': self.created_at.isoformat()
        }

class Itinerary(db.Model):
    __tablename__ = 'itineraries'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.String(36), db.ForeignKey('users.id'), nullable=False)
    data = db.Column(db.JSON, nullable=False)  # store Gemini response JSON
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)

class Upcoming(db.Model):
    __tablename__ = 'upcoming'
    id = db.Column(db.String(36), primary_key=True)
    user_id = db.Column(db.String(36), db.ForeignKey('users.id'), nullable=False)
    trip_name = db.Column(db.String(150), nullable=False)
    start_date = db.Column(db.Date, nullable=False)
    end_date = db.Column(db.Date, nullable=False)
    location = db.Column(db.String(255), nullable=False)
    notes = db.Column(db.Text, nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'trip_name': self.trip_name,
            'start_date': self.start_date.isoformat(),
            'end_date': self.end_date.isoformat(),
            'location': self.location,
            'notes': self.notes,
            'created_at': self.created_at.isoformat()
        }


class Profile(db.Model):
    __tablename__ = 'profiles'
    id = db.Column(db.String(36), primary_key=True)
    user_id = db.Column(db.String(36), db.ForeignKey('users.id'), nullable=False, unique=True)
    bio = db.Column(db.Text, nullable=True)
    profile_image = db.Column(db.String(255), nullable=True)
    social_links = db.Column(db.JSON, nullable=True)  # store links as JSON
    preferences_summary = db.Column(db.Text, nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'bio': self.bio,
            'profile_image': self.profile_image,
            'social_links': self.social_links,
            'preferences_summary': self.preferences_summary,
            'created_at': self.created_at.isoformat()
        }


class Statistics(db.Model):
    __tablename__ = 'statistics'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.String(36), db.ForeignKey('users.id'), nullable=False)
    total_trips = db.Column(db.Integer, default=0)
    total_budget_spent = db.Column(db.Integer, default=0)
    total_days_traveled = db.Column(db.Integer, default=0)
    favorite_city = db.Column(db.String(255), nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'total_trips': self.total_trips,
            'total_budget_spent': self.total_budget_spent,
            'total_days_traveled': self.total_days_traveled,
            'favorite_city': self.favorite_city,
            'created_at': self.created_at.isoformat()
        }


class City(db.Model):
    __tablename__ = 'cities'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(150), nullable=False)
    country = db.Column(db.String(150), nullable=False)
    description = db.Column(db.Text, nullable=True)
    attractions = db.Column(db.JSON, nullable=True)  # list of popular attractions
    best_season = db.Column(db.String(100), nullable=True)
    image_url = db.Column(db.String(255), nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'country': self.country,
            'description': self.description,
            'attractions': self.attractions,
            'best_season': self.best_season,
            'image_url': self.image_url,
            'created_at': self.created_at.isoformat()
        }

