// Ejercicio 2.23
// Pide dos números y cuenta cuántos pares hay entre ellos (incluidos).
let a = parseInt(prompt("Número 1:"), 10);
let b = parseInt(prompt("Número 2:"), 10);

let min = Math.min(a, b);
let max = Math.max(a, b);
let pares = 0;

for (let i = min; i <= max; i++) {
  if (i % 2 === 0) pares++;
}

alert("Cantidad de pares: " + pares);
