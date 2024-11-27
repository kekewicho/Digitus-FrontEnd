import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css'

import { Inicio } from "./module/Inicio/Inicio";

const App = () => {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Inicio />} />
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<App />);

