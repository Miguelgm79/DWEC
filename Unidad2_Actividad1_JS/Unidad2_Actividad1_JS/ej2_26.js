// Ejercicio 2.26
// Pide tres números y los muestra en orden decreciente.
let nums = [
  parseFloat(prompt("Número 1:")),
  parseFloat(prompt("Número 2:")),
  parseFloat(prompt("Número 3:"))
];

nums.sort((x, y) => y - x);

alert("Orden decreciente: " + nums.join(", "));
