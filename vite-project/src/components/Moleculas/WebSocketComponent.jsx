import {
    CategoryScale,
    Chart as ChartJS,
    Filler,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip
} from 'chart.js';
import React, { useEffect, useRef, useState } from 'react';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const WebSocketComponent = () => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const wsRef = useRef(null);

    useEffect(() => {
        if (wsRef.current) {
            wsRef.current.close();
        }

        const ws = new WebSocket('ws://localhost:8080/');
        wsRef.current = ws;

        ws.onopen = () => {
            console.log('Connected to WebSocket');
        };

        ws.onmessage = (event) => {
            try {
                const sensorData = JSON.parse(event.data);
                console.log('Received data from WebSocket:', sensorData);

                const processedData = {
                    temperature: sensorData.temperature || 0,
                    humidity: sensorData.humidity || 0,
                    distance: sensorData.distance || 0
                };

                console.log('Processed data for state update:', processedData);

                setData(prevData => {
                    const isDuplicate = prevData.some(d => 
                        Math.abs(d.temperature - processedData.temperature) < 0.1 &&
                        Math.abs(d.humidity - processedData.humidity) < 0.1 &&
                        Math.abs(d.distance - processedData.distance) < 0.1
                    );
                    return isDuplicate ? prevData : [...prevData, processedData];
                });
            } catch (error) {
                console.error('Error parsing message:', error);
                setError('Error parsing message');
            }
        };

        ws.onerror = (event) => {
            console.error('WebSocket error:', event);
            setError('WebSocket error');
        };

        ws.onclose = () => {
            console.log('WebSocket connection closed');
        };

        return () => {
            ws.close();
        };
    }, []);

    const chartData = {
        labels: data.map((_, index) => index),
        datasets: [
            {
                label: 'Temperature',
                data: data.map((d) => d.temperature),
                borderColor: 'rgba(255, 99, 132, 1)',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                fill: true,
            },
            {
                label: 'Humidity',
                data: data.map((d) => d.humidity),
                borderColor: 'rgba(54, 162, 235, 1)',
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                fill: true,
            },
            {
                label: 'Distance',
                data: data.map((d) => d.distance),
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                fill: true,
            },
        ],
    };

    return (
        <div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <Line data={chartData} />
            <table>
                <thead>
                    <tr>
                        <th>Temperature</th>
                        <th>Humidity</th>
                        <th>Distance</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((d, index) => (
                        <tr key={index}>
                            <td>{d.temperature}</td>
                            <td>{d.humidity}</td>
                            <td>{d.distance}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default WebSocketComponent;
