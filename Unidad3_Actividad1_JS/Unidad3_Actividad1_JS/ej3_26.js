// Ejercicio 26
// Crea dos arrays de equipos (tamaño elegido por usuario) y los une con concat().
function pedirEquipos(nombreArray) {
  let n = parseInt(prompt("¿Cuántos equipos tendrá el " + nombreArray + "?"), 10);
  let arr = [];
  for (let i = 0; i < n; i++) {
    arr.push(prompt("Equipo " + (i + 1) + " de " + nombreArray + ":"));
  }
  return arr;
}

let liga1 = pedirEquipos("Array 1");
let liga2 = pedirEquipos("Array 2");

let unidas = liga1.concat(liga2);

alert("Liga 1: " + liga1.join(", ") + "\nLiga 2: " + liga2.join(", ") + "\nUnidas: " + unidas.join(", "));
