// Ejercicio 2.16
// Pide una cadena y muestra su longitud y distintas formas de presentación en HTML.
let cad = prompt("Escribe una cadena:");

document.write("Longitud: " + cad.length + "<br>");
document.write("<i>" + cad + "</i><br>");
document.write("<b>" + cad + "</b><br>");
document.write("<s>" + cad + "</s><br>");
document.write("<span style='font-size:40px;color:red;'>" + cad + "</span><br>");
