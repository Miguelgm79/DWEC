// Ejercicio 18
// Crea 4 objetos Coche con marca, modelo y año.
// Muestra todos los coches con sus datos.
let coches = [
  { marca: "Ford", modelo: "Focus", anio: 2018 },
  { marca: "Seat", modelo: "Ibiza", anio: 2020 },
  { marca: "Toyota", modelo: "Corolla", anio: 2015 },
  { marca: "Renault", modelo: "Clio", anio: 2019 }
];

let salida = coches.map(c => `${c.marca} ${c.modelo} (${c.anio})`).join("\n");
alert(salida);
