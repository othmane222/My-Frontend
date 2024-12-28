import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Use useNavigate instead of useHistory

export default function LoginForm({ setIsLoggedIn }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate(); // useNavigate hook to handle redirection

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Default userType is "USER"
      const userType = "USER"; 

      // Construct the login URL with query parameters
      const loginUrl = `http://localhost:8888/auth/login?username=${username}&password=${password}&userType=${userType}`;

      const response = await axios.post(loginUrl, {}, { withCredentials: true });

      if (response.status === 200) {
        console.log("Login successful!");

        // Store user data in localStorage
        localStorage.setItem("user", JSON.stringify(response.data));

        // Set isLoggedIn state to true
        setIsLoggedIn(true);

        // Check if the email is 'admin@gmail.com'
        if (username === "admin@gmail.com") {
          navigate("/admin"); // Redirect to /admin if email matches
        } else {
          navigate("/"); // Redirect to home or dashboard for USER
        }
      } else {
        setErrorMessage("Invalid credentials. Please try again.");
      }
    } catch (error) {
      console.error("Login error:", error);
      setErrorMessage("There was an issue with the login request.");
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label htmlFor="username">Email:</label>
          <input
            type="email"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            placeholder="Enter your email"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Enter your password"
          />
        </div>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <button type="submit" className="login-button">Login</button>
      </form>
    </div>
  );
}
