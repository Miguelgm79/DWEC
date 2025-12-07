// Ejercicio 30
// Sobre el array producto, permite añadir nuevos números al inicio con unshift().
let arr = [10, 40, 90, 160]; // por ejemplo

while (true) {
  let x = prompt("Número a añadir al inicio (vacío para terminar):");
  if (x === "" || x === null) break;
  arr.unshift(parseFloat(x));
}

alert("Array final: " + arr.join(", "));
