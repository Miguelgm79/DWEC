// Ejercicio 2.14
// Juego de adivinar un número con un máximo de 5 intentos.
let secreto = parseInt(prompt("Jugador 1: escribe un número secreto:"), 10);
let acertado = false;

for (let i = 1; i <= 5; i++) {
  let intento = parseInt(prompt("Jugador 2: intento " + i + "/5"), 10);
  if (intento === secreto) {
    alert("¡Acertaste!");
    acertado = true;
    break; // sale del bucle si acierta
  } else {
    alert("Nope.");
  }
}

if (!acertado) {
  alert("Se acabaron los intentos. El número era " + secreto);
}
