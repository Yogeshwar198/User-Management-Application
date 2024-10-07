// App.js
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import GetUserData from './pages/GetUserData';
import CreateUser from './pages/CreateUser';
import UserDetail from './pages/UserDetail'; 
import EditUser from './pages/EditUser'; 
import axios from 'axios';

const API = "https://jsonplaceholder.typicode.com/users";

const App = () => {
  const [users, setUsers] = useState([]);

  // Fetch user data from the API
  const fetchUser = async () => {
    try {
      const res = await axios.get(API);
      const data = res.data;
      setUsers(data);
    } catch (error) {
      console.error(error);
    }
  };

  // Function to add a new user
  const addUser = (newUser) => {
    setUsers((prevUsers) => [...prevUsers, newUser]);
  };

  // Function to delete a user
  const deleteUser = (userId) => {
    setUsers(users.filter(user => user.id !== userId)); 
  };

  // Function to update a user
  const updateUser = (updatedUser) => {
    setUsers((prevUsers) => 
      prevUsers.map(user => (user.id === updatedUser.id ? updatedUser : user))
    );
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<GetUserData users={users} deleteUser={deleteUser} />} />
        <Route path="/create-user" element={<CreateUser addUser={addUser} />} />
        <Route path="/user/:id" element={<UserDetail />} />
        <Route path="/edit-user/:id" element={<EditUser users={users} updateUser={updateUser} />} /> Pass updateUser function
      </Routes>
    </Router>
    </>
  );
};

export default App;
