// Ejercicio 4
// Función crearEmail(usuario, servidor, dominio)
// Devuelve "usuario@servidor.dominio".
function crearEmail(usuario, servidor, dominio) {
  // Limpiamos espacios accidentales
  return usuario.trim() + "@" + servidor.trim() + "." + dominio.trim();
}

let usuario = prompt("Nombre de usuario (antes del @):");
let servidor = prompt("Servidor de correo (ej: gmail):");
let dominio = prompt("Dominio (ej: com, es, org):");

alert("Dirección de correo: " + crearEmail(usuario, servidor, dominio));
