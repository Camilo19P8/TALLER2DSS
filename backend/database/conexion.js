const mysql = require("mysql2");
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Kurumy2004",
  database: "cursos",
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("BD Mysql Conectado");
});

module.exports = db;
