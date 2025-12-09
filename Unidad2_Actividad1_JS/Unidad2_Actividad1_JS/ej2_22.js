// Ejercicio 2.22
// Lee una serie de números hasta que el usuario deje el prompt vacío.
// Luego calcula la media.
let suma = 0, count = 0;

while (true) {
  let x = prompt("Número (vacío para terminar):");
  if (x === "" || x === null) break;
  suma += parseFloat(x);
  count++;
}

alert("Media = " + (suma / count));
