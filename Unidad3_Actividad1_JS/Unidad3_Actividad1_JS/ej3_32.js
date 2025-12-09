// Ejercicio 32
// Simula una pila LIFO usando un array.
// push = apilar, pop = desapilar.
let pila = [];

while (true) {
  let op = parseInt(prompt("PILA LIFO\n1) Apilar\n2) Desapilar\n3) Ver pila\n4) Salir"), 10);

  if (op === 1) {
    pila.push(prompt("Elemento a apilar:"));
  } else if (op === 2) {
    let e = pila.pop();
    alert(e !== undefined ? "Desapilado: " + e : "Pila vacía");
  } else if (op === 3) {
    alert("Pila: " + pila.join(", "));
  } else if (op === 4) break;
}
