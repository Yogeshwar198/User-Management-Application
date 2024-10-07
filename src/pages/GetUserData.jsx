// GetUserData.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const GetUserData = ({ users, deleteUser }) => {
  const navigate = useNavigate();

  const viewUserDetail = (user) => {
    navigate(`/user/${user.id}`, { state: { user } });
  };

  return (
    <>
      <div>
        <button onClick={() => navigate('/create-user')} style={{marginTop:"10px", marginLeft:"10px"}}>Create User +</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Company Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>{user.address.street}, {user.address.city}</td>
              <td>{user.company.name}</td>
              <td>
                <button onClick={() => viewUserDetail(user)} style={{margin:"2px"}}>View Details</button>
                <button onClick={() => navigate(`/edit-user/${user.id}`)}>Edit</button>
                <button onClick={() => deleteUser(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default GetUserData;
