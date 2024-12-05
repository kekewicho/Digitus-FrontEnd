import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.idProducto === item.idProducto);

      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.idProducto === item.idProducto
            ? { ...cartItem, cantidad: cartItem.cantidad + 1 }
            : cartItem
        );
      }

      return [...prevCart, { ...item, cantidad: 1 }];
    });
  };

  

  const removeFromCart = (idProducto) =>
    setCart((prevCart) => prevCart.filter((item) => item.idProducto !== idProducto));

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);