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
  const adicionarProfesorForm = document.getElementById("adicionarProfesores");
  const listarProfesoresForm = document.getElementById("listarProfesores");
  const actualizarProfesorForm = document.getElementById("actualizarProfesor");
  const listarUnProfesorForm = document.getElementById("listarunProfesores");
  const eliminarProfesorForm = document.getElementById("eliminarProfesor");

  // Ajustar permisos según el rol
  if (role === "ADMIN") {
    // ADMIN tiene acceso a todas las secciones
    adicionarProfesorForm.style.display = "block";
    listarProfesoresForm.style.display = "block";
    actualizarProfesorForm.style.display = "block";
    listarUnProfesorForm.style.display = "block";
    eliminarProfesorForm.style.display = "block";
  } else if (role === "PROFESOR") {
    // PROFESOR puede adicionar, listar y modificar profesores, pero no eliminar
    adicionarProfesorForm.style.display = "block";
    listarProfesoresForm.style.display = "block";
    actualizarProfesorForm.style.display = "none";
    listarUnProfesorForm.style.display = "block";
    eliminarProfesorForm.style.display = "none";
  } else if (role === "ESTUDIANTE") {
    // ESTUDIANTE solo puede listar y ver profesores
    adicionarProfesorForm.style.display = "none";
    listarProfesoresForm.style.display = "block";
    actualizarProfesorForm.style.display = "none";
    listarUnProfesorForm.style.display = "block";
    eliminarProfesorForm.style.display = "none";
  } else {
    console.warn("Rol no reconocido, ocultando todos los formularios.");
    adicionarProfesorForm.style.display = "none";
    listarProfesoresForm.style.display = "none";
    actualizarProfesorForm.style.display = "none";
    listarUnProfesorForm.style.display = "none";
    eliminarProfesorForm.style.display = "none";
  }
}
