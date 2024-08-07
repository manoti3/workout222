import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getUser, deleteUser } from '../api';

const UserDetail = () => {
  const location = useLocation();
  console.log(location.pathname,'location')
  const [user, setUser] = useState(null);
  const id = location.pathname.split('/').pop();

  console.log(id,'test2.0')

  useEffect(() => {
    const fetchUser = async () => {
      const data = await getUser(id);
      console.log(data,'detail')
      setUser(data);
    };
    fetchUser();
  }, [id]);

  const handleDelete = async () => {
    await deleteUser(id);
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
