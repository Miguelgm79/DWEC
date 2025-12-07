// Ejercicio 2.45
// Lee números hasta introducir 0. Muestra cada número y cuenta cuántos no fueron 0.
let count = 0;

while (true) {
  let x = parseFloat(prompt("Número (0 para terminar):"));
  if (x === 0) break;
  alert(x);
  count++;
}

alert("Cantidad de valores distintos de 0: " + count);
