// Ejercicio 20
// Crea un array con 3 pizzas "a mano", añade 2 más con push,
// y muestra cantidad total y listado.
let pizzas = ["Margarita", "Barbacoa", "Cuatro quesos"];
pizzas.push("Hawaiana");
pizzas.push("Carbonara");

alert("Total pizzas: " + pizzas.length + "\n" + pizzas.join(", "));
