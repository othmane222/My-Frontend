import React, { useState } from "react";
import axios from "axios";

const ReservationForm = () => {
  const [formData, setFormData] = useState({
    flightId: "",
    flightClassType: "",
    passengers: [],
    luggage: [],
  });

  const [passenger, setPassenger] = useState({
    name: "",
    email: "",
    cin: "",
    password: "",
    passportNumber: "",
    age: "",
    passengerType: "",
  });

  const [luggage, setLuggage] = useState({ weight: "" });

  const [responseMessage, setResponseMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePassengerChange = (e) => {
    const { name, value } = e.target;
    setPassenger((prevPassenger) => ({
      ...prevPassenger,
      [name]: value,
    }));
  };

  const handleLuggageChange = (e) => {
    const { name, value } = e.target;
    setLuggage((prevLuggage) => ({
      ...prevLuggage,
      [name]: value,
    }));
  };

  const addPassenger = async () => {
    try {
      // Check if passenger exists using CIN
      const response = await axios.get(
        `http://localhost:9093/users?cin=${passenger.cin}`
      );

      if (response.data && response.data.length > 0) {
        console.log("Passenger already exists:", response.data);
      } else {
        // Create the passenger if they don't exist
        await axios.post("http://localhost:9093/users", {
          email: passenger.email,
          password: passenger.password,
          cin: passenger.cin,
        });
        console.log("Passenger created successfully.");
      }

      // Add passenger to the reservation form
      setFormData((prevData) => ({
        ...prevData,
        passengers: [...prevData.passengers, passenger],
      }));
      setPassenger({
        name: "",
        email: "",
        cin: "",
        password: "",
        passportNumber: "",
        age: "",
        passengerType: "",
      }); // Reset passenger input
    } catch (error) {
      console.error("Error checking or creating passenger:", error.response?.data || error.message);
      alert("Failed to add passenger. Please check the details and try again.");
    }
  };

  const addLuggage = () => {
    setFormData((prevData) => ({
      ...prevData,
      luggage: [...prevData.luggage, luggage],
    }));
    setLuggage({ weight: "" }); // Reset luggage input
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8081/api/reservations", formData, {
        headers: { "Content-Type": "application/json" },
      });
      setResponseMessage("Reservation created successfully!");
      console.log(response.data);
    } catch (error) {
      setResponseMessage("Error creating reservation. Please try again.");
      console.error(error);
    }
  };

  return (
    <div className="reservation-form">
      <h2>Create a Reservation</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Flight ID:
          <input
            type="text"
            name="flightId"
            value={formData.flightId}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Flight Class Type:
          <select
            name="flightClassType"
            value={formData.flightClassType}
            onChange={handleChange}
            required
          >
            <option value="">Select Class</option>
            <option value="ECONOMY">Economy</option>
            <option value="BUSINESS">Business</option>
            <option value="FIRST">First</option>
          </select>
        </label>
        <div>
          <h3>Add Passenger</h3>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={passenger.name}
              onChange={handlePassengerChange}
              required
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={passenger.email}
              onChange={handlePassengerChange}
              required
            />
          </label>
          <label>
            CIN:
            <input
              type="text"
              name="cin"
              value={passenger.cin}
              onChange={handlePassengerChange}
              required
            />
          </label>
          <label>
            Password:
            <input
              type="password"
              name="password"
              value={passenger.password}
              onChange={handlePassengerChange}
              required
            />
          </label>
          <label>
            Passport Number:
            <input
              type="text"
              name="passportNumber"
              value={passenger.passportNumber}
              onChange={handlePassengerChange}
              required
            />
          </label>
          <label>
            Age:
            <input
              type="number"
              name="age"
              value={passenger.age}
              onChange={handlePassengerChange}
              required
            />
          </label>
          <label>
            Passenger Type:
            <select
              name="passengerType"
              value={passenger.passengerType}
              onChange={handlePassengerChange}
              required
            >
              <option value="">Select Type</option>
              <option value="ADULT">Adult</option>
              <option value="CHILD">Child</option>
              <option value="INFANT">Infant</option>
            </select>
          </label>
          <button type="button" onClick={addPassenger}>
            Add Passenger
          </button>
        </div>
        <div>
          <h3>Add Luggage</h3>
          <label>
            Weight:
            <input
              type="number"
              name="weight"
              value={luggage.weight}
              onChange={handleLuggageChange}
              required
            />
          </label>
          <button type="button" onClick={addLuggage}>
            Add Luggage
          </button>
        </div>
        <button type="submit">Submit Reservation</button>
      </form>
      {responseMessage && <p>{responseMessage}</p>}
    </div>
  );
};

export default ReservationForm;
