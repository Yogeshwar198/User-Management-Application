import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateUser = ({ addUser }) => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    username: '',
    street: '',
    city: '',
    company: '',
  });

  // Regex patterns for validation
  const patterns = {
    name: /^[a-zA-Z ]{3,}$/,
    email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    phone: /^[0-9]{10}$/,
    username: /^[a-zA-Z0-9]{3,}$/,
    street: /.+/,
    city: /.+/,
    company: /^.{3,}$/,
  };

  // Validate fields with regex
  const validate = () => {
    const newErrors = {};

    if (!patterns.name.test(formData.name)) {
      newErrors.name = 'Name must be at least 3 characters long and contain only letters';
    }
    if (!patterns.email.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }
    if (!patterns.phone.test(formData.phone)) {
      newErrors.phone = 'Phone must be a valid 10-digit number';
    }
    if (!patterns.street.test(formData.street)) {
      newErrors.street = 'Street is required';
    }
    if (!patterns.city.test(formData.city)) {
      newErrors.city = 'City is required';
    }
    if (formData.company && !patterns.company.test(formData.company)) {
      newErrors.company = 'Company name must be at least 3 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Auto-fill username based on name input
    if (name === 'name' && value.length >= 3) {
      setFormData((prevState) => ({
        ...prevState,
        username: `USER-${value}`,
      }));
    }
  };

  // Handle form submission
  const onSubmit = async (e) => {
    e.preventDefault();
    
    if (validate()) {
      try {
        const response = await axios.post('https://jsonplaceholder.typicode.com/users', {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          username: formData.username,
          address: {
            street: formData.street,
            city: formData.city,
          },
          company: {
            name: formData.company,
          },
        });

        addUser(response.data);
        setFormData({
          name: '',
          email: '',
          phone: '',
          username: '',
          street: '',
          city: '',
          company: '',
        });
        navigate('/');
      } catch (error) {
        console.error('Error creating user:', error);
      }
    }
  };

  return (
    <div>
      <h2>Create New User</h2>
      <form onSubmit={onSubmit}>
        {/* Name */}
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <p className="error">{errors.name}</p>}
        </div>

        {/* Email */}
        <div>
          <label>Email:</label>
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>

        {/* Phone */}
        <div>
          <label>Phone:</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
          {errors.phone && <p className="error">{errors.phone}</p>}
        </div>

        {/* Username (Auto-filled and non-editable) */}
        <div>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            readOnly
          />
        </div>

        {/* Address */}
        <div>
          <label>Street:</label>
          <input
            type="text"
            name="street"
            value={formData.street}
            onChange={handleChange}
          />
          {errors.street && <p className="error">{errors.street}</p>}
        </div>
        <div>
          <label>City:</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
          />
          {errors.city && <p className="error">{errors.city}</p>}
        </div>

        {/* Company (Optional) */}
        <div>
          <label>Company:</label>
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
          />
          {errors.company && <p className="error">{errors.company}</p>}
        </div>

        <button type="submit">Create User</button>
      </form>
    </div>
  );
};

export default CreateUser;
