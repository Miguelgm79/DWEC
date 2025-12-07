// Ejercicio 2.40
// Igual que el 2.38 pero usando do...while.
let i = 1, cont = 0, linea = "";

do {
  linea += i + (i < 25 ? ", " : "");
  cont++;

  if (cont === 4) {
    document.write(linea + "<br>");
    linea = "";
    cont = 0;
  }

  i += 3;
} while (i <= 25);

if (linea !== "") document.write(linea);
