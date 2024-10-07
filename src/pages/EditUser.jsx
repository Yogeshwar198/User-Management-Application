// EditUser.js
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router-dom';

const EditUser = ({ users, updateUser }) => {
  const { id } = useParams(); // Get the user ID from the URL
  const navigate = useNavigate();
  
  const user = users.find(user => user.id === parseInt(id)); // Find the user by ID
  const { register, handleSubmit, setValue } = useForm();

  useEffect(() => {
    if (user) {
      setValue('name', user.name);
      setValue('email', user.email);
      setValue('phone', user.phone);
      setValue('username', user.username);
      setValue('street', user.address.street);
      setValue('city', user.address.city);
      setValue('company', user.company.name);
    }
  }, [user, setValue]);

  const onSubmit = async (data) => {
    const updatedUser = {
      ...user,
      name: data.name,
      email: data.email,
      phone: data.phone,
      address: {
        ...user.address,
        street: data.street,
        city: data.city,
      },
      company: {
        ...user.company,
        name: data.company,
      },
    };
    
    // Call updateUser function passed as a prop
    updateUser(updatedUser);

    // Redirect to the user list after updating
    navigate('/');
  };

  if (!user) {
    return <div>User not found</div>; // Handle user not found
  }

  return (
    <div>
      <h2>Edit User</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Name:</label>
        <input type="text" {...register('name')} placeholder="Name" />
        <label>Email:</label>
        <input type="text" {...register('email')} placeholder="Email" />
        <label>Phone:</label>
        <input type="text" {...register('phone')} placeholder="Phone" />
        <label>Usename:</label>
        <input type="text" {...register('username')} readOnly />
        <label>Street:</label>
        <input type="text" {...register('street')} placeholder="Street" />
        <label>City:</label>
        <input type="text" {...register('city')} placeholder="City" />
        <label>Company:</label>
        <input type="text" {...register('company')} placeholder="Company" />
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default EditUser;
