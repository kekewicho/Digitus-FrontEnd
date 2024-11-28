import React from 'react';
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

import { NavBar } from "./components/NavBar";

const App = () => {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<NavBar screen={<Inicio />} />} />
          <Route path="/more" element={<NavBar screen={<More />} />} />
          <Route path="/detalles" element={<NavBar screen={<Detalles />} />} />
          <Route path="/carrito" element={<NavBar screen={<Carrito />} />} />
          <Route path="/checkout" element={<NavBar screen={<Checkout />} />} />
          <Route path="/dashboard" element={<NavBar screen={<Dashboard />} />} />
          <Route path="/detallespedido" element={<NavBar screen={<DetallesPedido />} />} />
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<App />);

