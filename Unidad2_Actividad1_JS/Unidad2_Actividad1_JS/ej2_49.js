// Ejercicio 2.49
// Calcula suma de pares e impares entre 1 y 200 en el mismo bucle.
let sumaPares = 0;
let sumaImpares = 0;

for (let i = 1; i <= 200; i++) {
  if (i % 2 === 0) sumaPares += i;
  else sumaImpares += i;
}

alert("Suma pares: " + sumaPares + "\nSuma impares: " + sumaImpares);
