// Ejercicio 2.25
// Juego "doble o nada": se lanza una moneda aleatoria.
// Si sale cara, se gana el doble de la apuesta; si sale cruz, se pierde todo.
let apuesta = parseFloat(prompt("Apuesta:"));

let moneda = Math.random() < 0.5 ? "cara" : "cruz";

if (moneda === "cara") {
  alert("Salió cara. Ganas " + (apuesta * 2));
} else {
  alert("Salió cruz. Pierdes todo.");
}
