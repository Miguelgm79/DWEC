// Ejercicio 28
// Multiplica elemento a elemento dos arrays numéricos enteros.
let a1 = [1, 2, 3, 4];
let a2 = [10, 20, 30, 40];

let producto = a1.map((v, i) => v * a2[i]);

alert("A1: " + a1.join(", ") + "\nA2: " + a2.join(", ") + "\nProducto: " + producto.join(", "));
