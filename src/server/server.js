import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import multer from 'multer'; // Use import instead of require
import pool from './db.js'; // Importar el pool de conexiones
import AWS from 'aws-sdk'; // Change require to import
import dotenv from 'dotenv'; // Importa dotenv

dotenv.config();

const upload = multer({ storage: multer.memoryStorage() });
const accessKeyId = process.env.AWS_ACCESS_KEY_ID; // Ensure you have this in your .env
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY; // Ensure you have this in your .env
const bucket = process.env.AWS_NAME_BUCKET; // Ensure you have this in your .env
const regionAWS = process.env.AWS_REGION; // Ensure you have this in your .env


const s3 = new AWS.S3({
    accessKeyId: accessKeyId,
    secretAccessKey: secretAccessKey,
    region: regionAWS, 
});

// Crear la aplicación Express
const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json()); // Para parsear cuerpos JSON


// Función para convertir hexadecimal a RGB
const hexToRgb = (hex) => {
    hex = hex.replace(/^#/, '');
    const bigint = parseInt(hex, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
  
    return `${r}, ${g}, ${b}`;
};

// Endpoint POST para manejar la carga de videos y colores
app.post('/upload', upload.single('videoFile'), async (req, res) => {
    const color_received = req.body.color;
    const videoFile = req.file;
    const color = hexToRgb(color_received); // Convierte a RGB

    console.log(`Received request to upload video: ${videoFile.originalname}, color: ${color}`); // Use originalname instead of name

    const url = "https://mediapopa.s3.amazonaws.com/" + videoFile.originalname;

    // Configura los parámetros para subir el archivo a S3
    const params = {
        Bucket: bucket,
        Key: videoFile.originalname, // Nombre del archivo en S3
        Body: videoFile.buffer, // Contenido del archivo
        ContentType: videoFile.mimetype, // Tipo MIME
    };

    try {

        // Sube el archivo a S3
        const s3Response = await s3.upload(params).promise();
        console.log('Archivo subido a S3:', s3Response.Location);
        
        // Consultar la base de datos para insertar los datos
        pool.query('INSERT INTO content (video, color) VALUES (?, ?)', [url, color], (err, result) => {
            if (err) {
                console.error('Error inserting data:', err);
                return res.status(500).json({ error: err.message });
            }
            res.status(201).json({ message: 'Data inserted successfully!', id: result.insertId });
        });
        
    } catch (error) {
        console.error('Error al subir el archivo a S3:', error);
        res.status(500).json({ error: 'Error al subir el archivo a S3.' });
    }
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
