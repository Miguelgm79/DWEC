// Ejercicio 2
// Función esMultiploDe3(n) que devuelve true/false.
// El script se repite si el usuario quiere.
function esMultiploDe3(n) {
  return n % 3 === 0;
}

while (true) {
  let n = parseInt(prompt("Introduce un número para comprobar si es múltiplo de 3:"), 10);
  alert(esMultiploDe3(n) ? "Es múltiplo de 3" : "NO es múltiplo de 3");

  let otra = confirm("¿Quieres comprobar otro número?");
  if (!otra) break;
}
