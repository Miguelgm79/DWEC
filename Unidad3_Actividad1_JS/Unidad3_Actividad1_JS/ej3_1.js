// Ejercicio 1 (Unidad 3 - Actividad 1)
// Función vernumeros() que muestra los 10 primeros números.
// El programa pregunta cuántas veces quieres verlos y repite.
function vernumeros() {
  let salida = "";
  for (let i = 1; i <= 10; i++) {
    salida += i + " ";
  }
  alert(salida);
}

let veces = parseInt(prompt("¿Cuántas veces quieres visualizar los 10 primeros números?"), 10);
for (let k = 0; k < veces; k++) {
  vernumeros();
}
