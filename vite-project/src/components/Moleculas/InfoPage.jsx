import React from 'react';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import './InfoPage.css'; // Importa el archivo CSS para estilos

const InfoPage = () => {
  const navigate = useNavigate(); // Inicializa useNavigate

  const goToChart = () => {
    navigate('/chart'); // Redirige a la página de gráficos
  };

  return (
    <div className="info-container">
      <h1 className="info-title">Maximice su beneficio de por vida</h1>
      <p className="info-content">
        Las incubadoras modernas suelen funcionar con una frecuencia de volteo de 24 veces el dia hasta 18º dia de incubacion.
        El volteo de los huevos fertiles tiene un papel clave en el crecimiento embrionario:
      </p>
      <button onClick={goToChart} className="chart-button">Ver Gráficas</button> {/* Botón para redirigir */}
    </div>
  );
};

export default InfoPage;
