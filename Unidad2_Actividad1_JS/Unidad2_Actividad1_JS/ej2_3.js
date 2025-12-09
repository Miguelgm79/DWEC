// Ejercicio 2.3
// Divide dos números introducidos por el usuario y muestra el resultado.
// Sirve para observar casos como NaN (si no es número) o Infinity (división por 0).
let a = prompt("Introduce el dividendo:");
let b = prompt("Introduce el divisor:");

let numA = parseFloat(a);
let numB = parseFloat(b);

let res = numA / numB;
alert("Resultado: " + res);

// Comentario:
// - Si metes textos no numéricos -> numA o numB = NaN, res = NaN.
// - Si divisor = 0 -> res = Infinity o -Infinity.
// - Si no introduces nada -> parseFloat("") = NaN.
