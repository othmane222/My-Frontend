import React, { useState } from 'react';

const SearchFlight = () => {
  const [departure, setDeparture] = useState('');
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState('');
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    setError(null); // Réinitialise l'erreur
    setResults(null); // Réinitialise les résultats

    
  return (
    <section style={{ padding: '20px', textAlign: 'center', backgroundColor: '#f0f8ff' }}>
      <h2>Rechercher un Vol</h2>
      <form onSubmit={handleSearch} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px' }}>
        <input
          type="text"
          placeholder="Ville de départ"
          value={departure}
          onChange={(e) => setDeparture(e.target.value)}
          style={{ padding: '10px', width: '300px', borderRadius: '5px', border: '1px solid #ccc' }}
          required
        />
        <input
          type="text"
          placeholder="Ville de destination"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          style={{ padding: '10px', width: '300px', borderRadius: '5px', border: '1px solid #ccc' }}
          required
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          style={{ padding: '10px', width: '300px', borderRadius: '5px', border: '1px solid #ccc' }}
          required
        />
        <button
          type="submit"
          style={{
            padding: '10px 20px',
            backgroundColor: '#007BFF',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Rechercher
        </button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {results && (
        <div>
          <h3>Résultats de la recherche :</h3>
          <ul>
            {results.map((flight) => (
              <li key={flight.id}>
                {flight.departure} → {flight.destination} : {flight.date}
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
};
}
export default SearchFlight;
