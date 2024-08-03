// App.jsx

import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import InfoPage from './components/Moleculas/InfoPage';
import ChartPage from './components/Organismo/ChartPage'; // Importa la nueva página de gráfica
import LoginPage from './components/Organismo/LoginPage';
import RegistrationPage from './components/Organismo/RegistrationPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/info" element={<InfoPage />} />
        <Route path="/chart" element={<ChartPage />} /> {/* Nueva ruta para la página de gráfica */}
        <Route path="/" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;
