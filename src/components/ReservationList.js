import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

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
    <div className="container my-5">
      <h2 className="text-center mb-4">Liste des Réservations</h2>
      <ul className="list-group">
        {reservations.map((reservation) => (
          <li key={reservation.id} className="list-group-item p-4 mb-3 shadow-sm bg-light rounded">
            <h4 className="text-primary">Réservation ID: {reservation.id}</h4>
            <p><strong>Vol ID :</strong> {reservation.flightId}</p>
            <h5>Passagers :</h5>
            <ul className="list-group">
              {reservation.passengers.map((passenger) => (
                <li key={passenger.cin} className="list-group-item">
                  <p><strong>CIN:</strong> {passenger.cin}</p>
                  <p><strong>Nom:</strong> {passenger.name}</p>
                  <p><strong>Email:</strong> {passenger.email}</p>
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
