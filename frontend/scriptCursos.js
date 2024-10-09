function guardar() {
  let nota = 0.0;
  let apellidos = "";

  let datoingresado = document.getElementById("profesor_id").value;

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  event.preventDefault();

  let raw = JSON.stringify({
    nombre: document.getElementById("nombre").value,
    descripcion: document.getElementById("descripcion").value,
    profesor_id: document.getElementById("profesor_id").value,
  });

  let requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch("http://localhost:8888/.netlify/functions/cursos", requestOptions)
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
    elemento = elemento + "<br>Nombres: " + transformado[vc].nombre;
    elemento = elemento + "<br>Descripcion: " + transformado[vc].descripcion;
    elemento = elemento + "<br>Profesor ID: " + transformado[vc].profesor_id;
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
  fetch("http://localhost:8888/.netlify/functions/cursos", requestOptions)
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
    nombre: document.getElementById("nombreA").value,
    descripcion: document.getElementById("descripcionA").value,
    profesor_id: document.getElementById("profesor_idA").value,
  });

  let requestOptions = {
    method: "PUT",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };
  let elid = document.getElementById("idA").value;
  fetch(
    "http://localhost:8888/.netlify/functions/cursos/" + elid,
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
  elemento = elemento + "<br>Nombres: " + transformado.nombre;
  elemento = elemento + "<br>Descripcion: " + transformado.descripcion;
  elemento = elemento + "<br>Profesor ID: " + transformado.profesor_id;
  salida = salida + elemento + "<br><br>";
  document.getElementById("rtaLE").innerHTML = salida;
}

function listar_cursos() {
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
    "http://localhost:8888/.netlify/functions/cursos/" + elid,
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

function eliminar_cursos() {
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
    "http://localhost:8888/.netlify/functions/cursos/" + elid,
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => cargarEE(result))
    .catch((error) => console.error(error));
}
