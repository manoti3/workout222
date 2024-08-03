import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getGoals } from '../api';

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
    <div>
      <h2>Goal List</h2>
      <ul>
        {goals.length > 0 ? (
          goals.map(goal => (
            <li key={goal.id}>
              <Link to={`/goals/${goal.id}`}>
                {goal.description} - Target Date: {goal.target_date}
              </Link>
            </li>
          ))
        ) : (
          <li>No goals available.</li>
        )}
      </ul>
    </div>
  );
};

export default GoalList;
