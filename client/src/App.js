import React from 'react';
import { Route, Routes } from 'react-router-dom'; // Correct imports for v6
import Home from './components/Home';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import UserList from './components/UserList';
import UserDetail from './components/UserDetail';
import WorkoutList from './components/WorkoutList';
import WorkoutDetail from './components/WorkoutDetail';
import GoalList from './components/GoalList';
import GoalDetail from './components/GoalDetail';
import AboutUs from './components/AboutUs';

const App = () => (
  <>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/users" element={<UserList />} />
      <Route path="/users/:id" element={<UserDetail />} />
      <Route path="/workouts" element={<WorkoutList />} />
      <Route path="/workouts/:workoutId" element={<WorkoutDetail />} />
      <Route path="/goals" element={<GoalList />} />
      <Route path="/goals/:goalId" element={<GoalDetail />} />
      <Route path="/about-us" element={<AboutUs />} />
    </Routes>
  </>
);

export default App;
