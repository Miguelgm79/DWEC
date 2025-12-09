// Ejercicio 7
// Pide un carácter y comprueba con una función si es alfabético.
// Depura la entrada para que sea SOLO una letra.
function esLetra(c) {
  return /^[a-zA-ZñÑáéíóúÁÉÍÓÚ]$/.test(c);
}

let c;
do {
  c = prompt("Introduce UNA letra:");
  if (c === null) c = "";
  c = c.trim();
  if (!esLetra(c)) alert("Entrada inválida. Debes introducir una letra.");
} while (!esLetra(c));

alert("Correcto, '" + c + "' es un carácter alfabético.");
