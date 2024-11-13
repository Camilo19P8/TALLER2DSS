// backend/database/conexion.js
const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Kurumy2004",
  database: "cursos",
});

db.connect((err) => {
  if (err) {
    console.error("Error de conexión a la base de datos:", err);
    throw err;
  }
  console.log("BD Mysql Conectado");
});

module.exports = db;
