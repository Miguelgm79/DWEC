// Ejercicio 2.21
// Pide el número total de alumnos y el sexo (H/M) de cada uno.
// Calcula el porcentaje de hombres y mujeres.
let total = parseInt(prompt("Total de alumnos:"), 10);
let hombres = 0, mujeres = 0;

for (let i = 1; i <= total; i++) {
  let sexo = prompt("Sexo alumno " + i + " (H/M):").toUpperCase();
  if (sexo === "H") hombres++;
  else if (sexo === "M") mujeres++;
}

alert(
  "Hombres: " + (hombres * 100 / total).toFixed(1) + "%\n" +
  "Mujeres: " + (mujeres * 100 / total).toFixed(1) + "%"
);
