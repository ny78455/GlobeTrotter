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
