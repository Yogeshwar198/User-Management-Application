// UserDetail.js
import React from 'react';
import { useLocation } from 'react-router-dom';

const UserDetail = () => {
  const location = useLocation();
  const { user } = location.state || {}; // Use the passed user data from the navigate function

  if (!user) {
    return <div>User not found.</div>;
  }

  return (
    <div className='de'>
      <h2>User Details</h2>
      <p>ID:{user.id}</p>
      <p>Name:{user.name}</p>
      <p>Email:{user.email}</p>
      <p>Phone:{user.phone}</p>
      <p>Username:{user.username}</p>
      <p>Address:{user.address.street}, {user.address.city}</p>
      <p>Company:{user.company.name}</p>
    </div>
  );
};

export default UserDetail;
