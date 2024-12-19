import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Admin = () => {
  const [updateId, setUpdateId] = useState('');
  const [deleteId, setDeleteId] = useState('');
  const [showUpdateInput, setShowUpdateInput] = useState(false);
  const [showDeleteInput, setShowDeleteInput] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState('');
  const [expirationDate, setExpirationDate] = useState(''); // New state for expiration date
  const navigate = useNavigate();
  const [coupons, setCoupons] = useState([]);
  const [showCoupons, setShowCoupons] = useState(false); // New state to control coupon list visibility

  // Flight CRUD Operations
  const handleUpdateFlightNavigation = () => {
    if (updateId.trim() !== '' && !isNaN(updateId)) {
      navigate(`/admin/update/${updateId}`);
    } else {
      alert('Veuillez entrer un ID numérique valide.');
    }
  };

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

  // Coupon CRUD Operations
  const handleCreateCoupon = async () => {
    if (!couponCode || discount <= 0 || !expirationDate) {
      alert('Veuillez remplir tous les champs.');
      return;
    }
    try {
      await axios.post('http://localhost:8083/api/coupons', {
        code: couponCode,
        expirationDate: expirationDate, // Use the selected expiration date
        discountPercentage: parseFloat(discount), // Ensure this is a float
      });
      alert('Coupon créé avec succès !');
      setCouponCode('');
      setDiscount('');
      setExpirationDate(''); // Clear expiration date after submission
    } catch (error) {
      console.error('Erreur lors de la création du coupon :', error);
      alert('Une erreur est survenue lors de la création du coupon.');
    }
  };

  const handleDeleteCoupon = async () => {
    if (!deleteId) {
      alert('Veuillez entrer un ID de coupon valide.');
      return;
    }
    try {
      await axios.delete(`http://localhost:8083/api/coupons/${deleteId}`);
      alert(`Coupon avec l'ID ${deleteId} supprimé avec succès.`);
      setDeleteId('');
    } catch (error) {
      console.error('Erreur lors de la suppression du coupon :', error);
      alert('Une erreur est survenue lors de la suppression du coupon.');
    }
  };

  const handleEditCoupon = async (coupon) => {
    if (!coupon.code || coupon.discount <= 0 || !coupon.expirationDate) {
      alert('Veuillez remplir tous les champs.');
      return;
    }
    try {
      await axios.put(`http://localhost:8083/api/coupons/${coupon.id}`, {
        code: coupon.code,
        expirationDate: coupon.expirationDate,
        discountPercentage: parseFloat(coupon.discount),
      });
      alert('Coupon mis à jour avec succès !');
      setCouponCode('');
      setDiscount('');
      setExpirationDate('');
    } catch (error) {
      console.error('Erreur lors de la mise à jour du coupon :', error);
      alert('Une erreur est survenue lors de la mise à jour du coupon.');
    }
  };
  
  const getAllCoupons = async () => {
    try {
      const response = await axios.get('http://localhost:8083/api/coupons');
      setCoupons(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des coupons :', error);
      alert('Une erreur est survenue lors de la récupération des coupons.');
    }
  };
  
  useEffect(() => {
    getAllCoupons();
  }, []);

  return (
    <div className="admin-container">
      <h1>Admin Dashboard</h1>
      <div className="admin-menu">
        {/* Flight CRUD Operations */}
        <div className="flight-crud">
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
              <button onClick={handleUpdateFlightNavigation}>Confirmer</button>
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

        {/* Coupon CRUD Operations */}
        <div className="coupon-crud">
          <button onClick={() => setShowUpdateInput(!showUpdateInput)}>
            Créer un coupon
          </button>
          <div>
            <input
              type="text"
              placeholder="Code Coupon"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
            />
            <input
              type="number"
              placeholder="Pourcentage de remise"
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
            />
            <input
              type="date"
              value={expirationDate}
              onChange={(e) => setExpirationDate(e.target.value)}
            />
            <button onClick={handleCreateCoupon}>Créer Coupon</button>
          </div>

          <button onClick={() => setShowDeleteInput(!showDeleteInput)}>
            Supprimer un coupon
          </button>
          {showDeleteInput && (
            <div className="delete-input">
              <label htmlFor="delete-id">Entrez l'ID du coupon :</label>
              <input
                type="number"
                id="delete-id"
                value={deleteId}
                onChange={(e) => setDeleteId(e.target.value)}
                placeholder="ID du coupon"
              />
              <button onClick={handleDeleteCoupon}>Supprimer</button>
            </div>
          )}

          {/* Update Coupon */}
          {showUpdateInput && (
            <div>
              <input
                type="number"
                placeholder="ID du coupon"
                value={updateId}
                onChange={(e) => setUpdateId(e.target.value)}
              />
              <input
                type="text"
                placeholder="Code Coupon"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
              />
              <input
                type="number"
                placeholder="Pourcentage de remise"
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
              />
              <input
                type="date"
                value={expirationDate}
                onChange={(e) => setExpirationDate(e.target.value)}
              />
              <button onClick={() => handleEditCoupon({
                id: updateId,
                code: couponCode,
                discount: discount,
                expirationDate: expirationDate
              })}>
                Mettre à jour
              </button>
            </div>
          )}

          <button onClick={() => setShowCoupons(!showCoupons)}>
            Afficher tous les coupons
          </button>

          {showCoupons && (
            <div className="coupon-list">
              <h3>Liste des Coupons</h3>
              {coupons.length === 0 ? (
                <p>Aucun coupon disponible.</p>
              ) : (
                <ul>
                  {coupons.map((coupon) => (
                    <li key={coupon.id}>
                      Code: {coupon.code}, Remise: {coupon.discountPercentage}%, Expiration: {coupon.expirationDate}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;
