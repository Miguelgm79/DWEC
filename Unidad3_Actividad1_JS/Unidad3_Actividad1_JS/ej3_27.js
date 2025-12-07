// Ejercicio 27
// Lee un valor y lo busca en un array. Indica posición o que no existe.
let arr = ["rojo", "verde", "azul", "amarillo"];

let valor = prompt("Valor a buscar (rojo/verde/azul/amarillo):");
let pos = arr.indexOf(valor);

alert(pos >= 0 ? "Está en la posición " + pos : "No existe en el array.");
