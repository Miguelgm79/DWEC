// Ejercicio 16
// Clase UsuarioSeguridad con: usuario, clave, pregunta, respuesta.
// Permite altas, bajas, modificaciones, consultas, listados.
// Usamos un array como "BD" en memoria.

class UsuarioSeguridad {
  constructor(usuario, clave, pregunta, respuesta) {
    this.usuario = usuario;
    this.clave = clave;
    this.pregunta = pregunta;
    this.respuesta = respuesta;
  }
}

let bd = [];

function alta() {
  let u = prompt("Usuario:");
  let c = prompt("Clave:");
  let p = prompt("Pregunta seguridad:");
  let r = prompt("Respuesta:");
  bd.push(new UsuarioSeguridad(u, c, p, r));
}

function baja() {
  let u = prompt("Usuario a borrar:");
  bd = bd.filter(x => x.usuario !== u);
}

function modificar() {
  let u = prompt("Usuario a modificar:");
  let obj = bd.find(x => x.usuario === u);
  if (!obj) { alert("No existe."); return; }
  obj.clave = prompt("Nueva clave:");
  obj.pregunta = prompt("Nueva pregunta:");
  obj.respuesta = prompt("Nueva respuesta:");
}

function consulta() {
  let u = prompt("Usuario a consultar:");
  let obj = bd.find(x => x.usuario === u);
  alert(obj ? JSON.stringify(obj, null, 2) : "No existe");
}

function listado() {
  alert(bd.map(x => x.usuario).join("\n") || "Sin usuarios");
}

while (true) {
  let op = parseInt(prompt(
    "1 Alta\n2 Baja\n3 Modificar\n4 Consulta\n5 Listado\n6 Salir"
  ), 10);

  if (op === 1) alta();
  else if (op === 2) baja();
  else if (op === 3) modificar();
  else if (op === 4) consulta();
  else if (op === 5) listado();
  else if (op === 6) break;
  else alert("Opción inválida");
}
