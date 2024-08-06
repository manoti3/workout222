import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getUsers } from '../api';
import { useHistory } from 'react-router-dom';

import './UserList.css';

const UserList = () => {
  const history = useHistory();

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getUsers();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleViewProfile = (id) => {
    history.push(`/users/${id}`);
  };

  if (loading) return <div>Loading...</div>;
  return (
    <div className="user-list-container">
      <h2 className="user-list-header">User List</h2>
      <ul className="user-list">
        {users.map((user, index) => (
          <li key={index} className="user-item">
            <h1>{user.username}</h1>
            {/* <Link to={`/user/${user.id}`}>View Profile</Link> */}
            <button onClick={() => handleViewProfile(user.id)}>View Profile</button>

          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
