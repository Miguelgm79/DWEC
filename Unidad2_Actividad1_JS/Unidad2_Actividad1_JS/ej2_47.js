// Ejercicio 2.47
// Comprueba si un número es primo.
let n = parseInt(prompt("n:"), 10);
let primo = n > 1;

for (let i = 2; i <= Math.sqrt(n) && primo; i++) {
  if (n % i === 0) primo = false;
}

alert(primo ? "Es primo" : "No es primo");
