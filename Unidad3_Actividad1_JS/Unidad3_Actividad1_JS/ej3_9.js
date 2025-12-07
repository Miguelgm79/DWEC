// Ejercicio 9
// Función para pedir un número con depuración de entrada.
function pedirNumero(msg) {
  let n;
  do {
    let x = prompt(msg);
    n = parseFloat(x);
    if (Number.isNaN(n)) alert("Entrada inválida. Debes introducir un número.");
  } while (Number.isNaN(n));
  return n;
}

let numero = pedirNumero("Introduce un número:");
alert("Número válido: " + numero);
