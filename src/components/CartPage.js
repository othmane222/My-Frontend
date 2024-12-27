import React from 'react';
import { useCart } from './CartContext';

const CartPage = () => {
  const { cart, removeFromCart } = useCart();

  return (
    <div>
      <h2>Your Cart</h2>
      <ul>
        {cart.map((reservation, index) => (
          <li key={index}>
            <p>Flight ID: {reservation.flightId}</p>
            <p>Class: {reservation.flightClassType}</p>
            <button onClick={() => removeFromCart(reservation.flightId)}>
              Remove from Cart
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CartPage;
