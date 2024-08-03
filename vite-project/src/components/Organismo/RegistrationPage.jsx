import React from 'react';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import ImageComponent from '../Atomos/ImageComponent'; // Importa el componente de imagen
import RegistrationForm from '../Moleculas/RegistrationForm';
import './RegistrationPage.css'; // Importa el archivo CSS

const RegistrationPage = () => {
  const navigate = useNavigate(); // Inicializa useNavigate

  const goToLogin = () => {
    navigate('/login'); // Redirige a la página de inicio de sesión
  };

  return (
    <div className="registration-page">
      <ImageComponent />
      <div className="registration-container">
        <h1 className="welcome-title">Bienvenido a la Granja</h1>
        <p className="subtitle">Centro exclusivo de incubación</p>
        <h2 className="register-title">Regístrate</h2>
        <RegistrationForm />
        <br></br>
        <button onClick={goToLogin}>¿Ya tienes una cuenta? Inicia sesión</button>
      </div>
    </div>
  );
};

export default RegistrationPage;
