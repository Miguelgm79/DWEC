// Arrays en memoria donde guardamos los vuelos
let vuelos = [];              // Aquí guardamos objetos Vuelo normales
let vuelosMuyRentables = [];  // Aquí guardamos vuelos con ingreso > 20000

// -----------------------------
// CLASES
// -----------------------------

// Clase Vuelo: representa un vuelo normal
class Vuelo {
  // Constructor: se ejecuta cuando hacemos new Vuelo(...)
  constructor(codigo, numPlazas, importeBillete) {
    this.codigo = codigo;                 // guardamos el código del vuelo
    this.numPlazas = numPlazas;           // guardamos el número de plazas
    this.importeBillete = importeBillete; // guardamos precio del billete
  }

  // Método para calcular ingreso estimado del vuelo
  ingresoEstimado() {
    return this.numPlazas * this.importeBillete; // plazas * precio
  }
}

// Clase VueloMuyRentable: solo guarda vuelos muy rentables
class VueloMuyRentable {
  constructor(codigoVuelo, ingresoEstimado) {
    this.codigoVuelo = codigoVuelo;       // código del vuelo muy rentable
    this.ingresoEstimado = ingresoEstimado; // ingreso calculado
  }
}

// -----------------------------
// FUNCIONES
// -----------------------------

// Función para recoger datos del formulario y validarlos
function cogerDatos() {

  // Cogemos el valor del input código y quitamos espacios
  let codigo = document.getElementById("codigo").value.trim();

  // Cogemos plazas y lo convertimos a número entero
  let plazas = parseInt(document.getElementById("plazas").value);

  // Cogemos importe y lo convertimos a número decimal
  let importe = parseFloat(document.getElementById("importe").value);

  // Si algún campo está vacío o no es número -> error
  if (codigo == "" || isNaN(plazas) || isNaN(importe)) {
    alert("Rellena todos los campos."); // mostramos alerta
    return null; // devolvemos null para cortar la ejecución
  }

  // Si plazas o importe son menores que 1 -> error
  if (plazas < 1 || importe < 1) {
    alert("Plazas e importe deben ser mínimo 1.");
    return null;
  }

  // Si todo está bien, devolvemos un objeto con los datos
  return { codigo, plazas, importe };
}

// -----------------------------
// AÑADIR VUELO
// -----------------------------
function anadirVuelo() {

  // Llamamos a cogerDatos() para validar
  let datos = cogerDatos();

  // Si datos es null significa que falló validación
  if (datos == null) return;

  // Buscamos si ya existe un vuelo con ese código
  let existe = vuelos.find(v => v.codigo == datos.codigo);

  // Si existe, avisamos y salimos
  if (existe) {
    alert("Ese vuelo ya existe.");
    return;
  }

  // Creamos el nuevo vuelo con los datos
  let nuevo = new Vuelo(datos.codigo, datos.plazas, datos.importe);

  // Lo añadimos al array de vuelos normales
  vuelos.push(nuevo);

  // Calculamos ingreso estimado para ver si es muy rentable
  if (nuevo.ingresoEstimado() > 20000) {

    // Si es > 20000, lo guardamos en vuelosMuyRentables
    vuelosMuyRentables.push(
      new VueloMuyRentable(nuevo.codigo, nuevo.ingresoEstimado())
    );
  }

  // Mostramos mensaje en pantalla
  mostrarMensaje("Vuelo añadido correctamente.");
}

// -----------------------------
// MODIFICAR VUELO
// -----------------------------
function modificarVuelo() {

  // Cogemos datos y validamos
  let datos = cogerDatos();
  if (datos == null) return;

  // Buscamos el vuelo por código
  let vuelo = vuelos.find(v => v.codigo == datos.codigo);

  // Si no existe, avisamos
  if (!vuelo) {
    alert("Ese vuelo no existe.");
    return;
  }

  // Si existe, actualizamos plazas e importe
  vuelo.numPlazas = datos.plazas;
  vuelo.importeBillete = datos.importe;

  // Recalculamos ingreso
  let ingreso = vuelo.ingresoEstimado();

  // Miramos si ya estaba en la lista de muy rentables
  let rentable = vuelosMuyRentables.find(vr => vr.codigoVuelo == vuelo.codigo);

  // Si ahora es muy rentable y antes no estaba, lo añadimos
  if (ingreso > 20000 && !rentable) {
    vuelosMuyRentables.push(new VueloMuyRentable(vuelo.codigo, ingreso));
  }

  // Si ahora NO es muy rentable pero antes sí estaba, lo quitamos
  if (ingreso <= 20000 && rentable) {
    vuelosMuyRentables = vuelosMuyRentables.filter(
      vr => vr.codigoVuelo != vuelo.codigo
    );
  }

  // Mensaje final
  mostrarMensaje("Vuelo modificado correctamente.");
}

// -----------------------------
// CALCULAR RENTABILIDAD (no guarda nada)
// -----------------------------
function calcularRentabilidad() {

  // Validamos datos
  let datos = cogerDatos();
  if (datos == null) return;

  // Calculamos ingreso estimado con los datos del formulario
  let ingreso = datos.plazas * datos.importe;

  // Variable para guardar el tipo de rentabilidad
  let tipo = "";

  // Según el ingreso, decidimos la categoría
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

  // Cogemos el div donde pondremos la tabla
  let div = document.getElementById("tablaRentables");

  // Si no hay vuelos muy rentables, mostramos texto
  if (vuelosMuyRentables.length == 0) {
    div.innerHTML = "<p>No hay vuelos muy rentables.</p>";
    return;
  }

  // Creamos la tabla en HTML
  let html = "<table>";
  html += "<tr><th>Código</th><th>Ingreso estimado (€)</th></tr>";

  // Recorremos los vuelos muy rentables
  for (let v of vuelosMuyRentables) {
    html += "<tr>";
    html += "<td>" + v.codigoVuelo + "</td>";
    html += "<td>" + v.ingresoEstimado.toFixed(2) + "</td>";
    html += "</tr>";
  }

  // Cerramos tabla
  html += "</table>";

  // Metemos la tabla dentro del div
  div.innerHTML = html;
}

// -----------------------------
// MOSTRAR MENSAJES EN PANTALLA
// -----------------------------
function mostrarMensaje(texto) {
  // Ponemos texto dentro del div salida
  document.getElementById("salida").innerHTML = "<p>" + texto + "</p>";
}

// -----------------------------
// EVENTOS DE LOS BOTONES
// -----------------------------

// Cuando pulsamos Añadir, llama a anadirVuelo()
document.getElementById("btnAdd").addEventListener("click", anadirVuelo);

// Cuando pulsamos Modificar, llama a modificarVuelo()
document.getElementById("btnUpdate").addEventListener("click", modificarVuelo);

// Cuando pulsamos Calcular, llama a calcularRentabilidad()
document.getElementById("btnCalc").addEventListener("click", calcularRentabilidad);

// Cuando pulsamos Mostrar muy rentables, llama a mostrarMuyRentables()
document.getElementById("btnShow").addEventListener("click", mostrarMuyRentables);
