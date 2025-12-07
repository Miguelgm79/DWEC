// Ejercicio 2.31
// Calcula volumen y área de una esfera dado su radio.
let r = parseFloat(prompt("Radio:"));

let volumen = (4 / 3) * Math.PI * Math.pow(r, 3);
let area = 4 * Math.PI * r * r;

alert("Volumen: " + volumen + "\nÁrea: " + area);
