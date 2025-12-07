// -----------------------------
// ARRAYS EN MEMORIA
// -----------------------------

// Creamos los arrays vacíos
let vuelos = [];              // vuelos normales
let vuelosMuyRentables = [];  // vuelos con ingreso > 20000


// -----------------------------
// CLASES
// -----------------------------

// Clase Vuelo
class Vuelo {

  // Constructor: se ejecuta cuando hacemos new Vuelo()
  constructor(codigo, numPlazas, importeBillete) {
    this.codigo = codigo;                 // guardamos código
    this.numPlazas = numPlazas;           // guardamos plazas
    this.importeBillete = importeBillete; // guardamos importe
  }

  // Método que calcula ingreso estimado del vuelo
  ingresoEstimado() {
    return this.numPlazas * this.importeBillete;
  }
}

// Clase VueloMuyRentable
class VueloMuyRentable {

  // Constructor
  constructor(codigoVuelo, ingresoEstimado) {
    this.codigoVuelo = codigoVuelo;         // código del vuelo
    this.ingresoEstimado = ingresoEstimado; // ingreso calculado
  }
}


// -----------------------------
// LOCALSTORAGE (CARGAR Y GUARDAR)
// -----------------------------

// Función que carga datos guardados en localStorage al abrir la página
function cargarDatos() {

  // Leemos los vuelos guardados (si no hay nada, ponemos [])
  let vuelosGuardados = JSON.parse(localStorage.getItem("vuelos")) || [];

  // Leemos los muy rentables guardados
  let rentablesGuardados = JSON.parse(localStorage.getItem("vuelosMuyRentables")) || [];

  // IMPORTANTE:
  // Cuando leemos JSON, se pierden los métodos de la clase
  // así que reconstruimos cada vuelo como objeto Vuelo real
  vuelos = vuelosGuardados.map(
    v => new Vuelo(v.codigo, v.numPlazas, v.importeBillete)
  );

  // Estos no necesitan métodos, así que los dejamos tal cual
  vuelosMuyRentables = rentablesGuardados;

  // Mensaje para saber que se cargó bien
  mostrarMensaje("Datos cargados desde localStorage.");
}

// Función que guarda arrays en localStorage
function guardarDatos() {

  // Guardamos vuelos normales
  localStorage.setItem("vuelos", JSON.stringify(vuelos));

  // Guardamos vuelos muy rentables
  localStorage.setItem("vuelosMuyRentables", JSON.stringify(vuelosMuyRentables));
}


// -----------------------------
// FUNCION PARA COGER DATOS DEL FORMULARIO
// -----------------------------
function cogerDatos() {

  // Cogemos código
  let codigo = document.getElementById("codigo").value.trim();

  // Cogemos plazas y pasamos a entero
  let plazas = parseInt(document.getElementById("plazas").value);

  // Cogemos importe y pasamos a decimal
  let importe = parseFloat(document.getElementById("importe").value);

  // Si hay campos vacíos o no son números
  if (codigo == "" || isNaN(plazas) || isNaN(importe)) {
    alert("Rellena todos los campos.");
    return null; // devolvemos null y cortamos
  }

  // Si plazas o importe son menores que 1
  if (plazas < 1 || importe < 1) {
    alert("Plazas e importe deben ser mínimo 1.");
    return null;
  }

  // Si todo está bien devolvemos objeto con los datos
  return { codigo, plazas, importe };
}


// -----------------------------
// AÑADIR VUELO
// -----------------------------
function anadirVuelo() {

  // Cogemos datos validados
  let datos = cogerDatos();
  if (datos == null) return; // si es null, salimos

  // Buscamos si ya existe un vuelo con ese código
  let existe = vuelos.find(v => v.codigo == datos.codigo);

  // Si existe, avisamos
  if (existe) {
    alert("Ese vuelo ya existe.");
    return;
  }

  // Creamos vuelo nuevo
  let nuevo = new Vuelo(datos.codigo, datos.plazas, datos.importe);

  // Lo añadimos al array de vuelos
  vuelos.push(nuevo);

  // Si su ingreso estimado es mayor de 20000, lo añadimos a muy rentables
  if (nuevo.ingresoEstimado() > 20000) {
    vuelosMuyRentables.push(
      new VueloMuyRentable(nuevo.codigo, nuevo.ingresoEstimado())
    );
  }

  // Guardamos cambios en localStorage
  guardarDatos();

  // Mensaje final
  mostrarMensaje("Vuelo añadido y guardado.");
}


// -----------------------------
// MODIFICAR VUELO
// -----------------------------
function modificarVuelo() {

  // Cogemos datos validados
  let datos = cogerDatos();
  if (datos == null) return;

  // Buscamos vuelo por código
  let vuelo = vuelos.find(v => v.codigo == datos.codigo);

  // Si no existe, avisamos
  if (!vuelo) {
    alert("Ese vuelo no existe.");
    return;
  }

  // Si existe, actualizamos los datos
  vuelo.numPlazas = datos.plazas;
  vuelo.importeBillete = datos.importe;

  // Recalculamos ingreso estimado
  let ingreso = vuelo.ingresoEstimado();

  // Miramos si estaba en muy rentables
  let rentable = vuelosMuyRentables.find(vr => vr.codigoVuelo == vuelo.codigo);

  // Si ahora es muy rentable y antes no estaba, lo añadimos
  if (ingreso > 20000 && !rentable) {
    vuelosMuyRentables.push(new VueloMuyRentable(vuelo.codigo, ingreso));
  }

  // Si ahora ya no es muy rentable pero antes sí estaba, lo quitamos
  if (ingreso <= 20000 && rentable) {
    vuelosMuyRentables = vuelosMuyRentables.filter(
      vr => vr.codigoVuelo != vuelo.codigo
    );
  }

  // Guardamos cambios en localStorage
  guardarDatos();

  // Mensaje final
  mostrarMensaje("Vuelo modificado y guardado.");
}


// -----------------------------
// CALCULAR RENTABILIDAD (NO GUARDA NADA)
// -----------------------------
function calcularRentabilidad() {

  // Validamos datos
  let datos = cogerDatos();
  if (datos == null) return;

  // Calculamos ingreso estimado
  let ingreso = datos.plazas * datos.importe;

  // Guardamos el tipo de rentabilidad
  let tipo = "";

  // Comprobamos tramo
  if (ingreso < 10000) tipo = "Poco rentable";
  else if (ingreso <= 20000) tipo = "Rentable";
  else tipo = "Muy rentable";

  // Mostramos resultado
  mostrarMensaje(
    "Ingreso estimado: " + ingreso.toFixed(2) + " € → " + tipo
  );
}


// -----------------------------
// MOSTRAR TABLA DE MUY RENTABLES
// -----------------------------
function mostrarMuyRentables() {

  // Cogemos el div donde pintaremos la tabla
  let div = document.getElementById("tablaRentables");

  // Si no hay ninguno
  if (vuelosMuyRentables.length == 0) {
    div.innerHTML = "<p>No hay vuelos muy rentables.</p>";
    return;
  }

  // Creamos tabla
  let html = "<table>";
  html += "<tr><th>Código</th><th>Ingreso estimado (€)</th></tr>";

  // Recorremos array muy rentables
  for (let v of vuelosMuyRentables) {
    html += "<tr>";
    html += "<td>" + v.codigoVuelo + "</td>";
    html += "<td>" + v.ingresoEstimado.toFixed(2) + "</td>";
    html += "</tr>";
  }

  // Cerramos tabla
  html += "</table>";

  // Metemos tabla en div
  div.innerHTML = html;
}


// -----------------------------
// MOSTRAR MENSAJE EN PANTALLA
// -----------------------------
function mostrarMensaje(texto) {
  document.getElementById("salida").innerHTML = "<p>" + texto + "</p>";
}


// -----------------------------
// EVENTOS DE BOTONES
// -----------------------------

// Botón añadir
document.getElementById("btnAdd").addEventListener("click", anadirVuelo);

// Botón modificar
document.getElementById("btnUpdate").addEventListener("click", modificarVuelo);

// Botón calcular
document.getElementById("btnCalc").addEventListener("click", calcularRentabilidad);

// Botón mostrar muy rentables
document.getElementById("btnShow").addEventListener("click", mostrarMuyRentables);


// -----------------------------
// AL ABRIR LA PÁGINA
// -----------------------------

// Cuando se carga la web, cargamos datos guardados
cargarDatos();
