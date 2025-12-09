// Ejercicio 2.7
// Calcula longitud de una circunferencia y área de un círculo dado su radio.
let r = parseFloat(prompt("Radio:"));

let longitud = 2 * Math.PI * r;
let area = Math.PI * r * r;

alert("Longitud: " + longitud + "\nÁrea: " + area);
