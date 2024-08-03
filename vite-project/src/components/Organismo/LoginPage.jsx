import React from 'react';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import ImageComponent from '../Atomos/ImageComponent'; // Importa el componente de imagen
import LoginForm from '../Moleculas/LoginForm';
import './LoginPage.css'; // Importa el archivo CSS

const LoginPage = () => {
  const navigate = useNavigate(); // Inicializa useNavigate

  const goToRegister = () => {
    navigate('/register'); // Redirige a la página de registro
  };

  return (
    <div className="login-container">
      <ImageComponent />
      <h2 className="login-title">Iniciar Sesión</h2>
      <LoginForm />
      <br></br>
      <button onClick={goToRegister}>¿No tienes una cuenta? Regístrate</button>
    </div>
  );
};

export default LoginPage;
