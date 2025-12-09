// Ejercicio 36
// 1) Función pedirResultadoDivision(): pide al usuario resultado de a/b.
// 2) Función comprobarResultado(a,b,resultado): devuelve si es correcto.
// La primera usa la segunda para informar.
// Además: función aleatorioEntre(min,max) usando Math.random().

function comprobarResultado(a, b, resultado) {
  return resultado === a / b;
}

function pedirResultadoDivision() {
  let a = parseFloat(prompt("Dividendo a:"));
  let b = parseFloat(prompt("Divisor b:"));
  let resUser = parseFloat(prompt("¿Cuánto es a/b?"));

  if (comprobarResultado(a, b, resUser)) {
    alert("Correcto ✅");
  } else {
    alert("Incorrecto ❌. El resultado real es " + (a / b));
  }
}

function aleatorioEntre(min, max) {
  // Math.random() -> [0,1). Escalamos a [min,max]
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Demo división
pedirResultadoDivision();

// Demo aleatorio
let min = parseInt(prompt("Mínimo para aleatorio:"), 10);
let max = parseInt(prompt("Máximo para aleatorio:"), 10);
alert("Aleatorio entre " + min + " y " + max + ": " + aleatorioEntre(min, max));
