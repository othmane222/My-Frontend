import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Admin = () => {
  const [updateId, setUpdateId] = useState('');
  const [deleteId, setDeleteId] = useState('');
  const [showUpdateInput, setShowUpdateInput] = useState(false);
  const [showDeleteInput, setShowDeleteInput] = useState(false);
  const navigate = useNavigate();

  // Rediriger vers la page d'update avec l'ID saisi
  const handleUpdateNavigation = () => {
    if (updateId.trim() !== '' && !isNaN(updateId)) {
      navigate(`/admin/update/${updateId}`);
    } else {
      alert('Veuillez entrer un ID numérique valide.');
    }
  };

  // Supprimer un vol avec l'ID saisi
  const handleDeleteFlight = async () => {
    if (deleteId.trim() !== '' && !isNaN(deleteId)) {
      try {
        await axios.delete(`http://localhost:8080/api/flights/${deleteId}`);
        alert(`Le vol avec l'ID ${deleteId} a été supprimé avec succès.`);
        setDeleteId(''); // Réinitialiser le champ après suppression
      } catch (error) {
        console.error('Erreur lors de la suppression :', error);
        alert('Une erreur est survenue lors de la suppression du vol.');
      }
    } else {
      alert('Veuillez entrer un ID numérique valide.');
    }
  };

  return (
    <div className="admin-container">
      <h1>Admin Dashboard</h1>
      <div className="admin-menu">
        <button onClick={() => navigate('/admin/create')}>Créer un vol</button>
        <button onClick={() => setShowUpdateInput(!showUpdateInput)}>
          Modifier un vol
        </button>
        {showUpdateInput && (
          <div className="update-input">
            <label htmlFor="update-id">Entrez l'ID du vol :</label>
            <input
              type="number"
              id="update-id"
              value={updateId}
              onChange={(e) => setUpdateId(e.target.value)}
              placeholder="ID du vol"
            />
            <button onClick={handleUpdateNavigation}>Confirmer</button>
          </div>
        )}
        <button onClick={() => setShowDeleteInput(!showDeleteInput)}>
          Supprimer un vol
        </button>
        {showDeleteInput && (
          <div className="delete-input">
            <label htmlFor="delete-id">Entrez l'ID du vol :</label>
            <input
              type="number"
              id="delete-id"
              value={deleteId}
              onChange={(e) => setDeleteId(e.target.value)}
              placeholder="ID du vol"
            />
            <button onClick={handleDeleteFlight}>Supprimer</button>
          </div>
        )}
        <button onClick={() => navigate('/admin/read')}>Afficher les vols</button>
      </div>
    </div>
  );
};

export default Admin;
