const db = require("../../backend/database/conexion.js");

exports.handler = async (event) => {
  try {
    const { code } = JSON.parse(event.body);
    const sessionCode = process.env.VERIFICATION_CODE || "";
    const userId = process.env.USER_ID || null;
    const username = process.env.USERNAME || "";
    const userRole = process.env.USER_ROLE || "";

    console.log("Código recibido:", code);
    console.log("Código de sesión:", sessionCode);

    if (code === sessionCode) {
      console.log("Código correcto. Verificación exitosa.");

      // Eliminamos todas las sesiones existentes
      await new Promise((resolve, reject) => {
        db.query("DELETE FROM sesion", (err) => {
          if (err) return reject(err);
          resolve();
        });
      });

      // Guardamos la nueva sesión
      await new Promise((resolve, reject) => {
        const insertQuery = `
          INSERT INTO sesion (Id_Usuario, Nombre_Usuario, Rol, Inicio)
          VALUES (?, ?, ?, NOW())
        `;
        db.query(insertQuery, [userId, username, userRole], (err) => {
          if (err) return reject(err);
          resolve();
        });
      });

      // Respuesta exitosa con redirección a "profesor.html"
      return {
        statusCode: 200,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          success: true,
          redirect: "/profesor.html", // Página a redirigir
          localStorage: {
            isLoggedIn: "true", // Indicamos que el usuario está autenticado
          },
        }),
      };
    } else {
      console.log("Código incorrecto");
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: "Código incorrecto. Intenta nuevamente.",
        }),
      };
    }
  } catch (error) {
    console.error("Error en la verificación del código:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Error interno del servidor." }),
    };
  }
};
