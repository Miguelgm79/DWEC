// Ejercicio 2.15
// Convierte una nota numérica (0-10) a texto usando switch.
let nota = parseInt(prompt("Nota (0-10):"), 10);
let texto;

switch (nota) {
  case 0: case 1: case 2: case 3: case 4:
    texto = "Suspenso"; break;
  case 5: case 6:
    texto = "Aprobado"; break;
  case 7: case 8:
    texto = "Notable"; break;
  case 9: case 10:
    texto = "Sobresaliente"; break;
  default:
    texto = "Nota inválida";
}

alert(texto);
