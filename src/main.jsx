import React from 'react';
import { CartProvider } from "./components/CartProvider";
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css'

import { Inicio } from "./module/Inicio/Inicio";
import { More } from "./module/More/More";
import { Detalles } from "./module/Detalles/Detalles";
import { Carrito } from "./module/Carrito/Carrito";
import { Checkout } from "./module/Checkout/Checkout";
import { Dashboard } from "./module/Dashboard/Dashboard";
import { DetallesPedido } from "./module/DetallesPedido/DetallesPedido";
import { Login } from "./module/Login/Login";

import { NavBar } from "./components/NavBar";

const App = () => {



  return (
    <React.StrictMode>
      <CartProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<NavBar screen={<Inicio />} />} />
            <Route path="/more" element={<NavBar screen={<More />} />} />
            <Route path="/detalles" element={<NavBar screen={<Detalles />} />} />
            <Route path="/cart" element={<NavBar screen={<Carrito />} />} />
            <Route path="/checkout" element={<NavBar screen={<Checkout />} />} />
            <Route path="/dashboard" element={<NavBar screen={<Dashboard />} />} />
            <Route path="/detallespedido" element={<NavBar screen={<DetallesPedido />} />} />
            <Route path="/login" element={<NavBar screen={<Login />} />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </React.StrictMode>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<App />);

