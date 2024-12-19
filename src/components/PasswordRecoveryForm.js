import React, { useState } from "react";
import axios from "axios";

const PasswordRecoveryForm = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8091/password-recovery/recover", {
        email,
      });
      setMessage(response.data); // Successful message from the backend
      setError(""); // Clear any previous errors
    } catch (err) {
      if (err.response) {
        // Extract error details and show a user-friendly message
        const errorMessage = err.response.data?.message || "An error occurred. Please try again.";
        setError(errorMessage);
      } else {
        setError("An error occurred. Please check your network connection.");
      }
      setMessage(""); // Clear any previous success messages
    }
  };

  return (
    <div>
      <h1>Password Recovery</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <button type="submit">Recover Password</button>
      </form>
      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default PasswordRecoveryForm;
