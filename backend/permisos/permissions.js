document.addEventListener("DOMContentLoaded", function () {
  // Realizar solicitud a la función serverless de Netlify para obtener el rol del usuario
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
  // Secciones y formularios en la página HTML
  const adicionarEstudianteForm = document.getElementById(
    "adicionarEstudiante"
  );
  const listarEstudiantesForm = document.getElementById("listarEstudiantes");
  const actualizarEstudianteForm = document.getElementById(
    "actualizarEstudiante"
  );
  const listarUnEstudianteForm = document.getElementById("listarunEstudiante");
  const eliminarEstudianteForm = document.getElementById("eliminarEstudiante");

  // Ajustar permisos según el rol
  if (role === "ADMIN") {
    // ADMIN tiene acceso a todas las secciones
    adicionarEstudianteForm.style.display = "block";
    listarEstudiantesForm.style.display = "block";
    actualizarEstudianteForm.style.display = "block";
    listarUnEstudianteForm.style.display = "block";
    eliminarEstudianteForm.style.display = "block";
  } else if (role === "PROFESOR") {
    // PROFESOR puede adicionar y listar estudiantes, pero no eliminar
    adicionarEstudianteForm.style.display = "block";
    listarEstudiantesForm.style.display = "block";
    actualizarEstudianteForm.style.display = "none";
    listarUnEstudianteForm.style.display = "block";
    eliminarEstudianteForm.style.display = "none";
  } else if (role === "ESTUDIANTE") {
    // ESTUDIANTE solo puede listar estudiantes y ver un estudiante
    adicionarEstudianteForm.style.display = "none";
    listarEstudiantesForm.style.display = "block";
    actualizarEstudianteForm.style.display = "none";
    listarUnEstudianteForm.style.display = "block";
    eliminarEstudianteForm.style.display = "none";
  } else {
    console.warn("Rol no reconocido, ocultando todos los formularios.");
    adicionarEstudianteForm.style.display = "none";
    listarEstudiantesForm.style.display = "none";
    actualizarEstudianteForm.style.display = "none";
    listarUnEstudianteForm.style.display = "none";
    eliminarEstudianteForm.style.display = "none";
  }
}
