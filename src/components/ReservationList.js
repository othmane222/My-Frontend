import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ReservationList = () => {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await axios.get('http://localhost:8081/api/reservations');
        setReservations(response.data);
      } catch (error) {
        console.error('Error fetching reservations:', error);
      }
    };

    fetchReservations();
  }, []);

  return (
    <div className="reservation-list">
      <h2>Reservations</h2>
      <ul>
        {reservations.map((reservation) => (
          <li key={reservation.id}>
            <p>Reservation ID: {reservation.id}</p>
            <p>Flight ID: {reservation.flightId}</p>
            <p>Passengers:</p>
            <ul>
              {reservation.passengers.map((passenger) => (
                <li key={passenger.cin}>
                  <p>CIN: {passenger.cin}</p>
                  <p>Name: {passenger.name}</p>
                  <p>Email: {passenger.email}</p>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReservationList;
