// Ejercicio 5
// Genera dos arrays:
// - naturales: los 25 primeros naturales (1..25)
// - factoriales: factorial de cada uno
// Muestra ambos en pantalla (cuerpo de la página).
function factorial(n) {
  let f = 1;
  for (let i = 2; i <= n; i++) f *= i;
  return f;
}

let naturales = [];
let factoriales = [];

for (let i = 1; i <= 25; i++) {
  naturales.push(i);
  factoriales.push(factorial(i));
}

document.write("<h2>25 primeros naturales y su factorial</h2>");
document.write("<pre>");
for (let i = 0; i < 25; i++) {
  document.write(naturales[i] + " -> " + factoriales[i] + "\n");
}
document.write("</pre>");
