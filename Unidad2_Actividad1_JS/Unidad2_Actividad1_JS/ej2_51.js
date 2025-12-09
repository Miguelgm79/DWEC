// Ejercicio 2.51
// Convierte un número en base 8 a decimal y luego a binario.
let oct = prompt("Número en base 8:");

let decimal = parseInt(oct, 8);
alert("Decimal: " + decimal + "\nBinario: " + decimal.toString(2));
