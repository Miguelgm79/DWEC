// Ejercicio 2.20
// Menú con 3 opciones: salir, sumatorio, factorial.
// Repite hasta que el usuario elija salir.

function sumatorio(n) {
  let s = 0;
  for (let i = 1; i <= n; i++) s += i;
  return s;
}

function factorial(n) {
  let f = 1;
  for (let i = 2; i <= n; i++) f *= i;
  return f;
}

while (true) {
  let op = parseInt(prompt("Menú:\n1) Salir\n2) Sumatorio\n3) Factorial"), 10);

  if (op === 1) break;

  if (op === 2) {
    let n = parseInt(prompt("Número:"), 10);
    alert("Sumatorio = " + sumatorio(n));
  } else if (op === 3) {
    let n = parseInt(prompt("Número:"), 10);
    alert("Factorial = " + factorial(n));
  } else {
    alert("Opción inválida");
  }
}
