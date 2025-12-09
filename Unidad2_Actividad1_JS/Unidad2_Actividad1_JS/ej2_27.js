// Ejercicio 2.27
// Comprueba si una fecha es correcta teniendo en cuenta años bisiestos.
let d = parseInt(prompt("Día:"), 10);
let m = parseInt(prompt("Mes:"), 10);
let a = parseInt(prompt("Año:"), 10);

// Devuelve true si es bisiesto
function esBisiesto(anio) {
  return (anio % 4 === 0 && anio % 100 !== 0) || (anio % 400 === 0);
}

// Devuelve días del mes, según bisiesto
function diasMes(mes, anio) {
  if (mes === 2) return esBisiesto(anio) ? 29 : 28;
  if ([1, 3, 5, 7, 8, 10, 12].includes(mes)) return 31;
  if ([4, 6, 9, 11].includes(mes)) return 30;
  return 0;
}

let ok = m >= 1 && m <= 12 && d >= 1 && d <= diasMes(m, a);

alert(ok ? "Fecha correcta" : "Fecha incorrecta");
