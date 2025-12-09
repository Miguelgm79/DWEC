// Ejercicio 2.4
// Pide nombre y edad y calcula días vividos aproximados (años de 365 días).
let nombre = prompt("¿Cómo te llamas?");
let edad = parseInt(prompt("¿Cuántos años tienes?"), 10);

let dias = edad * 365;
alert(nombre + ", has vivido aprox. " + dias + " días.");
