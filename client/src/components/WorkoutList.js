import React, { useState, useEffect } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { getWorkouts, deleteWorkout, addWorkout, getWorkout, updateWorkout } from '../api';
import './WorkoutList.css';

const WorkoutList = () => {
  const history = useHistory();
  const { id } = useParams();
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [date, setDate] = useState('');
  const [type, setType] = useState('');
  const [duration, setDuration] = useState('');
  const [isEditing, setIsEditing] = useState(false);

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

  useEffect(() => {
    if (id) {
      const fetchWorkout = async () => {
        const data = await getWorkout(id);
        setDate(data.date);
        setType(data.type);
        setDuration(data.duration);
      };
      fetchWorkout();
      setIsEditing(true);
    }
  }, [id]);

  const handleViewWorkout = (id) => {
    history.push(`/workouts/${id}`);
  };

  const handleDeleteWorkout = async (id) => {
    await deleteWorkout(id);
    setWorkouts(workouts.filter(workout => workout.id !== id));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEditing) {
      await updateWorkout(id, { date, type, duration });
    } else {
      await addWorkout({ date, type, duration });
    }
    history.push('/workouts');
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="workout-list-container">
      <h2 className="workout-list-header">Workout List</h2>
      <Link to="/workouts/add">Add Workout</Link>
      <ul className="workout-list">
        {workouts.map((workout) => (
          <li key={workout.id} className="workout-item">
            <h1>{workout.date} - {workout.type} ({workout.duration} mins)</h1>
            <button onClick={() => handleViewWorkout(workout.id)}>View Workout</button>
            <Link to={`/workouts/edit/${workout.id}`}>Edit</Link>
            <button onClick={() => handleDeleteWorkout(workout.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <label>
          Date:
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </label>
        <br />
        <label>
          Type:
          <input type="text" value={type} onChange={(e) => setType(e.target.value)} />
        </label>
        <br />
        <label>
          Duration:
          <input type="number" value={duration} onChange={(e) => setDuration(e.target.value)} />
        </label>
        <br />
        <button type="submit">{isEditing ? 'Save Changes' : 'Add Workout'}</button>
      </form>
    </div>
  );
};

export default WorkoutList;