// Ejercicio 33
// Simula una cola FIFO usando un array.
// push = encolar, shift = desencolar.
let cola = [];

while (true) {
  let op = parseInt(prompt("COLA FIFO\n1) Encolar\n2) Desencolar\n3) Ver cola\n4) Salir"), 10);

  if (op === 1) {
    cola.push(prompt("Elemento a encolar:"));
  } else if (op === 2) {
    let e = cola.shift();
    alert(e !== undefined ? "Desencolado: " + e : "Cola vacía");
  } else if (op === 3) {
    alert("Cola: " + cola.join(", "));
  } else if (op === 4) break;
}
