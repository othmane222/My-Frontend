import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Admin = () => {
  const [updateId, setUpdateId] = useState('');
  const [deleteId, setDeleteId] = useState('');
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [coupons, setCoupons] = useState([]);
  const [showCoupons, setShowCoupons] = useState(false);

  const [showUpdateFlightInput, setShowUpdateFlightInput] = useState(false);
  const [showDeleteFlightInput, setShowDeleteFlightInput] = useState(false);
  const [showDeleteCouponInput, setShowDeleteCouponInput] = useState(false);
  const [showUpdateCouponInput, setShowUpdateCouponInput] = useState(false);

  const navigate = useNavigate();

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
        setDeleteId('');
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
        expirationDate: expirationDate,
        discountPercentage: parseFloat(discount),
      });
      alert('Coupon créé avec succès !');
      setCouponCode('');
      setDiscount('');
      setExpirationDate('');
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

  const handleEditCoupon = async () => {
    if (!updateId || !couponCode || discount <= 0 || !expirationDate) {
      alert('Veuillez remplir tous les champs.');
      return;
    }
    try {
      await axios.put(`http://localhost:8083/api/coupons/${updateId}`, {
        code: couponCode,
        expirationDate: expirationDate,
        discountPercentage: parseFloat(discount),
      });
      alert('Coupon mis à jour avec succès !');
      setUpdateId('');
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

      {/* Flight CRUD Operations */}
      <div className="flight-crud">
        <button onClick={() => navigate('/admin/create')}>Créer un vol</button>
        <button onClick={() => setShowUpdateFlightInput(!showUpdateFlightInput)}>
          Modifier un vol
        </button>
        {showUpdateFlightInput && (
          <div>
            <input
              type="number"
              placeholder="ID du vol"
              value={updateId}
              onChange={(e) => setUpdateId(e.target.value)}
            />
            <button onClick={handleUpdateFlightNavigation}>Confirmer</button>
          </div>
        )}
        <button onClick={() => setShowDeleteFlightInput(!showDeleteFlightInput)}>
          Supprimer un vol
        </button>
        {showDeleteFlightInput && (
          <div>
            <input
              type="number"
              placeholder="ID du vol"
              value={deleteId}
              onChange={(e) => setDeleteId(e.target.value)}
            />
            <button onClick={handleDeleteFlight}>Supprimer</button>
          </div>
        )}
        <button onClick={() => navigate('/admin/read')}>Afficher les vols</button>
      </div>

      {/* Coupon CRUD Operations */}
      <div className="coupon-crud">
        <button onClick={() => setShowUpdateCouponInput(!showUpdateCouponInput)}>
          Mettre à jour un coupon
        </button>
        {showUpdateCouponInput && (
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
            <button onClick={handleEditCoupon}>Mettre à jour</button>
          </div>
        )}

        <button onClick={handleCreateCoupon}>Créer un coupon</button>
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
          <button onClick={handleCreateCoupon}>Créer</button>
        </div>

        <button onClick={() => setShowDeleteCouponInput(!showDeleteCouponInput)}>
          Supprimer un coupon
        </button>
        {showDeleteCouponInput && (
          <div>
            <input
              type="number"
              placeholder="ID du coupon"
              value={deleteId}
              onChange={(e) => setDeleteId(e.target.value)}
            />
            <button onClick={handleDeleteCoupon}>Supprimer</button>
          </div>
        )}

        <button onClick={() => setShowCoupons(!showCoupons)}>Afficher tous les coupons</button>
        {showCoupons && (
          <div>
            <h3>Liste des Coupons</h3>
            {coupons.length === 0 ? (
              <p>Aucun coupon disponible.</p>
            ) : (
              <ul>
                {coupons.map((coupon) => (
                  <li key={coupon.id}>
                    Code: {coupon.code}, Remise: {coupon.discountPercentage}%, Expiration:{' '}
                    {coupon.expirationDate}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
