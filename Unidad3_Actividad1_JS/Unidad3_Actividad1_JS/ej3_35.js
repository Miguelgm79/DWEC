// Ejercicio 35
// Array de arrays con alumnos: ["Nombre", nota1, nota2, nota3]
// a) Añadir/eliminar alumnos y notas
// b) Añadir elemento Nota Media
// c) Ordenar por nombre o media

let alumno1 = ["Pepe", 5, 6, 6.5];
let alumno2 = ["Luis", 4, 7, 7];
let alumno3 = ["Pedro", 8, 4.5, 3];
let Alumnos = [alumno1, alumno2, alumno3];

function notaMedia(al) {
  return (al[1] + al[2] + al[3]) / 3;
}

function recalcularMedias() {
  for (let al of Alumnos) {
    al[4] = notaMedia(al); // b) elemento 4 = media
  }
}

function añadirAlumno() {
  let nombre = prompt("Nombre:");
  let n1 = parseFloat(prompt("Nota1:"));
  let n2 = parseFloat(prompt("Nota2:"));
  let n3 = parseFloat(prompt("Nota3:"));
  Alumnos.push([nombre, n1, n2, n3]);
  recalcularMedias();
}

function eliminarAlumno() {
  let nombre = prompt("Nombre a eliminar:");
  Alumnos = Alumnos.filter(a => a[0] !== nombre);
}

function listar() {
  recalcularMedias();
  let salida = Alumnos.map(a =>
    a[0] + " -> " + a[1] + ", " + a[2] + ", " + a[3] + " | media=" + a[4].toFixed(2)
  ).join("\n");
  alert(salida || "Sin alumnos");
}

function ordenarNombre() {
  Alumnos.sort((a, b) => a[0].localeCompare(b[0]));
}

function ordenarMedia() {
  recalcularMedias();
  Alumnos.sort((a, b) => b[4] - a[4]);
}

// Inicial
recalcularMedias();

while (true) {
  let op = parseInt(prompt(
    "1 Añadir alumno\n2 Eliminar alumno\n3 Listar\n4 Ordenar por nombre\n5 Ordenar por media\n6 Salir"
  ), 10);

  if (op === 1) añadirAlumno();
  else if (op === 2) eliminarAlumno();
  else if (op === 3) listar();
  else if (op === 4) { ordenarNombre(); listar(); }
  else if (op === 5) { ordenarMedia(); listar(); }
  else if (op === 6) break;
}
