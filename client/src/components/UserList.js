import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getUsers, deleteUser, addUser, getUser, updateUser } from '../api';
import './UserList.css';

const UserList = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isEditing, setIsEditing] = useState(false);

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

  useEffect(() => {
    if (id) {
      const fetchUser = async () => {
        try {
          const data = await getUser(id);
          setUsername(data.username);
          setEmail(data.email);
          setIsEditing(true);
        } catch (error) {
          console.error("Error fetching user:", error);
        }
      };
      fetchUser();
    }
  }, [id]);

  const handleViewProfile = (id) => {
    navigate(`/users/${id}`);
  };

  const handleDeleteUser = async (id) => {
    try {
      await deleteUser(id);
      setUsers(users.filter(user => user.id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await updateUser(id, { username, email, password });
      } else {
        await addUser({ username, email, password });
      }
      navigate('/users');
    } catch (error) {
      console.error("Error saving user:", error);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="user-list-container">
      <h2 className="user-list-header">User List</h2>
      <Link to="/users/add">Add User</Link>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <br />
        <label>
          Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <br />
        <button type="submit">{isEditing ? 'Save Changes' : 'Add User'}</button>
      </form>
      <ul className="user-list">
        {users.map((user) => (
          <li key={user.id} className="user-item">
            <h1>{user.username}</h1>
            <button onClick={() => handleViewProfile(user.id)}>View Profile</button>
            <Link to={`/users/edit/${user.id}`}>Edit</Link>
            <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
