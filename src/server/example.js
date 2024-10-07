// src/server/db.js

import mysql from 'mysql2';

// Crear un pool de conexiones a la base de datos
const pool = mysql.createPool({
    host: "#",
    user: "#",
    password: "#",
    database: "#"
});

// Exportar el pool para su uso en otros archivos
export default pool;
