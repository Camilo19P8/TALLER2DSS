const mysql = require("mysql2/promise");

exports.handler = async (event, context) => {
  // Configuración de la base de datos
  const dbConfig = {
    host: "localhost",
    user: "root",
    password: "Kurumy2004",
    database: "cursos",
  };

  try {
    // Conexión a la base de datos
    const connection = await mysql.createConnection(dbConfig);

    // Ejecutar la consulta
    const [rows] = await connection.execute("SELECT Rol FROM Sesion LIMIT 1;");

    // Cerrar la conexión
    await connection.end();

    if (rows.length > 0) {
      // Devolver el rol en formato JSON
      return {
        statusCode: 200,
        body: JSON.stringify({ role: rows[0].Rol }),
      };
    } else {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: "Rol no encontrado" }),
      };
    }
  } catch (error) {
    console.error("Error en la función serverless:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "Error en la conexión a la base de datos",
      }),
    };
  }
};
