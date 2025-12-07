// Ejercicio 2.12
// Dibuja un cuadrado de asteriscos de tamaño n (n x n).
let n = parseInt(prompt("Tamaño del cuadrado:"), 10);
let salida = "";

for (let i = 0; i < n; i++) {
  let fila = "";
  for (let j = 0; j < n; j++) {
    fila += "*";
  }
  salida += fila + "\n";
}

alert(salida);
