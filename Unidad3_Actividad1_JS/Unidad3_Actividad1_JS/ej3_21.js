// Ejercicio 21
// Método en String que trunca a longitud dada y añade indicador "...".
String.prototype.truncar = function (len, indicador = "...") {
  if (this.length <= len) return this.toString();
  return this.slice(0, len) + indicador;
};

// Demo
let texto = prompt("Cadena:");
let n = parseInt(prompt("Longitud máxima:"), 10);
alert(texto.truncar(n));
