// Creamos los arrays vacíos
let operacion = [];              // Operacion nomal
let operacionesSospechosa = [];  // grano > 100kg


class Operacion {

  // Constructor: se ejecuta cuando hacemos new Operacion()
  constructor(id, nombre, producto, tipo, cantidad ) {
    this.id = id;
    this.nombre = nombre;
    this.producto = producto;
    this.tipo = tipo;
    this.cantidad = cantidad; 
  }

}

// Clase OperacionesSospechosas
class OperacionesSospechosa {

  // Constructor
  constructor(id_sos, cantidad) {
    this.id_sos = id_sos;         // id_sos
    this.cantidad = cantidad; // cantidad kg
  }

}

function cogerDatos() {

  // Cogemos código
  let id = document.getElementById("id").value.trim();

  // Cogemos nombre
  let nombre = document.getElementById("nombre").value.trim();

  let producto = document.getElementById("producto").value.trim();

  let tipo = document.getElementById("tipo").value;

  // Cogemos importe y pasamos a decimal
  let cantidad = parseFloat(document.getElementById("cantidad").value);

  // Si hay campos vacíos o no son números
  if (id == "" || nombre == "" || producto == "" || tipo == "" || isNaN(cantidad)) {
    alert("Rellena todos los campos.");
    return null; // devolvemos null y cortamos
  }

  // Si plazas o importe son menores que 1
  if (cantidad < 1) {
    alert("La cantidad deben ser mínimo 1.");
    return null;
  }

  // Si todo está bien devolvemos objeto con los datos
  return { id, nombre, producto, tipo, cantidad };
}

function añadirOperacion() {

  // Cogemos datos validados
  let datos = cogerDatos();
  if (datos == null) return; // si es null, salimos

  // Buscamos si ya existe un vuelo con ese código
  let existe = operacion.find(v => v.id == datos.id);

  // Si existe, avisamos
  if (existe) {
    alert("Esa operacion ya existe.");
    return;
  }

  // Creamos vuelo nuevo
  let nuevo = new Operacion(datos.id, datos.nombre, datos.producto, datos.tipo, datos.cantidad);

  // Lo añadimos al array de vuelos
  operacion.push(nuevo);

  // Si su ingreso estimado es mayor de 20000, lo añadimos a muy rentables
  if (nuevo.cantidad > 100) {
    operacionesSospechosa.push(
      new OperacionesSospechosa(nuevo.id, nuevo.cantidad)
    );
  }


  // Mensaje final
  mostrarMensaje("Operacion añadida y guardada.");
}


function modificarOperacion() {

  let datos = cogerDatos();
  if (datos == null) return;

  let op = operacion.find(v => v.id == datos.id);
 
  if (!op) {
    alert("Esa operacion no existe.");
    return;
  }

  op.nombre = datos.nombre;
  op.producto = datos.producto;
  op.tipo = datos.tipo;
  op.cantidad = datos.cantidad;

  let sospechoso = operacionesSospechosa.find(vr => vr.id_sos == op.id);

  if (op.cantidad > 100 && !sospechoso) {
    operacionesSospechosa.push(new OperacionesSospechosa(op.id, op.cantidad));
  }

  if (op.cantidad <= 100 && sospechoso) {
    operacionesSospechosa = operacionesSospechosa.filter(
      vr => vr.id_sos != op.id
    );
  }

  mostrarMensaje("operacion modificada y guardada.");
}


function mostrarSospechoso() {

  let div = document.getElementById("tablaSospechoso");

  if (operacionesSospechosa.length == 0) {
    div.innerHTML = "<p>No hay operaciones sospechosas.</p>";
    return;
  }

  const tipoExcluido = "aporte"; // <-- el tipo que no quieres mostrar

  let html = "<table>";
  html += "<tr><th>id</th><th>Nombre</th><th>Tipo</th><th>Cantidad</th></tr>";

  for (let s of operacionesSospechosa) {
    let op = operacion.find(o => o.id == s.id_sos);

    if (!op) continue; // si no existe, saltamos

    if (op.tipo === tipoExcluido) continue; // <-- aquí se excluye

    html += "<tr>";
    html += "<td>" + s.id_sos + "</td>";
    html += "<td>" + op.nombre + "</td>";
    html += "<td>" + op.tipo + "</td>";
    html += "<td>" + s.cantidad.toFixed(2) + "</td>";
    html += "</tr>";
  }

  html += "</table>";
  div.innerHTML = html;
}



function mostrarOperacion() {

  // Cogemos el div donde pondremos la tabla
  let div = document.getElementById("tablaOperacion");

  // Si no hay vuelos muy rentables, mostramos texto
  if (operacion.length == 0) {
    div.innerHTML = "<p>No hay operaciones.</p>";
    return;
  }

  let kilos_tomados = 0;
  let kilos_aporte = 0;

  

  // Creamos la tabla en HTML
  let html = "<table>";
  html += "<tr><th>id</th><th>Nombre</th><th>Producto</th><th>Tipo</th><th>Cantidad</th><th>Tomados</th><th>Aportados</th></tr>";

  // Recorremos los vuelos muy rentables
  for (let v of operacion) {

    if (tipo === "tomas") {
    kilos_tomados += v.cantidad;
  }else (tipo === "aporte") 
    kilos_aporte += v.cantidad;
  
    html += "<tr>";
    html += "<td>" + v.id + "</td>";
    html += "<td>" + v.nombre + "</td>";
    html += "<td>" + v.producto + "</td>";
    html += "<td>" + v.tipo + "</td>";
    html += "<td>" + v.cantidad.toFixed(2) + "</td>";
  }
   html += "<td>" + kilos_tomados + "</td>";
    html += "<td>" + kilos_aporte + "</td>";
    html += "</tr>";
   

  // Cerramos tabla
  html += "</table>";

  // Metemos la tabla dentro del div
  div.innerHTML = html;
}

function mostrarMensaje(texto) {
  // Ponemos texto dentro del div salida
  document.getElementById("salida").innerHTML = "<p>" + texto + "</p>";
}

// Cuando pulsamos Añadir, llama a añadirOperacion()
document.getElementById("btnAdd").addEventListener("click", añadirOperacion);

// Cuando pulsamos Modificar, llama a modificarOperacion()
document.getElementById("btnUpdate").addEventListener("click", modificarOperacion);

// Cuando pulsamos Listar, llama a mostrarTablas()
document.getElementById("btnShow").addEventListener("click", mostrarOperacion);
document.getElementById("btnShow1").addEventListener("click", mostrarSospechoso);

