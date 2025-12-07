// Ejercicio 2.13
// Pide precio base y porcentaje de IVA, calcula el total a pagar.
let base = parseFloat(prompt("Precio sin IVA:"));
let iva = parseFloat(prompt("IVA a aplicar (%):"));

let total = base + base * iva / 100;

alert("Total a pagar: " + total.toFixed(2));
