// src/pages/Home.js
import React from 'react';
import pic1 from '../logo.png';
import pic2 from '../1.png';
import pic3 from '../2.png';
import pic4 from '../4.png';
import './home.css';

const Home = () => {
  return (
    <div>
      <h1>Welcome to the Workout Tracker App</h1>
      <p>Track your workouts, set goals, and more!</p>
      <div className="image-gallery">
        <img src={pic1} alt="Picture 1" className="img-fluid" />
        <img src={pic2} alt="Picture 2" className="img-fluid" />
        <img src={pic3} alt="Picture 3" className="img-fluid" />
        <img src={pic4} alt="Picture 4" className="img-fluid" />
      </div>
    </div>
  );
};

export default Home;