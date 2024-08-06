import React, { useState, useEffect } from 'react';
import { getUsers, getWorkouts, getGoals } from '../api'; 
import './Dashboard.css'; 

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [workouts, setWorkouts] = useState([]);
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
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
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div className="loading-spinner">Loading...</div>;

  return (
    <div className="dashboard-container">
      <h2>Dashboard</h2>
      <div className="dashboard-grid">
        <div className="widget">
          <h3>Users</h3>
          <ul>
            {users.length > 0 ? (
              users.map(user => (
                <li key={user.id}>{user.username}</li>
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
                  {workout.date} - {workout.type} ({workout.duration} mins)
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
                  {goal.description} - Target Date: {goal.target_date}
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
