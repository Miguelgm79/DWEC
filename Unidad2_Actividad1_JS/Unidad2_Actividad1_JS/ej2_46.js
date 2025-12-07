// Ejercicio 2.46
// Muestra la serie 3,6,9,...,99 y calcula su suma.
let suma = 0;
let salida = "";

for (let i = 3; i <= 99; i += 3) {
  salida += i + " ";
  suma += i;
}

alert("Serie: " + salida + "\nSuma = " + suma);
