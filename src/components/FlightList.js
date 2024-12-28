import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const FlightList = () => {
    const [flights, setFlights] = useState([]);

    useEffect(() => {
        const fetchFlights = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/flights');
                setFlights(response.data);
            } catch (error) {
                console.error('Error fetching flights:', error);
            }
        };

        fetchFlights();
    }, []);

    return (
        <div className="container my-5">
            <h2 className="text-center mb-4">Liste des Vols</h2>
            <ul className="list-group">
                {flights.map((flight) => (
                    <li key={flight.idFlight} className="list-group-item p-4 mb-3 shadow-sm bg-light rounded">
                        <h3 className="text-primary">{flight.departure} to {flight.destination}</h3>
                        <p><strong>Horaire :</strong> {new Date(flight.schedule).toLocaleString()}</p>
                        <p><strong>Capacité du vol :</strong> {flight.flightCapacity}</p>
                        <p><strong>Durée :</strong> {flight.duration} heures</p>
                        <p><strong>Compagnie :</strong> {flight.company}</p>
                        <p><strong>Places disponibles :</strong> {flight.availableSeats}</p>
                        <p><strong>Prix de base :</strong> ${flight.basePrice}</p>
                        <h4 className="mt-3">Types de Classes de Vol :</h4>
                        <ul className="list-group">
                            {flight.flightClasses.map((flightClass, index) => (
                                <li key={index} className="list-group-item">
                                    <strong>{flightClass.flightClassType}</strong>: ${flightClass.price}
                                </li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FlightList;
