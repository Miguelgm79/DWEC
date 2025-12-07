// Ejercicio 8
// Pide dos caracteres (con depuración) y muestra cuál es mayor (orden Unicode).
function pedirLetra(msg) {
  let c;
  do {
    c = prompt(msg);
    if (c === null) c = "";
    c = c.trim();
    if (!/^[a-zA-ZñÑáéíóúÁÉÍÓÚ]$/.test(c)) alert("Debes introducir UNA letra.");
  } while (!/^[a-zA-ZñÑáéíóúÁÉÍÓÚ]$/.test(c));
  return c;
}

function mayorCaracter(a, b) {
  return a > b ? a : b;
}

let c1 = pedirLetra("Introduce el primer carácter:");
let c2 = pedirLetra("Introduce el segundo carácter:");

alert("El mayor es: " + mayorCaracter(c1, c2));
