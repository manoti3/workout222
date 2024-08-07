import React, { useState, useEffect } from 'react';
import { getUsers, getWorkouts, getGoals } from '../api'; 
import './Dashboard.css'; 

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [workouts, setWorkouts] = useState([]);
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const [usersData, workoutsData, goalsData] = await Promise.all([
          getUsers(),
          getWorkouts(),
          getGoals()
        ]);
        setUsers(usersData || []);
        setWorkouts(workoutsData || []);
        setGoals(goalsData || []);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div className="loading-spinner">Loading...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="dashboard__container">
      <h2>Dashboard</h2>
      <div className="dashboard__grid">
        <div className="widget">
          <h3>Users</h3>
          <ul>
            {users.length > 0 ? (
              users.map(user => (
                <li key={user.id}>
                  <p>{user.username}</p>
                </li>
              ))
            ) : (
              <li>No users available.</li>
            )}
          </ul>
        </div>
        <div className="widget">
          <h3>Workouts</h3>
          <ul>
            {workouts.length > 0 ? (
              workouts.map(workout => (
                <li key={workout.id}>
                  <p>{workout.type}</p>
                </li>
              ))
            ) : (
              <li>No workouts available.</li>
            )}
          </ul>
        </div>
        <div className="widget">
          <h3>Goals</h3>
          <ul>
            {goals.length > 0 ? (
              goals.map(goal => (
                <li key={goal.id}>
                  <p>{goal.description}</p>
                </li>
              ))
            ) : (
              <li>No goals available.</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
