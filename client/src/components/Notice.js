import React, { useState, useEffect } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import './Notice.css';

function Notice({ decodedToken }) {
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    // Replace the fetch call with hardcoded notices for the gym tracker
    const sampleNotices = [
      {
        department: 'Fitness',
        person: 'John Doe',
        details: 'Yoga class at 6 PM in the main hall.'
      },
      {
        department: 'Health',
        person: 'Jane Smith',
        details: 'Nutrition workshop on Friday at 4 PM in Room 101.'
      },
      {
        department: 'Training',
        person: 'Mike Johnson',
        details: 'New strength training program starts next Monday.'
      }
    ];

    setNotices(sampleNotices);
  }, []);

  return (
    <div className="notice-container">
      <div className="head">
        <h1>NOTICE BOARD</h1>
        <p>Check your notifications of the day and keep track with what is going on.</p>
      </div>
      {notices.length === 0 ? (
        <Spinner style={{ color: '#EE5E21' }} animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : (
        <div className="notice-grid">
          {notices.map((notice, index) => (
            <div key={index} className="notice-item">
              <h1>{notice.department.toUpperCase()}</h1>
              <h2>{notice.person.toUpperCase()}</h2>
              <p>{notice.details.toUpperCase()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Notice;
