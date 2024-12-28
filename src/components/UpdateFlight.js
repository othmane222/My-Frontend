import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const UpdateFlight = () => {
    const { id } = useParams(); // récupère l'ID du vol à modifier depuis l'URL
    const navigate = useNavigate();
    const [flight, setFlight] = useState(null); // état pour stocker les données du vol

    useEffect(() => {
        const fetchFlight = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/flights/${id}`);
                setFlight(response.data); // mettre à jour les données du vol
            } catch (error) {
                console.error("Erreur lors de la récupération du vol", error);
                navigate('/flights'); // rediriger vers la liste des vols si une erreur survient
            }
        };

        fetchFlight();
    }, [id, navigate]); // dépendances : id pour la récupération des données et navigate pour la redirection en cas d'erreur

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFlight({
            ...flight,
            [name]: value
        });
    };

    const handleClassChange = (index, e) => {
        const newFlightClasses = [...flight.flightClasses];
        newFlightClasses[index][e.target.name] = e.target.value;
        setFlight({
            ...flight,
            flightClasses: newFlightClasses
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8080/api/flights/${id}`, flight);
            navigate('/flights'); // rediriger vers la liste des vols après la modification réussie
        } catch (error) {
            console.error("Erreur lors de la mise à jour du vol", error);
        }
    };

    if (!flight) {
        return <div>Chargement...</div>; // message de chargement en attendant la récupération des données
    }

    return (
        <div className="container my-5">
            <h2 className="text-center mb-4">Modifier Vol</h2>
            <form onSubmit={handleSubmit} className="p-4 border rounded shadow-sm bg-light">
                <div className="mb-3">
                    <label className="form-label">Départ :</label>
                    <input
                        type="text"
                        name="departure"
                        value={flight.departure}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Destination :</label>
                    <input
                        type="text"
                        name="destination"
                        value={flight.destination}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Horaire :</label>
                    <input
                        type="datetime-local"
                        name="schedule"
                        value={flight.schedule}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Capacité du vol :</label>
                    <input
                        type="number"
                        name="flightCapacity"
                        value={flight.flightCapacity}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Durée :</label>
                    <input
                        type="number"
                        name="duration"
                        value={flight.duration}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Compagnie :</label>
                    <input
                        type="text"
                        name="company"
                        value={flight.company}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Places disponibles :</label>
                    <input
                        type="number"
                        name="availableSeats"
                        value={flight.availableSeats}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Prix de base :</label>
                    <input
                        type="number"
                        name="basePrice"
                        value={flight.basePrice}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>
                {flight.flightClasses.map((flightClass, index) => (
                    <div key={index} className="mb-3">
                        <label className="form-label">Type de classe :</label>
                        <input
                            type="text"
                            name="flightClassType"
                            value={flightClass.flightClassType}
                            onChange={(e) => handleClassChange(index, e)}
                            className="form-control"
                            required
                        />
                        <label className="form-label">Prix :</label>
                        <input
                            type="number"
                            name="price"
                            value={flightClass.price}
                            onChange={(e) => handleClassChange(index, e)}
                            className="form-control"
                            required
                        />
                    </div>
                ))}
                <button type="submit" className="btn" style={{ backgroundColor: '#445E75', color: 'white' }}>
                    Mettre à jour le vol
                </button>
            </form>
        </div>
    );
};

export default UpdateFlight;
