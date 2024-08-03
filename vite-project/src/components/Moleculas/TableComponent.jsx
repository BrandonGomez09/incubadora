import React, { useEffect, useState } from 'react';
import './TableComponent.css';
import io from 'socket.io-client';

const TableComponent = () => {
  const [data, setData] = useState({
    especie: 'gallina',
    periodoIncubadora: 21,
    temperatura: 33.7,
    humedadPorcentaje: 55.6,
    humedadUltimos3Dias: [
      { dia: 'Día 1', humedad: 50 },
      { dia: 'Día 2', humedad: 52 },
      { dia: 'Día 3', humedad: 54 }
    ]
  });

  useEffect(() => {
    const socket = io('ws://localhost:8080'); // Asegúrate de que esta URL sea correcta

    socket.on('updateTable', (newData) => {
      setData(newData);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className="table-container">
      <h2>Información de Incubación</h2>
      <table className="custom-table">
        <tbody>
          <tr>
            <th className="cell-species">Especie</th>
            <td>{data.especie}</td>
          </tr>
          <tr>
            <th className="cell-period">Periodo Incubadora</th>
            <td>{data.periodoIncubadora}</td>
          </tr>
          <tr>
            <th className="cell-temp">TEM. (Cº)</th>
            <td>{data.temperatura}</td>
          </tr>
          <tr>
            <th className="cell-humidity">Humedad %</th>
            <td>{data.humedadPorcentaje}</td>
          </tr>
          <tr>
            <th className="cell-humidity-last3">Humedad últimos 3 días</th>
            <td>
              <ul>
                {data.humedadUltimos3Dias.map((item, index) => (
                  <li key={index}>
                    {item.dia}: {item.humedad}%
                  </li>
                ))}
              </ul>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default TableComponent;
