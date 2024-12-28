import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

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
        <div className="container my-5">
            <h2 className="text-center mb-4">Create Flight</h2>
            <form onSubmit={handleSubmit} className="p-4 border rounded shadow-sm bg-light">
                <div className="mb-3">
                    <label className="form-label">Departure:</label>
                    <input
                        type="text"
                        name="departure"
                        value={flight.departure}
                        onChange={handleInputChange}
                        className="form-control"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Destination:</label>
                    <input
                        type="text"
                        name="destination"
                        value={flight.destination}
                        onChange={handleInputChange}
                        className="form-control"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Schedule:</label>
                    <input
                        type="datetime-local"
                        name="schedule"
                        value={flight.schedule}
                        onChange={handleInputChange}
                        className="form-control"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Flight Capacity:</label>
                    <input
                        type="number"
                        name="flightCapacity"
                        value={flight.flightCapacity}
                        onChange={handleInputChange}
                        className="form-control"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Duration:</label>
                    <input
                        type="number"
                        name="duration"
                        value={flight.duration}
                        onChange={handleInputChange}
                        className="form-control"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Company:</label>
                    <input
                        type="text"
                        name="company"
                        value={flight.company}
                        onChange={handleInputChange}
                        className="form-control"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Available Seats:</label>
                    <input
                        type="number"
                        name="availableSeats"
                        value={flight.availableSeats}
                        onChange={handleInputChange}
                        className="form-control"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Base Price:</label>
                    <input
                        type="number"
                        name="basePrice"
                        value={flight.basePrice}
                        onChange={handleInputChange}
                        className="form-control"
                        required
                    />
                </div>
                <h3>Flight Classes</h3>
                {flightClasses.map((flightClass, index) => (
                    <div key={index} className="mb-3">
                        <label className="form-label">{flightClass.flightClassType} Price:</label>
                        <input
                            type="number"
                            value={flightClass.price}
                            onChange={(e) => handleFlightClassChange(index, e.target.value)}
                            className="form-control"
                            required
                        />
                    </div>
                ))}
                <button type="submit" className="btn" style={{ backgroundColor: '#445E75', color: 'white' }}>
                    Create Flight
                </button>
            </form>
        </div>
    );
};

export default CreateFlightForm;
