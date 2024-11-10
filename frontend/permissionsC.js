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
  // Formularios de la página HTML
  const adicionarCursosForm = document.getElementById("adicionarCursos");
  const listarCursosForm = document.getElementById("listarCursos");
  const actualizarCursoForm = document.getElementById("actualizarCurso");
  const listarunCursosForm = document.getElementById("listarunCursos");
  const eliminarCursosForm = document.getElementById("eliminarCursos");

  // Ajustar permisos según el rol
  if (role === "ADMIN") {
    // ADMIN tiene acceso a todas las secciones
    adicionarCursosForm.style.display = "block";
    listarCursosForm.style.display = "block";
    actualizarCursoForm.style.display = "block";
    listarunCursosForm.style.display = "block";
    eliminarCursosForm.style.display = "block";
  } else if (role === "PROFESOR") {
    // PROFESOR puede adicionar y listar cursos, pero no eliminar
    adicionarCursosForm.style.display = "block";
    listarCursosForm.style.display = "block";
    actualizarCursoForm.style.display = "none";
    listarunCursosForm.style.display = "block";
    eliminarCursosForm.style.display = "none";
  } else if (role === "ESTUDIANTE") {
    // ESTUDIANTE solo puede listar cursos y ver un curso
    adicionarCursosForm.style.display = "none";
    listarCursosForm.style.display = "block";
    actualizarCursoForm.style.display = "none";
    listarunCursosForm.style.display = "block";
    eliminarCursosForm.style.display = "none";
  } else {
    console.warn("Rol no reconocido, ocultando todos los formularios.");
    adicionarCursosForm.style.display = "none";
    listarCursosForm.style.display = "none";
    actualizarCursoForm.style.display = "none";
    listarunCursosForm.style.display = "none";
    eliminarCursosForm.style.display = "none";
  }
}
