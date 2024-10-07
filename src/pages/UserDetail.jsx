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
    <div className='detail'>
      <h2>User Details</h2>
      <p> <strong>ID:</strong>{user.id}</p>
      <p><strong>Name:</strong>{user.name}</p>
      <p><strong>Email:</strong>{user.email}</p>
      <p><strong>Phone:</strong>{user.phone}</p>
      <p><strong>Username:</strong>{user.username}</p>
      <p><strong>Address:</strong>{user.address.street}, {user.address.city}</p>
      <p><strong>Company:</strong>{user.company.name}</p>
    </div>
  );
};

export default UserDetail;
