import React from 'react';
import Footer from './Footer'; // Adjust the path as necessary
import pic1 from '../logo.png';
import pic2 from '../1.png';
import pic3 from '../2.png';
import pic4 from '../4.png';
import './home.css';
import HeroSlider from './HeroSlider';
import Notice from './Notice';

const Home = () => {
  return (
    <div className="home-container">
      <HeroSlider />
      <section className="gallery-section">
        <h2 className="gallery-title">Explore Our Features</h2>
        <div className="image-gallery">
          <img src={pic1} alt="Fitness Logo" className="gallery-image" />
          <img src={pic2} alt="Workout" className="gallery-image" />
          <img src={pic3} alt="Exercise" className="gallery-image" />
          <img src={pic4} alt="Training" className="gallery-image" />
        </div>
      </section>
      <Notice />

      <Footer /> {/* Add Footer component */}
    </div>
  );
};

export default Home;
