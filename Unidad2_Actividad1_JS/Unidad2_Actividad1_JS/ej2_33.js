// Ejercicio 2.33
// Pide un número. Si es negativo es inválido.
// Si es >= 0, calcula tres expresiones y las muestra.
let numero = parseFloat(prompt("Número:"));

if (numero < 0) {
  alert("Número inválido");
} else {
  let solucion1 = numero * 2 + 1 / 3 - 7;
  let solucion2 = numero + 2;
  let solucion3 = numero * 2.5;

  alert(
    "1) " + solucion1 + "\n" +
    "2) " + solucion2 + "\n" +
    "3) " + solucion3 + "\n" +
    "Fin de operación con el número: " + numero
  );
}
