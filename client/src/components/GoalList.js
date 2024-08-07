import React, { useState, useEffect } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { getGoals, addGoal, updateGoal, deleteGoal, getGoal } from '../api';
import './GoalList.css';


const GoalList = () => {
  const history = useHistory();
  const { id } = useParams();
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [description, setDescription] = useState('');
  const [targetDate, setTargetDate] = useState('');
  const [isEditing, setIsEditing] = useState(false);

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

  useEffect(() => {
    if (id) {
      const fetchGoal = async () => {
        const data = await getGoal(id);
        setDescription(data.description);
        setTargetDate(data.target_date);
      };
      fetchGoal();
      setIsEditing(true);
    }
  }, [id]);

  const handleViewGoal = (id) => {
    history.push(`/goals/${id}`);
  };

  const handleDeleteGoal = async (id) => {
    await deleteGoal(id);
    setGoals(goals.filter(goal => goal.id !== id));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEditing) {
      await updateGoal(id, { description, target_date: targetDate });
    } else {
      await addGoal({ description, target_date: targetDate });
    }
    history.push('/goals');
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="goal-list-container">
      <h2 className="goal-list-header">Goal List</h2>
      <Link to="/goals/add">Add Goal</Link>
      <form onSubmit={handleSubmit}>
        <label>
          Description:
          <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
        </label>
        <br />
        <label>
          Target Date:
          <input type="date" value={targetDate} onChange={(e) => setTargetDate(e.target.value)} />
        </label>
        <br />
        <button type="submit">{isEditing ? 'Save Changes' : 'Add Goal'}</button>
      </form>
      <ul className="goal-list">
        {goals.map((goal) => (
          <li key={goal.id} className="goal-item">
            <h1>{goal.description}</h1>
            <p className="target-date">Target Date: {goal.target_date}</p>
            <button onClick={() => handleViewGoal(goal.id)}>View Goal</button>
            <Link to={`/goals/edit/${goal.id}`}>Edit</Link>
            <button onClick={() => handleDeleteGoal(goal.id)}>Delete</button>
          </li>
        ))}
      </ul>
     
    </div>
  );
};

export default GoalList;