import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Styles/ReservationForm.css';
import { useParams, useNavigate } from 'react-router-dom';

const ReservationForm = () => {
  const { flightId: flightIdFromUrl } = useParams(); // Get flightId from URL
  const [formData, setFormData] = useState({
    flightId: '',
    departure: '',        // Store departure
    destination: '',      // Store the selected flight ID
    flightClassType: '',
    price: '',
    passengers: [],
    luggage: [],
  });

  const [responseMessage, setResponseMessage] = useState('');
  const [flights, setFlights] = useState([]); // State to store available flights
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')) || []); // Retrieve cart from localStorage
  const navigate = useNavigate(); // For navigation

  // Fetch available flights from the backend
  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/flights');
        setFlights(response.data);
  
        if (flightIdFromUrl) {
          const matchedFlight = response.data.find(
            (flight) => flight.idFlight === parseInt(flightIdFromUrl)
          );
          if (matchedFlight) {
            setFormData((prevData) => ({
              ...prevData,
              flightId: matchedFlight.idFlight,
              price: matchedFlight.basePrice,
            }));
          }
        }
      } catch (error) {
        console.error('Error fetching flights:', error);
      }
    };
    fetchFlights();
  }, [flightIdFromUrl]);

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
    const selectedFlight = flights.find(flight => `${flight.departure} to ${flight.destination}` === e.target.value);
  
    if (selectedFlight) {
      setFormData((prevData) => ({
        ...prevData,
        flightId: selectedFlight.idFlight,
        departure: selectedFlight.departure, // Store departure
      destination: selectedFlight.destination,
        price: selectedFlight.basePrice,
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

  // Add reservation to the cart
  const addToCart = (reservation) => {
    const updatedCart = [...cart, reservation];
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart)); // Store updated cart in localStorage
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.flightId) {
      setResponseMessage('Please select a flight.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8081/api/reservations', formData, {
        headers: { 'Content-Type': 'application/json' },
      });

      setResponseMessage('Reservation created successfully!');
      console.log(response.data);

      // Add the reservation to the cart after it's successfully created
      navigate(`/reservation/${formData.flightId}/payment`, {
        
        state: { reservationData: formData },
    });
    

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
            value={formData.flightId}
            onChange={(e) =>
              setFormData((prevData) => ({
                ...prevData,
                flightId: e.target.value,
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
