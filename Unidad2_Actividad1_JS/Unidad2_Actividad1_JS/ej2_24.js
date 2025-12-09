// Ejercicio 2.24
// Pide un mes (1-12) y muestra cuántos días tiene (sin bisiesto).
let mes = parseInt(prompt("Mes (1-12):"), 10);
let dias;

switch (mes) {
  case 1: case 3: case 5: case 7: case 8: case 10: case 12:
    dias = 31; break;
  case 4: case 6: case 9: case 11:
    dias = 30; break;
  case 2:
    dias = 28; break;
  default:
    dias = null;
}

alert(dias ? "Días: " + dias : "Mes inválido");
