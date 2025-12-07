// Ejercicio 2.9
// Demuestra que las asignaciones copian el valor, no la referencia (en strings).
let primer_saludo = "hola";
let segundo_saludo = primer_saludo; // aquí segundo_saludo vale "hola"
primer_saludo = "hello";            // cambiamos primer_saludo, pero no afecta al segundo
alert(segundo_saludo);              // muestra "hola"
