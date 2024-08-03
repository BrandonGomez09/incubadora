import Chart from 'chart.js/auto';
import React, { useEffect, useRef, useState } from 'react';

const ChartComponent = () => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const [data, setData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Temperatura',
        data: [],
        borderColor: 'red',
        fill: true,
        tension: 0.1,
      },
      {
        label: 'Humedad',
        data: [],
        borderColor: 'blue',
        fill: true,
        tension: 0.1,
      },
    ],
  });

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext('2d');
    chartInstance.current = new Chart(ctx, {
      type: 'line',
      data: data,
      options: {
        scales: {
          x: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Tiempo',
            },
          },
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Valor',
            },
          },
        },
      },
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [data]);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080/');

    ws.onopen = () => {
      console.log('Connected to WebSocket');
    };

    ws.onmessage = (event) => {
      const newData = JSON.parse(event.data);
      const timestamp = new Date().toLocaleTimeString();

      setData((prevData) => {
        const newLabels = [...prevData.labels, timestamp].slice(-10);
        const newTempData = [...prevData.datasets[0].data, newData.temperature].slice(-10);
        const newHumidityData = [...prevData.datasets[1].data, newData.humidity].slice(-10);

        return {
          labels: newLabels,
          datasets: [
            { ...prevData.datasets[0], data: newTempData },
            { ...prevData.datasets[1], data: newHumidityData },
          ],
        };
      });
    };

    ws.onerror = (event) => {
      console.error('WebSocket error:', event);
    };

    ws.onclose = () => {
      console.log('WebSocket connection closed');
    };

    return () => {
      ws.close();
    };
  }, []);

  return (
    <div>
      <h2>Gráfica de Temperatura y Humedad</h2>
      <canvas ref={chartRef} width="400" height="400"></canvas>
      <table>
        <thead>
          <tr>
            <th>Tiempo</th>
            <th>Temperatura</th>
            <th>Humedad</th>
          </tr>
        </thead>
        <tbody>
          {data.labels.map((label, index) => (
            <tr key={index}>
              <td>{label}</td>
              <td>{data.datasets[0].data[index]}</td>
              <td>{data.datasets[1].data[index]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ChartComponent;
