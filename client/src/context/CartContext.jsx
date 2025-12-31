import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Load cart from localStorage on startup (so you don't lose items on refresh)
  useEffect(() => {
    const savedCart = localStorage.getItem('tayyab-cart');
    if (savedCart) setCart(JSON.parse(savedCart));
  }, []);

  // Save cart whenever it changes
  useEffect(() => {
    localStorage.setItem('tayyab-cart', JSON.stringify(cart));
  }, [cart]);

  // Add to Cart Function
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item._id === product._id);
      if (existingItem) {
        return prevCart.map((item) =>
          item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  // Remove from Cart Function
  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item._id !== id));
  };

  // Increase/Decrease Quantity
  const updateQuantity = (id, amount) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item._id === id ? { ...item, quantity: Math.max(1, item.quantity + amount) } : item
      )
    );
  };

  // Clear Cart (after order)
  const clearCart = () => setCart([]);

  // Calculate Totals
  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, getCartTotal }}>
      {children}
    </CartContext.Provider>
  );
};