# models.py
from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy_serializer import SerializerMixin
from werkzeug.security import generate_password_hash, check_password_hash
from flask_bcrypt import Bcrypt

from config import db

bcrypt = Bcrypt()

class User(db.Model, SerializerMixin):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String, nullable=False)

    user_workouts = db.relationship('Workout', back_populates='user', cascade="all, delete")
    user_goals = db.relationship('Goal', back_populates='user', cascade="all, delete")

    workouts = association_proxy('user_workouts', 'workout')
    goals = association_proxy('user_goals', 'goal')

    serialize_rules = ('-user_workouts.user', '-user_goals.user')

    @classmethod
    def create(cls, username, email, password):
        try:
            user = cls(username=username, email=email)
            user.password = password
            db.session.add(user)
            db.session.commit()
            return user
        except Exception as e:
            print(f"Error creating user: {e}")
            return None

    @property
    def password(self):
        raise AttributeError('password is not readable attribute')

    @password.setter
    def password(self, password):
        try:
            self.password_hash = bcrypt.generate_password_hash(password).decode('utf-8')
        except Exception as e:
            print(f"Error setting password: {e}")
            raise ValueError("Error setting password")

    def check_password(self, password):
        return bcrypt.check_password_hash(self.password_hash, password)

    def validate_username(self, key, username):
        if not username:
            raise ValueError("Username cannot be empty")
        return username

    def validate_email(self, key, email):
        if not email:
            raise ValueError("Email cannot be empty")
        return email

    def to_dict(self):
        return {'id': self.id, 'username': self.username}

    def __repr__(self):
        return f"<User {self.username}>"

class Workout(db.Model, SerializerMixin):
    __tablename__ = "workouts"

    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.String(10), nullable=False)
    type = db.Column(db.String(50), nullable=False)
    duration = db.Column(db.Integer, nullable=False)

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    user = db.relationship('User', back_populates='user_workouts')

    @validates('date')
    def validate_date(self, key, date):
        if not date:
            raise ValueError("Date cannot be empty")
        return date

    @validates('type')
    def validate_type(self, key, type):
        if not type:
            raise ValueError("Type cannot be empty")
        return type

    @validates('duration')
    def validate_duration(self, key, duration):
        if duration <= 0:
            raise ValueError("Duration must be greater than 0")
        return duration

    def to_dict(self):
        return {'id': self.id, 'date': self.date, 'type': self.type, 'duration': self.duration}

    def __repr__(self):
        return f"<Workout {self.date} {self.type} {self.duration}>"

class Goal(db.Model, SerializerMixin):
    __tablename__ = "goals"

    id = db.Column(db.Integer, primary_key=True)
    description = db.Column(db.String(200), nullable=False)
    target_date = db.Column(db.String(10), nullable=False)

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    user = db.relationship('User', back_populates='user_goals')

    @validates('description')
    def validate_description(self, key, description):
        if not description:
            raise ValueError("Description cannot be empty")
        return description

    @validates('target_date')
    def validate_target_date(self, key, target_date):
        if not target_date:
            raise ValueError("Target date cannot be empty")
        return target_date

    def to_dict(self):
        return {'id': self.id, 'description': self.description, 'target_date': self.target_date}

    def __repr__(self):
        return f"<Goal {self.description} {self.target_date}>"