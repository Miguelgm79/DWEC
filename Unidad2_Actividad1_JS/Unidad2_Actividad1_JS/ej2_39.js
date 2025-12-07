// Ejercicio 2.39
// Escribe "Feliz" n veces y termina con "Cumpleaños".
let n = parseInt(prompt("¿Cuántos 'Feliz'?"), 10);
let i = 0;
let texto = "";

while (i < n) {
  texto += "Feliz ";
  i++;
}

texto += "Cumpleaños";
alert(texto);
