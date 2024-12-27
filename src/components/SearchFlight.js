import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const SearchFlight = () => {
  const [departure, setDeparture] = useState('');
  const [destination, setDestination] = useState('');
  const [flights, setFlights] = useState([]); // State to store flight data
  const [error, setError] = useState(null); // State to store error
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = `http://localhost:8080/api/flights/filter?departure=${departure}&destination=${destination}`;

    try {
      const response = await fetch(url, {
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error('Error fetching flights');
      }

      const data = await response.json();
      setFlights(data); // Update the state with the fetched data
      setError(null); // Clear any previous errors
    } catch (error) {
      setError(error.message); // Set the error state if fetching fails
    }
  };

  const handleReservation = (flightId) => {
    // Navigate to the Reservation component and pass the flightId in the URL
    navigate(`/reservation/${flightId}`);
  };

  return (
    <section
      className="flight-search-section"
      style={{
        backgroundColor: '#F1EFE5',
        padding: '50px 0',
        marginTop: '-5px',
      }}
    >
      <div className="container">
        <h2 className="text-center" style={{ color: '#445E75', fontWeight: 'bold' }}>
          Search Flights
        </h2>
        <form className="mt-4" onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-3 mb-3">
              <label htmlFor="departure" className="form-label" style={{ color: '#445E75' }}>
                Departure
              </label>
              <input
                type="text"
                className="form-control"
                id="departure"
                placeholder="Enter departure city"
                style={{
                  borderColor: '#445E75',
                }}
                value={departure}
                onChange={(e) => setDeparture(e.target.value)}
              />
            </div>

            <div className="col-md-3 mb-3">
              <label htmlFor="destination" className="form-label" style={{ color: '#445E75' }}>
                Destination
              </label>
              <input
                type="text"
                className="form-control"
                id="destination"
                placeholder="Enter destination city"
                style={{
                  borderColor: '#445E75',
                }}
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
              />
            </div>
          </div>

          <div className="text-center mt-4">
            <button
              type="submit"
              className="btn"
              style={{
                backgroundColor: '#445E75',
                color: '#F1EFE5',
                padding: '10px 20px',
                fontWeight: 'bold',
                fontSize: '1.1rem',
                borderRadius: '5px',
              }}
            >
              Search Flights
            </button>
          </div>
        </form>

        {/* Display error if there is one */}
        {error && (
          <div className="alert alert-danger mt-4" role="alert">
            {error}
          </div>
        )}

        {/* Display the flight data */}
        <div className="mt-4">
          {flights.length > 0 ? (
            flights.map((flight, index) => (
              <div key={flight.idFlight} className="flight-card" style={{ marginBottom: '20px' }}>
                <h4 style={{ color: '#445E75' }}>Flight {index + 1}</h4>
                <p><strong>Departure:</strong> {flight.departure}</p>
                <p><strong>Destination:</strong> {flight.destination}</p>
                <p><strong>Company:</strong> {flight.company}</p>
                <p><strong>Base Price:</strong> {flight.basePrice}</p>
                <p><strong>Available Seats:</strong> {flight.availableSeats}</p>
                <p><strong>Flight Capacity:</strong> {flight.flightCapacity}</p>
                <p><strong>Duration:</strong> {flight.duration} hours</p>
                <p><strong>Flight Classes:</strong> {flight.flightClasses.length > 0 ? flight.flightClasses.join(', ') : 'No classes available'}</p>
                <p><strong>Schedule:</strong> {flight.schedule}</p>
                <button
                  className="btn btn-primary"
                  onClick={() => handleReservation(flight.idFlight)} // Pass flightId to Reservation component
                >
                  Book this Flight
                </button>
              </div>
            ))
          ) : (
            <p>No flights found.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default SearchFlight;
