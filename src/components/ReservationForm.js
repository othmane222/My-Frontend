import React, { useState } from 'react';
import axios from 'axios';

const ReservationForm = () => {
  const [formData, setFormData] = useState({
    flightId: '',
    flightClassType: '',
    passengers: [],
    luggage: [],
  });

  const [responseMessage, setResponseMessage] = useState('');

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      for (const passenger of formData.passengers) {
        await createUserIfNotExists(passenger.cin, {
          email: passenger.email,
          password: passenger.password,
          cin: passenger.cin,
        });
      }

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
        <h3>Passengers</h3>
        {formData.passengers.map((passenger, index) => (
          <div key={index}>
            <label>
              Name:
              <input
                type="text"
                value={passenger.name}
                onChange={(e) => handlePassengerChange(index, 'name', e.target.value)}
                required
              />
            </label>
            <label>
              Email:
              <input
                type="email"
                value={passenger.email}
                onChange={(e) => handlePassengerChange(index, 'email', e.target.value)}
                required
              />
            </label>
            <label>
              CIN:
              <input
                type="text"
                value={passenger.cin}
                onChange={(e) => handlePassengerChange(index, 'cin', e.target.value)}
                required
              />
            </label>
            <label>
              Password:
              <input
                type="password"
                value={passenger.password}
                onChange={(e) => handlePassengerChange(index, 'password', e.target.value)}
                required
              />
            </label>
            <label>
              Passport Number:
              <input
                type="text"
                value={passenger.passportNumber}
                onChange={(e) => handlePassengerChange(index, 'passportNumber', e.target.value)}
                required
              />
            </label>
            <label>
              Age:
              <input
                type="number"
                value={passenger.age}
                onChange={(e) => handlePassengerChange(index, 'age', e.target.value)}
                required
              />
            </label>
            <label>
              Passenger Type:
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
            </label>
          </div>
        ))}
        <button type="button" onClick={addPassenger}>
          Add Passenger
        </button>
        <h3>Luggage</h3>
        {formData.luggage.map((luggage, index) => (
          <div key={index}>
            <label>
              Weight:
              <input
                type="number"
                value={luggage.weight}
                onChange={(e) => handleLuggageChange(index, e.target.value)}
                required
              />
            </label>
          </div>
        ))}
        <button type="button" onClick={addLuggage}>
          Add Luggage
        </button>
        <button type="submit">Submit Reservation</button>
      </form>
      {responseMessage && <p>{responseMessage}</p>}
    </div>
  );
};

export default ReservationForm;
