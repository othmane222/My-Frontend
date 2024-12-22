import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Styles/ReservationForm.css';

const ReservationForm = () => {
  const [formData, setFormData] = useState({
    flightId: '',        // Store the selected flight ID
    flightClassType: '',
    passengers: [],
    luggage: [],
  });

  const [responseMessage, setResponseMessage] = useState('');
  const [flights, setFlights] = useState([]); // State to store available flights

  // Fetch available flights from the backend
  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/flights');
        console.log('Fetched Flights:', response.data); // Log the fetched flights to debug
        setFlights(response.data); // Store flights in state
      } catch (error) {
        console.error('Error fetching flights:', error);
      }
    };
    fetchFlights();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePassengerChange = (index, field, value) => {
    const updatedPassengers = [...formData.passengers];
    updatedPassengers[index] = {
      ...updatedPassengers[index],
      [field]: value,
    };
    setFormData((prevData) => ({
      ...prevData,
      passengers: updatedPassengers,
    }));
  };

  const addPassenger = () => {
    setFormData((prevData) => ({
      ...prevData,
      passengers: [
        ...prevData.passengers,
        {
          name: '',
          email: '',
          cin: '',
          password: '',
          passportNumber: '',
          age: '',
          passengerType: '',
        },
      ],
    }));
  };

  const addLuggage = () => {
    setFormData((prevData) => ({
      ...prevData,
      luggage: [...prevData.luggage, { weight: '' }],
    }));
  };

  const handleLuggageChange = (index, value) => {
    const updatedLuggage = [...formData.luggage];
    updatedLuggage[index] = { weight: value };
    setFormData((prevData) => ({
      ...prevData,
      luggage: updatedLuggage,
    }));
  };

  const handleFlightChange = (e) => {
    // Find the selected flight using the index value from the event
    const selectedFlight = flights.find(flight => `${flight.departure} to ${flight.destination}` === e.target.value);
  
    console.log('Selected Flight:', selectedFlight); // Log to check if we are finding the correct flight
  
    if (selectedFlight) {
      setFormData((prevData) => ({
        ...prevData,
        flightId: selectedFlight.idFlight,  // Update formData with flightId
      }));
    }
  };
  

  const createUserIfNotExists = async (cin, userDetails) => {
    try {
      const checkResponse = await axios.get(`http://localhost:9093/users/${cin}`);
      if (checkResponse.status === 200) {
        return checkResponse.data;
      }
    } catch (err) {
      if (err.response && err.response.status === 404) {
        const createResponse = await axios.post('http://localhost:9093/users', userDetails, {
          headers: { 'Content-Type': 'application/json' },
        });
        return createResponse.data;
      } else {
        throw new Error('Error checking user existence');
      }
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!formData.flightId) {
      setResponseMessage('Please select a flight.');
      return;
    }
  
    try {
      console.log('Submitting with flightId:', formData.flightId);
  
      // Submit the form data
      const response = await axios.post('http://localhost:8081/api/reservations', formData, {
        headers: { 'Content-Type': 'application/json' },
      });
  
      setResponseMessage('Reservation created successfully!');
      console.log(response.data);
    } catch (error) {
      setResponseMessage('Error creating reservation. Please try again.');
      console.error(error);
    }
  };
  
  
  return (
    <div className="reservation-form">
      <h2>Create a Reservation</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Flight ID:</label>
          <select
  name="flightId"
  value={formData.flightId} // Bind the selected flightId to formData
  onChange={(e) => 
    setFormData((prevData) => ({
      ...prevData,
      flightId: e.target.value, // Directly update flightId
    }))
  }
  required
>
  <option value="">Select Flight</option>
  {flights.map((flight) => (
    <option key={flight.idFlight} value={flight.idFlight}>
      {`${flight.departure} to ${flight.destination} (ID: ${flight.idFlight})`}
    </option>
  ))}
</select>


        </div>

        <div className="form-group">
          <label>Flight Class Type:</label>
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
        </div>

        <h3>Passengers</h3>
        {formData.passengers.map((passenger, index) => (
          <div key={index} className="passenger-group">
            <label>Name:</label>
            <input
              type="text"
              value={passenger.name}
              onChange={(e) => handlePassengerChange(index, 'name', e.target.value)}
              required
            />
            <label>Email:</label>
            <input
              type="email"
              value={passenger.email}
              onChange={(e) => handlePassengerChange(index, 'email', e.target.value)}
              required
            />
            <label>CIN:</label>
            <input
              type="text"
              value={passenger.cin}
              onChange={(e) => handlePassengerChange(index, 'cin', e.target.value)}
              required
            />
            <label>Password:</label>
            <input
              type="password"
              value={passenger.password}
              onChange={(e) => handlePassengerChange(index, 'password', e.target.value)}
              required
            />
            <label>Passport Number:</label>
            <input
              type="text"
              value={passenger.passportNumber}
              onChange={(e) => handlePassengerChange(index, 'passportNumber', e.target.value)}
              required
            />
            <label>Age:</label>
            <input
              type="number"
              value={passenger.age}
              onChange={(e) => handlePassengerChange(index, 'age', e.target.value)}
              required
            />
            <label>Passenger Type:</label>
            <select
              value={passenger.passengerType}
              onChange={(e) => handlePassengerChange(index, 'passengerType', e.target.value)}
              required
            >
              <option value="">Select Type</option>
              <option value="ADULT">Adult</option>
              <option value="CHILD">Child</option>
              <option value="INFANT">Infant</option>
            </select>
          </div>
        ))}
        <button type="button" onClick={addPassenger}>
          Add Passenger
        </button>

        <h3>Luggage</h3>
        {formData.luggage.map((luggage, index) => (
          <div key={index} className="luggage-group">
            <label>Weight:</label>
            <input
              type="number"
              value={luggage.weight}
              onChange={(e) => handleLuggageChange(index, e.target.value)}
              required
            />
          </div>
        ))}
        <button type="button" onClick={addLuggage}>
          Add Luggage
        </button>

        <button type="submit">Submit</button>
      </form>

      {responseMessage && <p>{responseMessage}</p>}
    </div>
  );
};

export default ReservationForm;
