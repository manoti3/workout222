import React, { useState } from 'react';
import pic1 from '../logo.png';
import pic2 from '../1.png';
import pic3 from '../2.png';
import pic4 from '../4.png';
import './home.css';
import { loginUser, registerUser } from '../api'; // Ensure you have these functions in your api.js

const Home = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [isLogin, setIsLogin] = useState(true); // Toggle between login and registration
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        await loginUser({ username, password });
        setMessage('Login successful!');
      } else {
        await registerUser({ username, password, email });
        setMessage('Registration successful!');
      }
    } catch (error) {
      setMessage('Error: ' + error.message);
    }
  };

  return (
    <div>
      <div className="auth-container">
        <h2>{isLogin ? 'Login' : 'Register'}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {!isLogin && (
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          )}
          <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
        </form>
        <p onClick={() => setIsLogin(!isLogin)} className="toggle-auth">
          {isLogin ? 'Need an account? Register here' : 'Already have an account? Login here'}
        </p>
        {message && <p className="message">{message}</p>}
      </div>

      <h1>Welcome to the Workout Tracker =DANIEL & ALAAK=</h1>
      <p>Track your workouts, set goals with DANIEL AND ALAAK!</p>
      <div className="image-gallery">
        <img src={pic1} alt="" className="img-fluid" />
        <img src={pic2} alt="" className="img-fluid" />
        <img src={pic3} alt="" className="img-fluid" />
        <img src={pic4} alt="" className="img-fluid" />
      </div>
    </div>
  );
};

export default Home;