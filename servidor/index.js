const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*", // Permite todas las conexiones, cambiar según sea necesario
    methods: ["GET", "POST"]
  }
});

app.use(cors());

io.on('connection', (socket) => {
  console.log('Cliente conectado');

  socket.on('register', (data) => {
    console.log('Registro recibido:', data);
    // Maneja el registro (ej. guardarlo en una base de datos)
  });

  socket.on('login', (data) => {
    console.log('Inicio de sesión recibido:', data);
    // Maneja el inicio de sesión
  });

  socket.on('updateTable', (data) => {
    console.log('Actualización de tabla recibida:', data);
    // Enviar la actualización a todos los clientes conectados
    io.emit('updateTable', data);
  });

  socket.on('disconnect', () => {
    console.log('Cliente desconectado');
  });
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
