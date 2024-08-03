import React, { useState } from 'react';
import InputField from '../Atomos/InputField';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleChange = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Error al iniciar sesión');
      }

      // Redirigir a la página de información después de un inicio de sesión exitoso
      navigate('/info');
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <InputField
        id="username"
        type="text"
        placeholder="Usuario"
        value={formData.username}
        onChange={(value) => handleChange('username', value)}
      />
      <InputField
        id="password"
        type="password"
        placeholder="Contraseña"
        value={formData.password}
        onChange={(value) => handleChange('password', value)}
      />
      <button type="submit">Iniciar Sesión</button>
    </form>
  );
};

export default LoginForm;
