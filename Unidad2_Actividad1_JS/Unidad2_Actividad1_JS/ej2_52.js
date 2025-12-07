// Ejercicio 2.52
// Función que convierte un número decimal a la base indicada.
function convertirBase(n, base) {
  return n.toString(base);
}

let n = parseInt(prompt("Número decimal:"), 10);
let base = parseInt(prompt("Base destino (2-36):"), 10);

alert("Resultado: " + convertirBase(n, base));
