// Ejercicio 2.19
// Convierte grados Fahrenheit a Celsius.
let f = parseFloat(prompt("Grados Fahrenheit:"));
let c = (5 / 9) * (f - 32);

alert(f + " ºF = " + c.toFixed(2) + " ºC");
