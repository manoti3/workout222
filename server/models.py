from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from flask_sqlalchemy import SQLAlchemy
from config import db

class User(db.Model, SerializerMixin):
    id: int = db.Column(db.Integer, primary_key=True)
    username: str = db.Column(db.String(80), unique=True, nullable=False)
    email: str = db.Column(db.String(120), unique=True, nullable=False)
    password: str = db.Column(db.String(200), nullable=False)
    workouts = db.relationship('Workout', backref='user', lazy=True)
    goals = db.relationship('Goal', backref='user', lazy=True)

class Workout(db.Model, SerializerMixin):
    id: int = db.Column(db.Integer, primary_key=True)
    date: str = db.Column(db.String(10), nullable=False)
    type: str = db.Column(db.String(50), nullable=False)
    duration: int = db.Column(db.Integer, nullable=False)  # Duration in minutes
    user_id: int = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

class Goal(db.Model, SerializerMixin):
    id: int = db.Column(db.Integer, primary_key=True)
    description: str = db.Column(db.String(200), nullable=False)
    target_date: str = db.Column(db.String(10), nullable=False)
    user_id: int = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)