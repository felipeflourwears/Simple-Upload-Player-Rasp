// src/server/server.js

import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import pool from './db.js'; // Importar el pool de conexiones

// Crear la aplicación Express
const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json()); // Para parsear cuerpos JSON

// Endpoint POST para manejar la carga de videos y colores
app.post('/upload', (req, res) => {
    const { video, color } = req.body;
    console.log(`Received request to upload video: ${video}, color: ${color}`);

    // Consultar la base de datos para insertar los datos
    pool.query('INSERT INTO content (video, color) VALUES (?, ?)', [video, color], (err, result) => {
        if (err) {
            console.error('Error inserting data:', err);
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ message: 'Data inserted successfully!', id: result.insertId });
    });
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
