// Ejercicio 31
// Función recursiva que detecta si una frase es palíndroma.
// Ignora espacios y mayúsculas/minúsculas.
function esPalindromo(frase) {
  // Normalizamos: sin espacios ni signos, en minúsculas
  frase = frase.toLowerCase().replace(/[^a-z0-9ñáéíóú]/gi, "");

  function rec(i, j) {
    if (i >= j) return true;
    if (frase[i] !== frase[j]) return false;
    return rec(i + 1, j - 1);
  }

  return rec(0, frase.length - 1);
}

let f = prompt("Introduce una frase:");
alert(esPalindromo(f) ? "Es palíndroma" : "No es palíndroma");
