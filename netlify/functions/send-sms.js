const { Vonage } = require("@vonage/server-sdk");
const db = require("../../backend/database/conexion.js");

const vonage = new Vonage({
  apiKey: "7c9c6f6d",
  apiSecret: "wTbUm7sfbnaRF12D"
});

exports.handler = async (event) => {
  const { username } = JSON.parse(event.body);

  return new Promise((resolve) => {
    const query =
      "SELECT id, numero, username, tipo_usuario FROM usuarios WHERE username = ?";
    db.query(query, [username], (err, results) => {
      if (err || results.length === 0) {
        resolve({
          statusCode: 404,
          body: JSON.stringify({ error: "Usuario no encontrado" }),
        });
        return;
      }

      const user = results[0];
      const verificationCode = Math.floor(1000 + Math.random() * 9000);

      process.env.VERIFICATION_CODE = verificationCode;
      process.env.USER_ID = user.id;
      process.env.USERNAME = user.username;
      process.env.USER_ROLE = user.tipo_usuario;

      vonage.sms
        .send({
          to: user.numero,
          from: "VonageAPI",
          text: `Tu código de verificación es: ${verificationCode}`,
        })
        .then((response) => {
          // Aquí se imprime la respuesta completa con más detalles para depuración
          console.log(
            "Respuesta completa de Vonage: ",
            JSON.stringify(response, null, 2)
          ); // Aseguramos que se imprima el objeto completo

          // Accede a los detalles de la respuesta
          const messageStatus = response.messages[0];
          console.log("Estado del mensaje: ", messageStatus);

          if (messageStatus.status === "0") {
            resolve({
              statusCode: 200,
              body: JSON.stringify({ success: true }),
            });
          } else {
            resolve({
              statusCode: 500,
              body: JSON.stringify({
                error: `Error al enviar SMS: ${messageStatus.error_text}`,
              }),
            });
          }
        })
        .catch((error) => {
          console.error("Error al enviar SMS:", error);
          resolve({
            statusCode: 500,
            body: JSON.stringify({ error: "Error al enviar SMS" }),
          });
        });
    });
  });
};
