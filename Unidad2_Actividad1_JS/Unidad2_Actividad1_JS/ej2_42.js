// Ejercicio 2.42
// Calcula el factorial de n usando for.
let n = parseInt(prompt("n:"), 10);
let f = 1;

for (let i = 2; i <= n; i++) f *= i;

alert("Factorial = " + f);
