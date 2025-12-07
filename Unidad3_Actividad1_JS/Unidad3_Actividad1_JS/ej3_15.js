// Ejercicio 15
// Crea un método nuevo en Array que elimina el elemento en una posición dada.
Array.prototype.eliminarEn = function (pos) {
  // Si pos no es válida, no hacemos nada
  if (pos < 0 || pos >= this.length) return this;
  // splice elimina 1 elemento en pos
  this.splice(pos, 1);
  return this;
};

// Demo
let arr = [10, 20, 30, 40];
arr.eliminarEn(2); // elimina 30
alert(arr.join(", "));
