import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getWorkouts } from '../api';

const WorkoutList = () => {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const data = await getWorkouts();
        setWorkouts(data);
      } catch (error) {
        console.error("Error fetching workouts:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchWorkouts();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h2>Workout List</h2>
      <ul>
        {workouts.length > 0 ? (
          workouts.map(workout => (
            <li key={workout.id}>
              <Link to={`/workouts/${workout.id}`}>
                {workout.date} - {workout.type} ({workout.duration} mins)
              </Link>
            </li>
          ))
        ) : (
          <li>No workouts available.</li>
        )}
      </ul>
    </div>
  );
};

export default WorkoutList;
