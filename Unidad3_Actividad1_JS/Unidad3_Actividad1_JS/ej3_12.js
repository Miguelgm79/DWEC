// Ejercicio 12
// Usa Date para mostrar:
// - Fecha actual
// - Fecha fin del mundo maya (21/11/2012)
// - Días y segundos transcurridos desde entonces

let hoy = new Date();

// Mes 10 = noviembre (0-indexado)
let finMaya = new Date(2012, 10, 21);

let diffMs = hoy - finMaya; // diferencia en milisegundos
let diffDias = diffMs / (1000 * 60 * 60 * 24);
let diffSeg = diffMs / 1000;

document.write("<h2>Ejercicio 12</h2>");
document.write("Fecha actual: " + hoy.toLocaleString() + "<br>");
document.write("Fin del mundo maya: " + finMaya.toLocaleDateString() + "<br>");
document.write("Han pasado días: " + diffDias.toFixed(2) + "<br>");
document.write("Han pasado segundos: " + Math.floor(diffSeg) + "<br>");
