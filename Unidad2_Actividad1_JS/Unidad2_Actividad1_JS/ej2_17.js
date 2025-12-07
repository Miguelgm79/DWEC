// Ejercicio 2.17
// Pide dos enteros hasta que ambos sean < 50.
// Luego imprime dos columnas: uno sube de 5 en 5 desde el menor y el otro baja de 2 en 2 desde el mayor.
let a, b;

do {
  a = parseInt(prompt("Número 1 (<50):"), 10);
  b = parseInt(prompt("Número 2 (<50):"), 10);
} while (a >= 50 || b >= 50);

let min = Math.min(a, b);
let max = Math.max(a, b);

while (min <= max) {
  document.write(min + "  " + max + "<br>");
  min += 5;
  max -= 2;
}
