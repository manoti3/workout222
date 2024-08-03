const API_URL = 'http://localhost:5555'; // Make sure this matches your backend URL

export const getUsers = async () => {
  const response = await fetch(`${API_URL}/users`);
  const data = await response.json();
  return data;
};

export const getUser = async (id) => {
  const response = await fetch(`${API_URL}/users/${id}`);
  const data = await response.json();
  return data;
};

export const deleteUser = async (id) => {
  await fetch(`${API_URL}/users/${id}`, { method: 'DELETE' });
};

export const getWorkouts = async () => {
  const response = await fetch(`${API_URL}/workouts`);
  const data = await response.json();
  return data;
};

export const getWorkout = async (id) => {
  const response = await fetch(`${API_URL}/workouts/${id}`);
  const data = await response.json();
  return data;
};

export const deleteWorkout = async (id) => {
  await fetch(`${API_URL}/workouts/${id}`, { method: 'DELETE' });
};

export const getGoals = async () => {
  const response = await fetch(`${API_URL}/goals`);
  const data = await response.json();
  return data;
};

export const getGoal = async (id) => {
  const response = await fetch(`${API_URL}/goals/${id}`);
  const data = await response.json();
  return data;
};

export const deleteGoal = async (id) => {
  await fetch(`${API_URL}/goals/${id}`, { method: 'DELETE' });
};
