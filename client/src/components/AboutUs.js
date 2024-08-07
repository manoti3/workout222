import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AboutUs.css';

const AboutUs = () => {
  const navigate = useNavigate();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className="about-us-container">
      <div className="about-us-content">
        <h1 className="title">About Workout Tracker</h1>
        <div className='about-div'>
          <img src="https://imgs.search.brave.com/HWvL7X_NDdpsOIefDLM6IPJ8glJM7jKED29hQ_-gThc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS1waG90by90/b3Atdmlldy1wZXJm/ZWN0bHktb3JkZXJl/ZC1maXRuZXNzLWl0/ZW1zXzIzLTIxNTAz/MjE4MDkuanBnP3Np/emU9NjI2JmV4dD1q/cGc" alt="Workout" />
          <div className='description-about'>
            <p>Welcome to Workout Tracker, your ultimate platform for tracking workouts, setting fitness goals, and achieving a healthier lifestyle.</p>
            <p>Founded in 2024, Workout Tracker is designed to help fitness enthusiasts and athletes of all levels monitor their progress and stay motivated. Our platform provides comprehensive tools for tracking workouts, setting and achieving goals, and connecting with a community of like-minded individuals.</p>
          </div>
        </div>
        <h2 className="subtitle">Our Mission</h2>
        <div className='mission'>
          <p className="description-mission">Our mission at Workout Tracker is to empower individuals to reach their fitness goals by providing a user-friendly and efficient platform for workout tracking. We aim to inspire a healthier lifestyle through consistent monitoring, personalized insights, and a supportive community.</p>
          <img src="https://imgs.search.brave.com/PRyuTKjuXEFjg4fTtPfkCSbEtcViIuGd5FpqixpmDZw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS1waG90by9m/dWxsLWJvZHktaW1h/Z2Utc3BvcnR5LWZl/bWFsZS1ob2xkcy1k/dW1iYmVsbHMtZG9p/bmctc3F1YXRzLWd5/bV82MTM5MTAtMTEz/NjcuanBnP3NpemU9/NjI2JmV4dD1qcGc" alt="Mission" />
        </div>
        <h2 className="subtitle">What Sets Us Apart?</h2>
        <div className='values'>
          <img src="https://imgs.search.brave.com/suL-TFE7g2soL1YxrfMgZAiMFad-OLaW0LxUhz5ZysA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTkx/NzE4NzIyMS9waG90/by9ncm91cC1vZi1z/cG9ydHktZnJpZW5k/cy1kb2luZy1zcXVh/dHMtd2l0aC1pbnN0/cnVjdG9yLWluLWEt/Z3ltLndlYnA_Yj0x/JnM9MTcwNjY3YSZ3/PTAmaz0yMCZjPThn/cjBLSjJoWWh5bnd6/NWxtR1Y5MEpSeTk3/eW93ZWVGbEZBYTJf/SHNYX289" alt="Values" className="values-image" />
          <ul className="feature-list">
            <li className="feature-item"><strong>Personalized Tracking:</strong> Log and monitor workouts with personalized metrics.</li>
            <li className="feature-item"><strong>Goal Setting:</strong> Set and track your fitness goals.</li>
            <li className="feature-item"><strong>Community:</strong> Engage with a supportive fitness community.</li>
            <li className="feature-item"><strong>Analytics:</strong> Access detailed performance insights.</li>
            <li className="feature-item"><strong>Support:</strong> Get help from our dedicated team.</li>
          </ul>
        </div>
        <h2 className="subtitle">Our Vision for the Future</h2>
        <div className='vision'>
          <p className="description-vision">Looking ahead, we envision Workout Tracker as the leading platform for fitness enthusiasts, with plans to add advanced features, integrations, and enhanced community interactions.</p>
          <img src="https://imgs.search.brave.com/v7BzDvobf78w2BBbNtwx0Ny2sCX7CCAT2zw4ECW9pm4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/Y3JlYXRlLnZpc3Rh/LmNvbS9hcGkvbWVk/aWEvc21hbGwvNzY0/NTE2MDMvc3RvY2st/cGhvdG8tbXVzY3Vs/YXItYm9keWJ1aWxk/ZXItZ3V5LWRvaW5n/LWV4ZXJjaXNlcy13/aXRoLWJhcmJlbGxz" alt="Vision" />
        </div>
      </div>
      <div className="arrow-buttons">
        <button className="arrow-button back" onClick={() => navigate(-1)}>
          <i className="fas fa-arrow-left"></i>
        </button>
        <button className="arrow-button up" onClick={scrollToTop}>
          <i className="fas fa-arrow-up"></i>
        </button>
      </div>
    </div>
  );
};

export default AboutUs;
