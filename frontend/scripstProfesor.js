function guardar() {
  let nota = 0.0;
  let apellidos = "";
  let datoingresado = document.getElementById("telefono").value;

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  event.preventDefault();

  let raw = JSON.stringify({
    dni: document.getElementById("dni").value,
    nombre: document.getElementById("nombre").value,
    apellidos: document.getElementById("apellidos").value,
    email: document.getElementById("email").value,
    profesor: document.getElementById("profesor").value,
    telefono: document.getElementById("telefono").value,
  });

  let requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch("http://localhost:8888/.netlify/functions/profesores", requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
}
//eje
function cargar(resultado) {
  let transformado = JSON.parse(resultado);
  var salida = "";
  var elemento = "";

  for (let vc in transformado) {
    elemento = "ID: " + transformado[vc].id;
    elemento = elemento + "<br>Documento de identidad: " + transformado[vc].dni;
    elemento = elemento + "<br>Nombres: " + transformado[vc].nombre;
    elemento = elemento + "<br>Apellidos: " + transformado[vc].apellidos;
    elemento = elemento + "<br>Correo electrónico: " + transformado[vc].email;
    elemento = elemento + "<br>profesor: " + transformado[vc].profesor;
    elemento = elemento + "<br>Telefono: " + transformado[vc].telefono;
    salida = salida + elemento + "<br><br>";
  }
  document.getElementById("rta").innerHTML = salida;
}

function listar() {
  event.preventDefault();
  const requestOptions = {
    method: "GET",
    redirect: "follow",
  };
  fetch("http://localhost:8888/.netlify/functions/profesores", requestOptions)
    .then((response) => response.text())
    .then((result) => cargar(result))
    .catch((error) => console.error(error));
}

function respuesta_actualizar(resultado) {
  document.getElementById("rtaA").innerHTML = resultado;
}

function actualizar() {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  event.preventDefault();

  let raw = JSON.stringify({
    dni: document.getElementById("dniA").value,
    nombre: document.getElementById("nombreA").value,
    apellidos: document.getElementById("apellidosA").value,
    email: document.getElementById("correoA").value,
    profesor: document.getElementById("profesorA").value,
    telefono: document.getElementById("telefonoA").value,
  });

  let requestOptions = {
    method: "PUT",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };
  let elid = document.getElementById("idA").value;
  fetch(
    "http://localhost:8888/.netlify/functions/profesores/" + elid,
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => respuesta_actualizar(result))
    .catch((error) => console.error(error));
}

function cargarLE(resultado) {
  let transformado = JSON.parse(resultado);
  var salida = "";
  var elemento = "";
  elemento = "ID: " + transformado.id;
  elemento = elemento + "<br>Documento de identidad: " + transformado.dni;
  elemento = elemento + "<br>Nombres: " + transformado.nombre;
  elemento = elemento + "<br>Apellidos: " + transformado.apellidos;
  elemento = elemento + "<br>Correo electrónico: " + transformado.email;
  elemento = elemento + "<br>Profesor: " + transformado.profesor;
  elemento = elemento + "<br>Telefono: " + transformado.telefono;
  salida = salida + elemento + "<br><br>";
  document.getElementById("rtaLE").innerHTML = salida;
}

function listar_profesores() {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  event.preventDefault();

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };
  let elid = document.getElementById("idLE").value;
  fetch(
    "http://localhost:8888/.netlify/functions/profesores/" + elid,
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => cargarLE(result))
    .catch((error) => console.error(error));
}

function cargarEE(resultado) {
  let transformado = JSON.parse(resultado);
  document.getElementById("rtaEE").innerHTML = transformado.respuesta;
}

function eliminar_profesores() {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  event.preventDefault();

  const requestOptions = {
    method: "DELETE",
    headers: myHeaders,
    redirect: "follow",
  };
  let elid = document.getElementById("idEE").value;
  fetch(
    "http://localhost:8888/.netlify/functions/profesores/" + elid,
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => cargarEE(result))
    .catch((error) => console.error(error));
}
