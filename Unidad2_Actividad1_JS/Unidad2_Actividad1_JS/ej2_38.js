// Ejercicio 2.38
// Muestra números entre 1 y 25 incrementando de 3 en 3.
// Presenta 4 números por línea.
let linea = "";
let cont = 0;

for (let i = 1; i <= 25; i += 3) {
  linea += i + (i < 25 ? ", " : "");
  cont++;

  if (cont === 4) {
    document.write(linea + "<br>");
    linea = "";
    cont = 0;
  }
}

if (linea !== "") document.write(linea);
