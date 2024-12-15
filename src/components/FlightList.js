import React, { useEffect, useState } from 'react';
import axios from 'axios';

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
        <div>
            <h2>Flight List</h2>
            <ul>
                {flights.map((flight) => (
                    <li key={flight.idFlight}>
                        <h3>{flight.departure} to {flight.destination}</h3>
                        <p>Schedule: {new Date(flight.schedule).toLocaleString()}</p>
                        <p>Flight Capacity: {flight.flightCapacity}</p>
                        <p>Duration: {flight.duration} hours</p>
                        <p>Company: {flight.company}</p>
                        <p>Available Seats: {flight.availableSeats}</p>
                        <p>Base Price: ${flight.basePrice}</p>
                        <h4>Flight Classes:</h4>
                        <ul>
                            {flight.flightClasses.map((flightClass, index) => (
                                <li key={index}>
                                    {flightClass.flightClassType}: ${flightClass.price}
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
