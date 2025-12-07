// Ejercicio 2.18
// Muestra dos columnas: 1..100 y 100..1 usando un solo bucle.
document.write("<pre>");
for (let i = 1; i <= 100; i++) {
  document.write(i + "\t" + (101 - i) + "\n");
}
document.write("</pre>");
