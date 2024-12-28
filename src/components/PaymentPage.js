import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const PaymentPage = () => {
  const location = useLocation();
  const reservationData = location.state?.reservationData;

  const [couponCode, setCouponCode] = useState('');
  const [finalPrice, setFinalPrice] = useState(reservationData?.price || 0);
  const [couponError, setCouponError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!reservationData) {
    return <div>Error: Reservation data not found!</div>;
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

  return (
    <div>
      <h1>Reservation Details</h1>
      <p><strong>Email:</strong> {email || 'Not available'}</p>
      <p><strong>CIN:</strong> {cin || 'Not available'}</p>
      <p><strong>Original Price:</strong> {price}</p>

      <div>
        <h3>Apply Coupon</h3>
        <input
          type="text"
          value={couponCode}
          onChange={handleCouponChange}
          placeholder="Enter coupon code"
        />
        <button onClick={applyCoupon} disabled={loading}>
          {loading ? 'Applying...' : 'Apply Coupon'}
        </button>
        {couponError && <p style={{ color: 'red' }}>{couponError}</p>}
        {finalPrice !== price && (
          <p><strong>Discounted Price:</strong> {finalPrice}</p>
        )}
      </div>

      <button>Proceed to Payment</button>
    </div>
  );
};

export default PaymentPage;
