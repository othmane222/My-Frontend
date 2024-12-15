import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

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
        <div>
            <h2>Modifier Vol</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Départ :
                    <input type="text" name="departure" value={flight.departure} onChange={handleChange} />
                </label>
                <label>
                    Destination :
                    <input type="text" name="destination" value={flight.destination} onChange={handleChange} />
                </label>
                <label>
                    Horaire :
                    <input type="datetime-local" name="schedule" value={flight.schedule} onChange={handleChange} />
                </label>
                <label>
                    Capacité du vol :
                    <input type="number" name="flightCapacity" value={flight.flightCapacity} onChange={handleChange} />
                </label>
                <label>
                    Durée :
                    <input type="number" name="duration" value={flight.duration} onChange={handleChange} />
                </label>
                <label>
                    Compagnie :
                    <input type="text" name="company" value={flight.company} onChange={handleChange} />
                </label>
                <label>
                    Places disponibles :
                    <input type="number" name="availableSeats" value={flight.availableSeats} onChange={handleChange} />
                </label>
                <label>
                    Prix de base :
                    <input type="number" name="basePrice" value={flight.basePrice} onChange={handleChange} />
                </label>
                {flight.flightClasses.map((flightClass, index) => (
                    <div key={index}>
                        <label>
                            Type de classe :
                            <input type="text" name="flightClassType" value={flightClass.flightClassType} onChange={(e) => handleClassChange(index, e)} />
                        </label>
                        <label>
                            Prix :
                            <input type="number" name="price" value={flightClass.price} onChange={(e) => handleClassChange(index, e)} />
                        </label>
                    </div>
                ))}
                <button type="submit">Mettre à jour le vol</button>
            </form>
        </div>
    );
};

export default UpdateFlight;
