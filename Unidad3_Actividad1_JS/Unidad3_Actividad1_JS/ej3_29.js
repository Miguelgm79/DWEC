// Ejercicio 29
// Muestra el array anterior en orden inverso.
let a1 = [1, 2, 3, 4];
let a2 = [10, 20, 30, 40];
let producto = a1.map((v, i) => v * a2[i]);

alert("Producto inverso: " + producto.slice().reverse().join(", "));
