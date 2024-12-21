import React, { useState } from 'react';
import axios from 'axios';
import '../Styles/UserManagement.css';

const UserManagement = () => {
  const [userData, setUserData] = useState({
    email: '',
    password: '',
    cin: '',
  });

  const [responseMessage, setResponseMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send POST request to create the user
      const response = await axios.post('http://localhost:9093/users', userData, {
        headers: { 'Content-Type': 'application/json' },
      });
  
      // Check if status is 201 (Created)
      if (response.status === 201) {
        setResponseMessage('User created successfully!');
      } else {
        setResponseMessage('Error creating user.');
      }
      console.log(response); // Log the response for debugging
  
    } catch (error) {
      setResponseMessage('Error creating user. Please try again.');
      console.error(error); // Log error details for debugging
    }
  };

  return (
    <div className="user-management-container">
      <h2 className="title">Create New User</h2>
      <form onSubmit={handleSubmit} className="user-form">
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            id="email"
            value={userData.email}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            id="password"
            value={userData.password}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="cin">CIN:</label>
          <input
            type="text"
            name="cin"
            id="cin"
            value={userData.cin}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>
        <button type="submit" className="submit-btn">Create User</button>
      </form>
      {responseMessage && <p className="response-message">{responseMessage}</p>}
    </div>
  );
};

export default UserManagement;
