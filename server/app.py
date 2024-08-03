# Remote library imports
from flask import request
from flask_restful import Resource

# Local imports
from config import app, db, api
from models import User, Workout, Goal

# Views go here!

@app.route('/')
def index():
    return '<h1>Project Server</h1>'

class UserList(Resource):
    def get(self):
        users = User.query.all()
        return [{'id': user.id, 'username': user.username} for user in users]

class UserDetail(Resource):
    def get(self, user_id):
        user = User.query.get(user_id)
        if user is None:
            return {'error': 'User not found'}, 404
        return {'id': user.id, 'username': user.username}

class WorkoutList(Resource):
    def get(self):
        workouts = Workout.query.all()
        return [{'id': workout.id, 'date': workout.date, 'type': workout.type, 'duration': workout.duration} for workout in workouts]

class WorkoutDetail(Resource):
    def get(self, workout_id):
        workout = Workout.query.get(workout_id)
        if workout is None:
            return {'error': 'Workout not found'}, 404
        return {'id': workout.id, 'date': workout.date, 'type': workout.type, 'duration': workout.duration}

class GoalList(Resource):
    def get(self):
        goals = Goal.query.all()
        return [{'id': goal.id, 'description': goal.description, 'target_date': goal.target_date} for goal in goals]

class GoalDetail(Resource):
    def get(self, goal_id):
        goal = Goal.query.get(goal_id)
        if goal is None:
            return {'error': 'Goal not found'}, 404
        return {'id': goal.id, 'description': goal.description, 'target_date': goal.target_date}

api.add_resource(UserList, '/users')
api.add_resource(UserDetail, '/users/<int:user_id>')
api.add_resource(WorkoutList, '/workouts')
api.add_resource(WorkoutDetail, '/workouts/<int:workout_id>')
api.add_resource(GoalList, '/goals')
api.add_resource(GoalDetail, '/goals/<int:goal_id>')

if __name__ == '__main__':
    app.run(port=5555, debug=True)