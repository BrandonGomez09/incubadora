// ChartPage.jsx

import React from 'react';
import WebSocketComponent from '../Moleculas/WebSocketComponent'; // Importa el nuevo componente WebSocket
import './ChartPage.css'; // Importa el archivo CSS para estilos específicos de la página

const ChartPage = () => {
  return (
    <div className="chart-page">
      <h1>Dia 21</h1>
      <p>Tiempo 2 dias 25 minutos y 3 segundos.</p>
      <div className="chart-container">
        <WebSocketComponent />
      </div>
    </div>
  );
};

export default ChartPage;
