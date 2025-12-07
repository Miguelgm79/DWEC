// Ejercicio 2.37
// Menú: Costilla (23€) o Pescado (15€). Postre opcional (3€).
// Al final se suma propina del 6%.
let opcion = parseInt(prompt("Pulse 1 Costilla\nPulse 2 Pescado"), 10);
let postre = confirm("¿Quieres postre?");

let pago = (opcion === 1) ? 23 : (opcion === 2) ? 15 : 0;
if (postre) pago += 3;

pago += pago * 0.06;

alert("Total cena: " + pago.toFixed(2) + " €");
