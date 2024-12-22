import React from 'react';

const FlightSearch = () => {
  return (
    <section
      className="flight-search-section"
      style={{
        backgroundColor: '#F1EFE5', // Alabaster color
        padding: '50px 0',
        marginTop: '-5px', // Ensure no gap below the navbar
      }}
    >
      <div className="container">
        <h2 className="text-center" style={{ color: '#445E75', fontWeight: 'bold' }}>
          Search Flights
        </h2>
        <form className="mt-4">
          <div className="row">
            {/* Departure */}
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
              />
            </div>

            {/* Destination */}
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
              />
            </div>

            {/* Date of Flight */}
            <div className="col-md-3 mb-3">
              <label htmlFor="flightDate" className="form-label" style={{ color: '#445E75' }}>
                Date of Flight
              </label>
              <input
                type="date"
                className="form-control"
                id="flightDate"
                style={{
                  borderColor: '#445E75',
                }}
              />
            </div>

            {/* Number of Passengers */}
            <div className="col-md-3 mb-3">
              <label htmlFor="passengers" className="form-label" style={{ color: '#445E75' }}>
                Passengers
              </label>
              <select
                id="passengers"
                className="form-select"
                style={{
                  borderColor: '#445E75',
                }}
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
              </select>
            </div>
          </div>

          {/* Search Button */}
          <div className="text-center mt-4">
            <button
              type="submit"
              className="btn"
              style={{
                backgroundColor: '#445E75', // Midnight Haze color
                color: '#F1EFE5', // Alabaster color
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
      </div>
    </section>
  );
};

export default FlightSearch;
