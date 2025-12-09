// Ejercicio 11
// Introduce dos números y un operador (depurado) y realiza el cálculo con una función.
function pedirNumero(msg) {
  let n;
  do {
    n = parseFloat(prompt(msg));
    if (Number.isNaN(n)) alert("Debes introducir un número.");
  } while (Number.isNaN(n));
  return n;
}

function pedirOperador(msg) {
  let op;
  do {
    op = prompt(msg);
    if (op === null) op = "";
    op = op.trim();
    if (!/^[+\-*/]$/.test(op)) alert("Operador inválido.");
  } while (!/^[+\-*/]$/.test(op));
  return op;
}

function calcular(a, b, op) {
  switch (op) {
    case "+": return a + b;
    case "-": return a - b;
    case "*": return a * b;
    case "/": return b !== 0 ? a / b : NaN;
  }
}

let a = pedirNumero("Número 1:");
let b = pedirNumero("Número 2:");
let op = pedirOperador("Operador (+-*/):");

let res = calcular(a, b, op);
alert(Number.isNaN(res) ? "No se puede dividir por 0." : "Resultado: " + res);
