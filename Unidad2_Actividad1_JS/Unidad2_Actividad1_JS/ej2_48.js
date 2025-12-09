// Ejercicio 2.48
// Muestra potencias de 2 desde exponente 0 hasta 10.
let salida = "";

for (let i = 0; i <= 10; i++) {
  salida += "2^" + i + " = " + Math.pow(2, i) + "\n";
}

alert(salida);
