import React, { createContext, useState, useContext } from 'react';

// Create CartContext
const CartContext = createContext();

// Create a provider for CartContext
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Function to add reservation to cart
  const addToCart = (reservation) => {
    setCart((prevCart) => [...prevCart, reservation]);
  };

  // Function to remove reservation from cart
  const removeFromCart = (reservationId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== reservationId));
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use the cart context
export const useCart = () => {
  return useContext(CartContext);
};
