// Ejercicio 2.54
// Evalúa una expresión sencilla "a + b" usando parseInt.
// Ojo: parseInt corta decimales y caracteres no numéricos.
let expr = prompt("Expresión (ej: '12.7 + 3'):");

// Separa por '+'
let partes = expr.split("+");
let a = parseInt(partes[0], 10);
let b = parseInt(partes[1], 10);

alert("Resultado con parseInt: " + (a + b));
