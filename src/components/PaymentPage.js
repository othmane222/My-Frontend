import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const reservationData = location.state?.reservationData;

  const [couponCode, setCouponCode] = useState('');
  const [finalPrice, setFinalPrice] = useState(reservationData?.price || 0);
  const [departure, setDeparture] = useState(reservationData?.departure);
  const [destination, setDestination] = useState(reservationData?.destination);
  const [couponError, setCouponError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!reservationData) {
    return <div className="alert alert-danger">Error: Reservation data not found!</div>;
  }

  const { passengers, price } = reservationData;
  const firstPassenger = passengers ? passengers[0] : {};
  const { email, cin } = firstPassenger;

  const handleCouponChange = (e) => {
    setCouponCode(e.target.value);
  };

  const applyCoupon = async () => {
    setLoading(true);
    setCouponError('');

    try {
      const response = await axios.post(
        `http://localhost:8090/api/coupons/apply?code=${couponCode}&amount=${price}`
      );

      if (response.data) {
        const resultMessage = response.data;
        const match = resultMessage.match(/Final amount: (\d+(\.\d+)?)/); // Extract the final amount
        if (match) {
          const finalAmount = parseFloat(match[1]);
          setFinalPrice(finalAmount);
        } else {
          setCouponError('Invalid response from the server.');
        }
      } else {
        setCouponError('No response from the server.');
      }
    } catch (error) {
      setCouponError('Error applying coupon. Please try again.');
      console.error('Error applying coupon:', error);
    } finally {
      setLoading(false);
    }
  };

  const proceedToPayment = () => {
    navigate('/payment-form', {
      state: {
        finalPrice,
        reservationData,
      },
    });
  };

  return (
    <div className="container mt-4">
      <h1>Reservation Details</h1>
      <div className="mb-3">
        <p><strong>Email:</strong> {email || 'Not available'}</p>
        <p><strong>CIN:</strong> {cin || 'Not available'}</p>
        <p><strong>Original Price:</strong> ${price}</p>
      </div>

      <div className="mb-4">
        <h3>Apply Coupon</h3>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            value={couponCode}
            onChange={handleCouponChange}
            placeholder="Enter coupon code"
          />
          <button
            className="btn btn-secondary mb-3"
            onClick={applyCoupon}
            disabled={loading}
          >
            {loading ? 'Applying...' : 'Apply Coupon'}
          </button>
        </div>
        {couponError && <p className="text-danger">{couponError}</p>}
        {finalPrice !== price && (
          <p><strong>Discounted Price:</strong> ${finalPrice}</p>
        )}
      </div>

      <button className="btn btn-secondary mb-3" onClick={proceedToPayment}>
        Proceed to Payment
      </button>
    </div>
  );
};

export default PaymentPage;
