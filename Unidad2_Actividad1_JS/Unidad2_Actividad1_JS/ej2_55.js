// Ejercicio 2.55
// Evalúa una expresión sencilla "a + b" usando parseFloat.
// Respeta decimales.
let expr = prompt("Expresión (ej: '12.7 + 3.2'):");

let partes = expr.split("+");
let a = parseFloat(partes[0]);
let b = parseFloat(partes[1]);

alert("Resultado con parseFloat: " + (a + b));
