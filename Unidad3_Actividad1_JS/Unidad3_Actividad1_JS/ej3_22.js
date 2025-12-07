// Ejercicio 22
// Crea array con 10 naturales (1..10) y le da la vuelta con reverse().
let arr = [];
for (let i = 1; i <= 10; i++) arr.push(i);

let invertido = arr.slice().reverse();
alert("Original: " + arr.join(", ") + "\nInvertido: " + invertido.join(", "));
