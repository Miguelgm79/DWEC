// Ejercicio 3
// Función mayorDeTres(a,b,c) que devuelve el mayor de los tres valores.
function mayorDeTres(a, b, c) {
  return Math.max(a, b, c);
}

let v1 = parseFloat(prompt("Valor 1:"));
let v2 = parseFloat(prompt("Valor 2:"));
let v3 = parseFloat(prompt("Valor 3:"));

alert("El mayor es: " + mayorDeTres(v1, v2, v3));
