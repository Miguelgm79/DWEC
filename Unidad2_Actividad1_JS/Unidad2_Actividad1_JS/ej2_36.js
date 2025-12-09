// Ejercicio 2.36
// Divide dos enteros por restas sucesivas (sin usar '/').
// Muestra cociente y resto.
let dividendo = parseInt(prompt("Dividendo:"), 10);
let divisor = parseInt(prompt("Divisor (>0):"), 10);

let cociente = 0;
let resto = dividendo;

while (resto >= divisor) {
  resto -= divisor;
  cociente++;
}

alert("Cociente: " + cociente + "\nResto: " + resto);
