import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getUser, deleteUser } from '../api';

const UserDetail = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const data = await getUser(userId);
      setUser(data);
    };
    fetchUser();
  }, [userId]);

  const handleDelete = async () => {
    await deleteUser(userId);
    // Redirect or update state after deletion
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div>
      <h2>User Details</h2>
      <p>ID: {user.id}</p>
      <p>Username: {user.username}</p>
      <button onClick={handleDelete}>Delete User</button>
    </div>
  );
};

export default UserDetail;
