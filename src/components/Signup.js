import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Ensure credentials are included globally for Axios requests
axios.defaults.withCredentials = true;

const Signup = () => {
  const [cin, setCin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    const newUser = {
      cin,
      email,
      password,
    };

    try {
      const response = await axios.post("http://localhost:9093/users", newUser, {
        baseURL: 'http://localhost:9093',
    withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 201) {
        setSuccess(true);
        setError(null);

        // Redirect to login or dashboard after signup
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    } catch (err) {
      console.error("Signup error:", err);
      if (err.response?.status === 400) {
        setError("User already exists. Please check your CIN.");
      } else {
        setError("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="signup-container">
      <h1>Signup</h1>
      <form onSubmit={handleSignup}>
        <div>
          <label htmlFor="cin">CIN:</label>
          <input
            type="text"
            id="cin"
            value={cin}
            onChange={(e) => setCin(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Signup</button>
      </form>
      {success && <p style={{ color: "green" }}>Signup successful! Redirecting...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default Signup;
