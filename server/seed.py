# seed.py
#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc
from datetime import datetime, timedelta

# Remote library imports
from faker import Faker

# Local imports
from config import app, db
from models import User, Workout, Goal

fake = Faker()

with app.app_context():
    # Create tables if they don't exist
    db.create_all()

    print("Deleting all records...")
    User.query.delete()
    Workout.query.delete()
    Goal.query.delete()

    print("Creating users...")

    users = []
    for i in range(5):
        user = User(username=fake.user_name(), email=fake.email(), password=fake.password())
        db.session.add(user)
        users.append(user)

    print("Creating workouts...")

    workouts = []
    for i in range(20):
        workout = Workout(
            date=datetime.now() - timedelta(days=randint(1, 30)),
            type=rc(['Running', 'Swimming', 'Cycling', 'Weightlifting']),
            duration=randint(30, 120),
            user=rc(users)
        )
        db.session.add(workout)
        workouts.append(workout)

    print("Creating goals...")

    goals = []
    for i in range(20):
        goal = Goal(
            description=fake.sentence(),
            target_date=datetime.now() + timedelta(days=randint(30, 90)),
            user=rc(users)
        )
        db.session.add(goal)
        goals.append(goal)

    db.session.commit()
    print("Complete.")