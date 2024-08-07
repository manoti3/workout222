const API_URL = 'http://localhost:5000'; // Make sure this matches your backend URL

// User API
export const getUsers = async () => {
  const response = await fetch(`${API_URL}/users`);
  const data = await response.json();
  return data;
};

export const getUser = async (id) => {
  const response = await fetch(`${API_URL}/users/${id}`);
  const data = await response.json();
  console.log(data,"from API")
  return data;
};

export const addUser = async (user) => {
  const response = await fetch(`${API_URL}/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  });
  const data = await response.json();
  return data;
};

export const updateUser = async (id, user) => {
  const response = await fetch(`${API_URL}/users/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  });
  const data = await response.json();
  return data;
};

export const deleteUser = async (id) => {
  await fetch(`${API_URL}/users/${id}`, { method: 'DELETE' });
};

// Workout API
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

export const addWorkout = async (workout) => {
  const response = await fetch(`${API_URL}/workouts`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(workout),
  });
  const data = await response.json();
  return data;
};

export const updateWorkout = async (id, workout) => {
  const response = await fetch(`${API_URL}/workouts/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(workout),
  });
  const data = await response.json();
  return data;
};

export const deleteWorkout = async (id) => {
  await fetch(`${API_URL}/workouts/${id}`, { method: 'DELETE' });
};

// Goal API
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

export const addGoal = async (goal) => {
  const response = await fetch(`${API_URL}/goals`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(goal),
  });
  const data = await response.json();
  return data;
};

export const updateGoal = async (id, goal) => {
  const response = await fetch(`${API_URL}/goals/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(goal),
  });
  const data = await response.json();
  return data;
};

export const deleteGoal = async (id) => {
  await fetch(`${API_URL}/goals/${id}`, { method: 'DELETE' });
};



export const loginUser = async (credentials) => {
  const response = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  });
  if (!response.ok) throw new Error('Login failed');
  return response.json();
};

export const registerUser = async (credentials) => {
  const response = await fetch(`${API_URL}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  });
  if (!response.ok) throw new Error('Registration failed');
  return response.json();
};
