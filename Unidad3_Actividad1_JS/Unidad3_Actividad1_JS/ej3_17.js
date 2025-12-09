// Ejercicio 17
// Clase para almacenar empresas y alumnos, con altas, bajas y búsquedas.
// Estructura simple:
// - Empresa { nombre, cif, ciclo }
// - Alumno { nombre, dni, ciclo, anioFin }
// Guardamos alumnos en un array.

class Empresa {
  constructor(nombre, cif, ciclo) {
    this.nombre = nombre;
    this.cif = cif;
    this.ciclo = ciclo; // DAW, DAM, ASIR...
  }
}

class Alumno {
  constructor(nombre, dni, ciclo, anioFin) {
    this.nombre = nombre;
    this.dni = dni;
    this.ciclo = ciclo;
    this.anioFin = anioFin;
  }
}

let alumnos = [];

function altaAlumno() {
  let nombre = prompt("Nombre alumno:");
  let dni = prompt("DNI (xx.xxx.xxx-x):");
  let ciclo = prompt("Ciclo (DAW/DAM/ASIR...):");
  let anio = parseInt(prompt("Año fin (ej 2011):"), 10);
  alumnos.push(new Alumno(nombre, dni, ciclo, anio));
}

function bajaAlumno() {
  let dni = prompt("DNI a eliminar:");
  alumnos = alumnos.filter(a => a.dni !== dni);
}

function buscarPorCiclo() {
  let ciclo = prompt("Ciclo a buscar:");
  let res = alumnos.filter(a => a.ciclo === ciclo);
  alert(res.map(a => a.nombre + " (" + a.dni + ")").join("\n") || "Ninguno");
}

function buscarPorAnio() {
  let anio = parseInt(prompt("Año fin a buscar:"), 10);
  let res = alumnos.filter(a => a.anioFin === anio);
  alert(res.map(a => a.nombre + " (" + a.dni + ")").join("\n") || "Ninguno");
}

function listar() {
  alert(alumnos.map(a => `${a.nombre} ${a.dni} ${a.ciclo} ${a.anioFin}`).join("\n") || "Sin alumnos");
}

while (true) {
  let op = parseInt(prompt(
    "1 Alta alumno\n2 Baja alumno\n3 Buscar por ciclo\n4 Buscar por año\n5 Listar\n6 Salir"
  ), 10);

  if (op === 1) altaAlumno();
  else if (op === 2) bajaAlumno();
  else if (op === 3) buscarPorCiclo();
  else if (op === 4) buscarPorAnio();
  else if (op === 5) listar();
  else if (op === 6) break;
}
