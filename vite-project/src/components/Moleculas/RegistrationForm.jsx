import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InputField from '../Atomos/InputField';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({    
    username: '',
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleChange = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Error al registrar el usuario');
      }

      // Redirigir a la página de inicio después de un registro exitoso
      navigate('/info');
    } catch (error) {
      console.error('Error al registrar el usuario:', error);
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
        id="email"
        type="email"
        placeholder="Correo"
        value={formData.email}
        onChange={(value) => handleChange('email', value)}
      />
      <InputField
        id="password"
        type="password"
        placeholder="Contraseña"
        value={formData.password}
        onChange={(value) => handleChange('password', value)}
      />
      <button type="submit">Registrar</button>
    </form>
  );
};

export default RegistrationForm;
