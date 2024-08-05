import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getGoal, deleteGoal } from '../api';

const GoalDetail = () => {
  const { goalId } = useParams();
  const [goal, setGoal] = useState(null); 

  useEffect(() => {
    const fetchGoal = async () => {
      const data = await getGoal(goalId);
      setGoal(data);
    };
    fetchGoal();
  }, [goalId]);

  const handleDelete = async () => {
    await deleteGoal(goalId);
    // Redirect or update state after deletion
  };

  if (!goal) return <div>Loading...</div>;

  return (
    <div>
      <h2>Goal Details</h2>
      <p>ID: {goal.id}</p>
      <p>Description: {goal.description}</p>
      <p>Target Date: {goal.target_date}</p>
      <button onClick={handleDelete}>Delete Goal</button>
    </div>
  );
};

export default GoalDetail;