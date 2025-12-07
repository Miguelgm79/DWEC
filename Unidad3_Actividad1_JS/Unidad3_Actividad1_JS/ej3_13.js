// Ejercicio 13
// Clase Alumno con nombre y 3 notas. Se guardan en un array.
// a) Permitir añadir/eliminar alumnos y notas.
// b) Añadir nota media por prototype.
// c) Mostrar array ordenado por nombre o media.
// (Versión de consola/alert con menú)

class Alumno {
  constructor(nombre, n1, n2, n3) {
    this.nombre = nombre;
    this.notas = [n1, n2, n3];
  }
}

// b) Añadimos propiedad calculada notaMedia con prototype (getter)
Object.defineProperty(Alumno.prototype, "notaMedia", {
  get: function () {
    return this.notas.reduce((a, b) => a + b, 0) / this.notas.length;
  }
});

let alumnos = [];

function añadirAlumno() {
  let nombre = prompt("Nombre alumno:");
  let n1 = parseFloat(prompt("Nota 1:"));
  let n2 = parseFloat(prompt("Nota 2:"));
  let n3 = parseFloat(prompt("Nota 3:"));
  alumnos.push(new Alumno(nombre, n1, n2, n3));
}

function eliminarAlumno() {
  let nombre = prompt("Nombre del alumno a eliminar:");
  alumnos = alumnos.filter(a => a.nombre !== nombre);
}

function modificarNotas() {
  let nombre = prompt("Nombre del alumno a modificar:");
  let a = alumnos.find(x => x.nombre === nombre);
  if (!a) { alert("No existe."); return; }
  for (let i = 0; i < 3; i++) {
    a.notas[i] = parseFloat(prompt("Nueva nota " + (i + 1) + ":"));
  }
}

function listar() {
  let salida = alumnos.map(a =>
    a.nombre + " -> " + a.notas.join(", ") + " | media=" + a.notaMedia.toFixed(2)
  ).join("\n");
  alert(salida || "Sin alumnos");
}

function ordenarPorNombre() {
  alumnos.sort((a, b) => a.nombre.localeCompare(b.nombre));
}

function ordenarPorMedia() {
  alumnos.sort((a, b) => b.notaMedia - a.notaMedia);
}

// Menú principal
while (true) {
  let op = parseInt(prompt(
    "1) Añadir alumno\n2) Eliminar alumno\n3) Modificar notas\n4) Listar\n5) Ordenar por nombre\n6) Ordenar por media\n7) Salir"
  ), 10);

  if (op === 1) añadirAlumno();
  else if (op === 2) eliminarAlumno();
  else if (op === 3) modificarNotas();
  else if (op === 4) listar();
  else if (op === 5) { ordenarPorNombre(); listar(); }
  else if (op === 6) { ordenarPorMedia(); listar(); }
  else if (op === 7) break;
  else alert("Opción inválida");
}
