// Ejercicio 2.35
// Multiplica dos enteros mediante sumas sucesivas (sin usar '*').
let a = parseInt(prompt("Multiplicando:"), 10);
let b = parseInt(prompt("Multiplicador:"), 10);

let res = 0;

for (let i = 0; i < Math.abs(b); i++) {
  res += Math.abs(a);
}

// Ajusta signo si uno es negativo y el otro positivo
if ((a < 0) ^ (b < 0)) res = -res;

alert("Resultado: " + res);
