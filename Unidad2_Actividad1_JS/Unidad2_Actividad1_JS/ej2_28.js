// Ejercicio 2.28
// Lee v1, v2, v3 y evalúa varias condiciones lógicas pedidas en el enunciado.
let v1 = parseInt(prompt("v1:"), 10);
let v2 = parseInt(prompt("v2:"), 10);
let v3 = parseInt(prompt("v3:"), 10);

alert("Todas cero: " + (v1 === 0 && v2 === 0 && v3 === 0));
alert("Todas positivas: " + (v1 > 0 && v2 > 0 && v3 > 0));
alert("Mismo signo: " + ((v1 >= 0 && v2 >= 0 && v3 >= 0) || (v1 <= 0 && v2 <= 0 && v3 <= 0)));
alert("Todos distintos: " + (v1 !== v2 && v1 !== v3 && v2 !== v3));
alert("Dos coinciden: " + (v1 === v2 || v1 === v3 || v2 === v3));
alert("Como máximo dos coinciden: " + !(v1 === v2 && v2 === v3));
alert("v2 entre v1 y v3: " + (v2 >= Math.min(v1, v3) && v2 <= Math.max(v1, v3)));
