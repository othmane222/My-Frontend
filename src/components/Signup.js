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
        baseURL: "http://localhost:9093",
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
    <div
      className="signup-container"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "#ffffff",
      }}
    >
      <h1 style={{ marginBottom: "20px", color: "#000" }}>Signup</h1>
      <form
        onSubmit={handleSignup}
        style={{
          width: "100%",
          maxWidth: "400px",
          display: "flex",
          flexDirection: "column",
          gap: "15px",
        }}
      >
        <div>
          <label
            htmlFor="cin"
            style={{
              display: "block",
              marginBottom: "5px",
              fontWeight: "bold",
              color: "#000",
            }}
          >
            CIN:
          </label>
          <input
            type="text"
            id="cin"
            value={cin}
            onChange={(e) => setCin(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          />
        </div>
        <div>
          <label
            htmlFor="email"
            style={{
              display: "block",
              marginBottom: "5px",
              fontWeight: "bold",
              color: "#000",
            }}
          >
            Email:
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          />
        </div>
        <div>
          <label
            htmlFor="password"
            style={{
              display: "block",
              marginBottom: "5px",
              fontWeight: "bold",
              color: "#000",
            }}
          >
            Password:
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          />
        </div>
        <button
          type="submit" className="btn btn-secondary mb-3"
          style={{
            color: "#fff",
            border: "none",
            padding: "10px",
            borderRadius: "4px",
            cursor: "pointer",
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          Signup
        </button>
      </form>
      {success && (
        <p style={{ color: "green", marginTop: "10px" }}>
          Signup successful! Redirecting...
        </p>
      )}
      {error && (
        <p style={{ color: "red", marginTop: "10px" }}>{error}</p>
      )}
    </div>
  );
};

export default Signup;
