import React, { useState, useEffect } from 'react';
import { getGoals } from '../api';
import './GoalList.css';

const GoalList = () => {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const data = await getGoals();
        setGoals(data);
      } catch (error) {
        console.error("Error fetching goals:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchGoals();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="goal-list-container">
      <h2 className="goal-list-header">Goal List</h2>
      <ul className="goal-list">
        {goals.map((goal, index) => (
          <li key={index} className="goal-item">
            <h1>{goal.description}</h1>
            <p className="target-date">Target Date: {goal.target_date}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GoalList;
