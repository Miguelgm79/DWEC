// Ejercicio 10
// Función para pedir un operador (+, -, *, /) y depurarlo.
function pedirOperador(msg) {
  let op;
  do {
    op = prompt(msg);
    if (op === null) op = "";
    op = op.trim();
    if (!/^[+\-*/]$/.test(op)) alert("Operador inválido. Usa +, -, * o /");
  } while (!/^[+\-*/]$/.test(op));
  return op;
}

let operador = pedirOperador("Introduce operador (+, -, *, /):");
alert("Operador válido: " + operador);
