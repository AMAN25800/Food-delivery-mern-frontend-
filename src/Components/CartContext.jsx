import React, { createContext, useState, useEffect } from 'react';

// Create the Cart context
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // Initialize the cart as an empty array
  const [cart, setCart] = useState([]);

  // Function to add item to the cart
  const addToCart = (item) => {
    const existingItem = cart.find(cartItem => cartItem.name === item.name);

    // If the item exists, increment its quantity by 1
    if (existingItem) {
      setCart(cart.map(cartItem =>
        cartItem.name === item.name
          ? { ...cartItem, quantity: Number(cartItem.quantity) + 1 }
          : cartItem
      ));
    } else {
      // If it's a new item, add it to the cart with a quantity of 1
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  // Function to remove item from the cart by name
  const removeFromCart = (name) => {
    setCart(cart.filter(cartItem => cartItem.name !== name));
  };

  // Increment item quantity
  const incrementQuantity = (name) => {
    setCart(cart.map(item =>
      item.name === name ? { ...item, quantity: Number(item.quantity) + 1 } : item
    ));
  };

  // Decrement item quantity
  const decrementQuantity = (name) => {
    setCart(cart.map(item =>
      item.name === name && item.quantity > 1
        ? { ...item, quantity: Number(item.quantity) - 1 }
        : item
    ));
  };

  // Function to clear cart (on logout or session end)
  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, setCart, addToCart, removeFromCart, incrementQuantity, decrementQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
