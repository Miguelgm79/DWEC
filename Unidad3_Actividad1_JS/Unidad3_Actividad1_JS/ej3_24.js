// Ejercicio 24
// Array multidimensional de alumnos: [Nombre, Edad, Población, H/M].
// Sí se pueden usar push y pop: afectan al array principal (filas).
let alumnos = [
  ["Ana", 20, "Avilés", "M"],
  ["Luis", 22, "Gijón", "H"],
  ["Marta", 19, "Oviedo", "M"]
];

// Push añade una nueva fila
alumnos.push(["Pablo", 21, "Mieres", "H"]);
// Pop quita la última fila
let quitado = alumnos.pop();

console.log("Quitado:", quitado);
console.log("Alumnos:", alumnos);
alert("Mira la consola para ver el multidimensional.");
