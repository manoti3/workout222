import React, { useState, useEffect } from 'react';
import { getWorkouts } from '../api';
import './WorkoutList.css';

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
    <div className="workout-list-container">
      <h2 className="workout-list-header">Workout List</h2>
      <ul className="workout-list">
        {workouts.map((workout, index) => (
          <li key={index} className="workout-item">
            <h1>{workout.date} - {workout.type} ({workout.duration} mins)</h1>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WorkoutList;
