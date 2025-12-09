// Ejercicio 2.30
// Mini MasterMind para 2 jugadores:
// Jugador 1 introduce 4 números (con espacios). Jugador 2 tiene 8 intentos.
// Se muestra cuántos "muertos" (bien colocados) y "heridos" (número correcto mal colocado).

let secreto = prompt("Jugador 1 (4 números separados por espacio):").trim().split(/\s+/);
let intentos = 8;
let ganado = false;

for (let t = 1; t <= intentos; t++) {
  let intento = prompt("Jugador 2 intento " + t + "/8 (4 números):").trim().split(/\s+/);

  let muertos = 0, heridos = 0;
  let usadosSecreto = Array(4).fill(false);
  let usadosIntento = Array(4).fill(false);

  // Muertos: misma posición
  for (let i = 0; i < 4; i++) {
    if (intento[i] === secreto[i]) {
      muertos++;
      usadosSecreto[i] = true;
      usadosIntento[i] = true;
    }
  }

  // Heridos: número igual en otra posición
  for (let i = 0; i < 4; i++) {
    if (usadosIntento[i]) continue;
    for (let j = 0; j < 4; j++) {
      if (!usadosSecreto[j] && intento[i] === secreto[j]) {
        heridos++;
        usadosSecreto[j] = true;
        break;
      }
    }
  }

  alert("Muertos: " + muertos + " | Heridos: " + heridos);

  if (muertos === 4) {
    ganado = true;
    break;
  }
}

alert(ganado ? "¡Has ganado!" : "Has perdido. Combinación: " + secreto.join(" "));
