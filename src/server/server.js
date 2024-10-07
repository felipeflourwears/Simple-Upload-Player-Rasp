import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import db from './db.js'; // Importa la conexión desde el archivo db.js

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json()); // Para parsear cuerpos JSON

// Endpoint POST para manejar la carga de videos y colores
app.post('/upload', (req, res) => {
    const { video, color } = req.body;

    console.log(`Received request to upload video: ${video}, color: ${color}`);

    const sql = 'INSERT INTO content (video, color) VALUES (?, ?)';
    db.query(sql, [video, color], (err, result) => {
        if (err) {
            console.error('Error inserting data:', err); 
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ message: 'Data inserted successfully!', id: result.insertId });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
