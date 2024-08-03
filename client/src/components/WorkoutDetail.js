import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getWorkout, deleteWorkout } from '../api';

const WorkoutDetail = () => {
  const { workoutId } = useParams();
  const [workout, setWorkout] = useState(null);

  useEffect(() => {
    const fetchWorkout = async () => {
      const data = await getWorkout(workoutId);
      setWorkout(data);
    };
    fetchWorkout();
  }, [workoutId]);

  const handleDelete = async () => {
    await deleteWorkout(workoutId);
    // Redirect or update state after deletion
  };

  if (!workout) return <div>Loading...</div>;

  return (
    <div>
      <h2>Workout Details</h2>
      <p>ID: {workout.id}</p>
      <p>Date: {workout.date}</p>
      <p>Type: {workout.type}</p>
      <p>Duration: {workout.duration}</p>
      <button onClick={handleDelete}>Delete Workout</button>
    </div>
  );
};

export default WorkoutDetail;
