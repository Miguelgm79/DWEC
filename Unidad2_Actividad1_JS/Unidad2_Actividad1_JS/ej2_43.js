// Ejercicio 2.43
// Muestra los 10 primeros múltiplos de n y su suma.
let n = parseInt(prompt("Número:"), 10);
let suma = 0;
let salida = "";

for (let i = 1; i <= 10; i++) {
  let m = n * i;
  salida += m + " ";
  suma += m;
}

alert("Múltiplos: " + salida + "\nSuma = " + suma);
