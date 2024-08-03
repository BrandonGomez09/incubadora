import React from 'react';
import './InputField.css'; // Importa el archivo CSS

const InputField = ({ id, type, placeholder, value, onChange }) => {
  return (
    <div className="input-container">
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="styled-input" // Asegúrate de que la clase esté aquí
      />
    </div>
  );
};

export default InputField;
