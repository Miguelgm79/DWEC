// Ejercicio 2.41
// Muestra múltiplos de 11 menores que 300 y calcula su suma.
let suma = 0;
let salida = "";

for (let i = 11; i < 300; i += 11) {
  salida += i + " ";
  suma += i;
}

alert("Múltiplos:\n" + salida + "\nSuma = " + suma);
