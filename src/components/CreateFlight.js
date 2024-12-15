import React, { useState } from 'react';
import axios from 'axios';

const CreateFlightForm = () => {
    const [flight, setFlight] = useState({
        departure: '',
        destination: '',
        schedule: '',
        flightCapacity: '',
        duration: '',
        company: '',
        availableSeats: '',
        basePrice: '',
        flightClasses: []
    });

    const [flightClasses, setFlightClasses] = useState([
        { flightClassType: 'ECONOMY', price: '' },
        { flightClassType: 'BUSINESS', price: '' },
        { flightClassType: 'FIRST', price: '' }
    ]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFlight({ ...flight, [name]: value });
    };

    const handleFlightClassChange = (index, value) => {
        const updatedFlightClasses = [...flightClasses];
        updatedFlightClasses[index].price = value;
        setFlightClasses(updatedFlightClasses);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFlight({ ...flight, flightClasses });

        try {
            const response = await axios.post('http://localhost:8080/api/flights', flight);
            alert('Flight created successfully!');
            console.log(response.data);
        } catch (error) {
            console.error('Error creating flight:', error);
        }
    };

    return (
        <div>
            <h2>Create Flight</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Departure:</label>
                    <input type="text" name="departure" value={flight.departure} onChange={handleInputChange} required />
                </div>
                <div>
                    <label>Destination:</label>
                    <input type="text" name="destination" value={flight.destination} onChange={handleInputChange} required />
                </div>
                <div>
                    <label>Schedule:</label>
                    <input type="datetime-local" name="schedule" value={flight.schedule} onChange={handleInputChange} required />
                </div>
                <div>
                    <label>Flight Capacity:</label>
                    <input type="number" name="flightCapacity" value={flight.flightCapacity} onChange={handleInputChange} required />
                </div>
                <div>
                    <label>Duration:</label>
                    <input type="number" name="duration" value={flight.duration} onChange={handleInputChange} required />
                </div>
                <div>
                    <label>Company:</label>
                    <input type="text" name="company" value={flight.company} onChange={handleInputChange} required />
                </div>
                <div>
                    <label>Available Seats:</label>
                    <input type="number" name="availableSeats" value={flight.availableSeats} onChange={handleInputChange} required />
                </div>
                <div>
                    <label>Base Price:</label>
                    <input type="number" name="basePrice" value={flight.basePrice} onChange={handleInputChange} required />
                </div>
                <h3>Flight Classes</h3>
                {flightClasses.map((flightClass, index) => (
                    <div key={index}>
                        <label>{flightClass.flightClassType} Price:</label>
                        <input type="number" value={flightClass.price} onChange={(e) => handleFlightClassChange(index, e.target.value)} required />
                    </div>
                ))}
                <button type="submit">Create Flight</button>
            </form>
        </div>
    );
};

export default CreateFlightForm;
