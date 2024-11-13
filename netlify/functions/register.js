const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost", // Cambia estos valores según tu configuración
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

// Función para manejar la solicitud de registro
exports.handler = async (event) => {
  if (event.httpMethod === "POST") {
    const { username, numero, password, role } = JSON.parse(event.body);

    // Definimos las contraseñas válidas para cada rol
    const validPasswords = {
      ADMIN: "admin123", // Contraseña para el rol ADMIN
      ESTUDIANTE: "es123", // Contraseña para el rol ESTUDIANTE
      PROFESOR: "pro123", // Contraseña para el rol PROFESOR
    };

    // Validamos si el rol existe y si la contraseña es correcta
    if (!validPasswords[role] || password !== validPasswords[role]) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          error: "Contraseña incorrecta para el rol seleccionado",
        }),
      };
    }

    // Verificar si el usuario ya existe en la base de datos
    const checkQuery = `SELECT * FROM usuarios WHERE username = ?`;
    const checkResult = await new Promise((resolve, reject) => {
      db.query(checkQuery, [username], (err, results) => {
        if (err) {
          reject(err);
        }
        resolve(results);
      });
    });

    if (checkResult.length > 0) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          error: "El nombre de usuario ya está registrado.",
        }),
      };
    }

    // Si la contraseña es correcta y el usuario no existe, insertamos el usuario en la base de datos
    const query = `INSERT INTO usuarios (username, numero, tipo_usuario) VALUES (?, ?, ?)`;

    return new Promise((resolve, reject) => {
      db.query(query, [username, numero, role], (err, results) => {
        if (err) {
          reject(err);
          return resolve({
            statusCode: 500,
            body: JSON.stringify({ error: "Error al registrar el usuario" }),
          });
        }

        resolve({
          statusCode: 200,
          body: JSON.stringify({
            success: true,
            message: "Usuario registrado correctamente",
          }),
        });
      });
    });
  } else {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Método no permitido" }),
    };
  }
};
