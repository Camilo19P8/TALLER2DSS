document.addEventListener("DOMContentLoaded", function () {
  // Realizar solicitud a la función serverless de Netlify
  fetch("/.netlify/functions/getUserRole")
    .then((response) => response.json())
    .then((data) => {
      if (data.role) {
        console.log("Rol del usuario:", data.role);
        adjustInterfaceBasedOnRole(data.role);
      } else {
        console.error(
          "Error al obtener el rol:",
          data.error || "Respuesta inesperada"
        );
      }
    })
    .catch((error) => console.error("Error en la solicitud:", error));
});

function adjustInterfaceBasedOnRole(role) {
  const adminSection = document.getElementById("adminSection");
  const professorSection = document.getElementById("professorSection");
  const studentSection = document.getElementById("studentSection");

  if (role === "ADMIN") {
    adminSection.style.display = "block";
  } else if (role === "PROFESOR") {
    adminSection.style.display = "none";
    professorSection.style.display = "block";
  } else if (role === "ESTUDIANTE") {
    adminSection.style.display = "none";
    professorSection.style.display = "none";
    studentSection.style.display = "block";
  }
}
