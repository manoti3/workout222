# app.py
from flask import request, make_response, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_restful import Resource, Api
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from datetime import timedelta
from config import app, db, api
from models import User, Workout, Goal

# Initialize Bcrypt and JWT Manager
bcrypt = Bcrypt(app)
jwt = JWTManager(app)

# Define routes
@app.route('/')
def index():
    return '<h1>Project Server</h1>'

# User registration endpoint
@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data['username']
    email = data['email']
    password = data['password']
    user = User.query.filter_by(username=username).first()
    if user:
        return make_response(jsonify({'error': 'Username already exists'}), 400)
    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
    new_user = User(username=username, email=email, password_hash=hashed_password)
    db.session.add(new_user)
    db.session.commit()
    return make_response(jsonify({'message': 'User registered successfully'}), 201)

# User login endpoint
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data['username']
    password = data['password']
    user = User.query.filter_by(username=username).first()
    if not user or not user.check_password(password):
        return make_response(jsonify({'error': 'Invalid username or password'}), 401)
    access_token = create_access_token(identity=user.id, expires_delta=timedelta(hours=1))
    return make_response(jsonify({'access_token': access_token}), 200)

# Protected route example
@app.route('/protected', methods=['GET'])
@jwt_required()
def protected():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    return jsonify(logged_in_as=user.username), 200



# User resources
class UserList(Resource):
    def get(self):
        users = User.query.all()
        data = [user.to_dict() for user in users]
        response = make_response(jsonify(data), 200)
        response.headers['Content-Type'] = 'application/json'
        return response

    def post(self):
        try:
            new_user = User(
                username=request.get_json()["username"],
                email=request.get_json()["email"],
                password=request.get_json()["password"]
            )
            db.session.add(new_user)
            db.session.commit()
            return make_response(new_user.to_dict(), 201)
        except ValueError:
            return make_response({"errors": ["validation errors"]}, 400)

class UserDetail(Resource):
    def get(self, user_id):
        user = User.query.get(user_id)
        if user is None:
            response = make_response(jsonify({'error': 'User not found'}), 404)
            response.headers['Content-Type'] = 'application/json'
            return response
        data = user.to_dict()
        response = make_response(jsonify(data), 200)
        response.headers['Content-Type'] = 'application/json'
        return response

    def delete(self, user_id):
        user = User.query.get(user_id)
        if user is None:
            return make_response({"error": "User not found"}, 404)
        db.session.delete(user)
        db.session.commit()
        return make_response({}, 204)

    def put(self, user_id):
        user = User.query.get(user_id)
        if user is None:
            return make_response({"error": "User not found"}, 404)
        data = request.get_json()
        user.username = data.get("username", user.username)
        user.email = data.get("email", user.email)
        user.password = data.get("password", user.password)  # Update password handling as needed
        db.session.commit()
        return make_response(user.to_dict(), 200)

# Workout resources
class WorkoutList(Resource):
    def get(self):
        workouts = Workout.query.all()
        data = [workout.to_dict() for workout in workouts]
        response = make_response(jsonify(data), 200)
        response.headers['Content-Type'] = 'application/json'
        return response

    def post(self):
        try:
            new_workout = Workout(
                date=request.get_json()["date"],
                type=request.get_json()["type"],
                duration=request.get_json()["duration"],
                user_id=request.get_json()["user_id"]
            )
            db.session.add(new_workout)
            db.session.commit()
            return make_response(new_workout.to_dict(), 201)
        except ValueError:
            return make_response({"errors": ["validation errors"]}, 400)

class WorkoutDetail(Resource):
    def get(self, workout_id):
        workout = Workout.query.get(workout_id)
        if workout is None:
            response = make_response(jsonify({'error': 'Workout not found'}), 404)
            response.headers['Content-Type'] = 'application/json'
            return response
        data = workout.to_dict()
        response = make_response(jsonify(data), 200)
        response.headers['Content-Type'] = 'application/json'
        return response

    def delete(self, workout_id):
        workout = Workout.query.get(workout_id)
        if workout is None:
            return make_response({"error": "Workout not found"}, 404)
        db.session.delete(workout)
        db.session.commit()
        return make_response({}, 204)

    def put(self, workout_id):
        workout = Workout.query.get(workout_id)
        if workout is None:
            return make_response({"error": "Workout not found"}, 404)
        data = request.get_json()
        workout.date = data.get("date", workout.date)
        workout.type = data.get("type", workout.type)
        workout.duration = data.get("duration", workout.duration)
        workout.user_id = data.get("user_id", workout.user_id)
        db.session.commit()
        return make_response(workout.to_dict(), 200)

# Goal resources
class GoalList(Resource):
    def get(self):
        goals = Goal.query.all()
        data = [goal.to_dict() for goal in goals]
        response = make_response(jsonify(data), 200)
        response.headers['Content-Type'] = 'application/json'
        return response

    def post(self):
        try:
            new_goal = Goal(
                description=request.get_json()["description"],
                target_date=request.get_json()["target_date"],
                user_id=request.get_json()["user_id"]
            )
            db.session.add(new_goal)
            db.session.commit()
            return make_response(new_goal.to_dict(), 201)
        except ValueError:
            return make_response({"errors": ["validation errors"]}, 400)

class GoalDetail(Resource):
    def get(self, goal_id):
        goal = Goal.query.get(goal_id)
        if goal is None:
            response = make_response(jsonify({'error': 'Goal not found'}), 404)
            response.headers['Content-Type'] = 'application/json'
            return response
        data = goal.to_dict()
        response = make_response(jsonify(data), 200)
        response.headers['Content-Type'] = 'application/json'
        return response

    def delete(self, goal_id):
        goal = Goal.query.get(goal_id)
        if goal is None:
            return make_response({"error": "Goal not found"}, 404)
        db.session.delete(goal)
        db.session.commit()
        return make_response({}, 204)

    def put(self, goal_id):
        goal = Goal.query.get(goal_id)
        if goal is None:
            return make_response({"error": "Goal not found"}, 404)
        data = request.get_json()
        goal.description = data.get("description", goal.description)
        goal.target_date = data.get("target_date", goal.target_date)
        goal.user_id = data.get("user_id", goal.user_id)
        db.session.commit()
        return make_response(goal.to_dict(), 200)

# Add resources to API
api.add_resource(UserList, '/users')
api.add_resource(UserDetail, '/users/<int:user_id>')
api.add_resource(WorkoutList, '/workouts')
api.add_resource(WorkoutDetail, '/workouts/<int:workout_id>')
api.add_resource(GoalList, '/goals')
api.add_resource(GoalDetail, '/goals/<int:goal_id>')

if __name__ == '__main__':
    with app.app_context():
        db.create_all()  # Create tables in database
    app.run(port=5000, debug=True)
