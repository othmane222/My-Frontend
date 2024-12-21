import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PassengerList = () => {
  const [passengers, setPassengers] = useState([]);

  useEffect(() => {
    const fetchPassengers = async () => {
      try {
        const response = await axios.get('http://localhost:8081/api/reservations/passengers');
        setPassengers(response.data);
      } catch (error) {
        console.error('Error fetching passengers:', error);
      }
    };

    fetchPassengers();
  }, []);

  return (
    <div className="passenger-list">
      <h2>Passengers</h2>
      <ul>
        {passengers.map((passenger) => (
          <li key={passenger.cin}>
            <p>CIN: {passenger.cin}</p>
            <p>Name: {passenger.name}</p>
            <p>Email: {passenger.email}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PassengerList;
