import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

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
      await axios.delete(`http://localhost:8090/api/coupons/${deleteId}`);
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
      await axios.put(`http://localhost:8090/api/coupons/${updateId}`, {
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
      const response = await axios.get('http://localhost:8090/api/coupons');
      setCoupons(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des coupons :', error);
      alert('Une erreur est survenue lors de la récupération des coupons.');
    }
  };

  useEffect(() => {
    getAllCoupons();
  }, []);

  const buttonStyle = {
    backgroundColor: '#445E75', // Set your color here
    color: '#fff', // White text for contrast
    border: 'none', // Remove border if you want
  };

  return (
    <div className="container my-5">
      <h1 className="text-center mb-4">Admin Dashboard</h1>

      {/* Flight CRUD Operations */}
      <div className="mb-5">
        <h2>Gestion des Vols</h2>
        <div className="d-flex flex-column gap-3">
          <button onClick={() => navigate('/admin/create')} style={buttonStyle}>
            Créer un vol
          </button>
          <button
            onClick={() => setShowUpdateFlightInput(!showUpdateFlightInput)}
            style={buttonStyle}
          >
            Modifier un vol
          </button>
          {showUpdateFlightInput && (
            <div className="d-flex gap-3">
              <input
                type="number"
                className="form-control"
                placeholder="ID du vol"
                value={updateId}
                onChange={(e) => setUpdateId(e.target.value)}
              />
              <button onClick={handleUpdateFlightNavigation} style={buttonStyle}>
                Confirmer
              </button>
            </div>
          )}
          <button
            onClick={() => setShowDeleteFlightInput(!showDeleteFlightInput)}
            style={buttonStyle}
          >
            Supprimer un vol
          </button>
          {showDeleteFlightInput && (
            <div className="d-flex gap-3">
              <input
                type="number"
                className="form-control"
                placeholder="ID du vol"
                value={deleteId}
                onChange={(e) => setDeleteId(e.target.value)}
              />
              <button onClick={handleDeleteFlight} style={buttonStyle}>
                Supprimer
              </button>
            </div>
          )}
          <button onClick={() => navigate('/admin/read')} style={buttonStyle}>
            Afficher les vols
          </button>
        </div>
      </div>

      {/* Coupon CRUD Operations */}
      <div>
        <h2>Gestion des Coupons</h2>
        <div className="d-flex flex-column gap-3">
          <button
            onClick={() => setShowUpdateCouponInput(!showUpdateCouponInput)}
            style={buttonStyle}
          >
            Mettre à jour un coupon
          </button>
          {showUpdateCouponInput && (
            <div className="d-flex flex-column gap-3">
              <input
                type="number"
                className="form-control"
                placeholder="ID du coupon"
                value={updateId}
                onChange={(e) => setUpdateId(e.target.value)}
              />
              <input
                type="text"
                className="form-control"
                placeholder="Code Coupon"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
              />
              <input
                type="number"
                className="form-control"
                placeholder="Pourcentage de remise"
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
              />
              <input
                type="date"
                className="form-control"
                value={expirationDate}
                onChange={(e) => setExpirationDate(e.target.value)}
              />
              <button onClick={handleEditCoupon} style={buttonStyle}>
                Mettre à jour
              </button>
            </div>
          )}

          <button onClick={handleCreateCoupon} style={buttonStyle}>
            Créer un coupon
          </button>
          <div className="d-flex flex-column gap-3">
            <input
              type="text"
              className="form-control"
              placeholder="Code Coupon"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
            />
            <input
              type="number"
              className="form-control"
              placeholder="Pourcentage de remise"
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
            />
            <input
              type="date"
              className="form-control"
              value={expirationDate}
              onChange={(e) => setExpirationDate(e.target.value)}
            />
            <button onClick={handleCreateCoupon} style={buttonStyle}>
              Créer
            </button>
          </div>

          <button
            onClick={() => setShowDeleteCouponInput(!showDeleteCouponInput)}
            style={buttonStyle}
          >
            Supprimer un coupon
          </button>
          {showDeleteCouponInput && (
            <div className="d-flex gap-3">
              <input
                type="number"
                className="form-control"
                placeholder="ID du coupon"
                value={deleteId}
                onChange={(e) => setDeleteId(e.target.value)}
              />
              <button onClick={handleDeleteCoupon} style={buttonStyle}>
                Supprimer
              </button>
            </div>
          )}

          <button
            onClick={() => setShowCoupons(!showCoupons)}
            style={buttonStyle}
          >
            Afficher tous les coupons
          </button>
          {showCoupons && (
            <div className="mt-4">
              <h3>Liste des Coupons</h3>
              {coupons.length === 0 ? (
                <p>Aucun coupon disponible.</p>
              ) : (
                <ul className="list-group">
                  {coupons.map((coupon) => (
                    <li key={coupon.id} className="list-group-item">
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
