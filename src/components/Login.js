import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthProvider'; // Ensure this import is properly set up

const Signup = () => {
  const [cin, setCin] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('STUDENT'); // Default role to 'STUDENT'
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const newUser = { cin, email, password, role };
      const response = await axios.post('http://localhost:8083/users', newUser);
      localStorage.setItem('token', response.data.token); // Assuming JWT token is sent in response
      setUser(response.data); // Set the user data in context
      navigate('/dashboard'); // Redirect to the dashboard on successful signup
    } catch (err) {
      setError('Signup failed');
      console.error('Signup error:', err);
    }
  };

  return (
    <div>
      <h1>Signup</h1>
      <form onSubmit={handleSignup}>
        <div>
          <label>CIN:</label>
          <input type="text" value={cin} onChange={(e) => setCin(e.target.value)} required />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <div>
          <label>Role:</label>
          <select value={role} onChange={(e) => setRole(e.target.value)} required>
            <option value="STUDENT">Student</option>
            <option value="TEACHER">Teacher</option>
          </select>
        </div>
        <button type="submit">Signup</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
};

export default Signup;
