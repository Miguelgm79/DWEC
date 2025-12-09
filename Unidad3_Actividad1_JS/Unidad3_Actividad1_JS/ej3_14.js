// Ejercicio 14
// Clase Persona con:
// - propiedad pública nombre
// - propiedad privada #edad
// - variable pública (static publica) y privada (static #privada)
// - método público y privado
// - getter y setter

class Persona {
  // Variable pública de clase
  static especie = "humano";
  // Variable privada de clase
  static #contador = 0;

  // Propiedad pública
  nombre;
  // Propiedad privada
  #edad;

  constructor(nombre, edad) {
    this.nombre = nombre;
    this.#edad = edad;
    Persona.#contador++;
  }

  // Método público
  presentarse() {
    return `Soy ${this.nombre} y tengo ${this.#edad} años.`;
  }

  // Método privado
  #esMayorDeEdad() {
    return this.#edad >= 18;
  }

  // Getter de edad (para leer la privada)
  get edad() {
    return this.#edad;
  }

  // Setter de edad (para modificar la privada)
  set edad(nuevaEdad) {
    if (nuevaEdad < 0) throw new Error("Edad inválida");
    this.#edad = nuevaEdad;
  }

  // Método público que usa el privado
  mayorDeEdad() {
    return this.#esMayorDeEdad();
  }

  // Getter público de la variable privada #contador
  static get totalPersonas() {
    return Persona.#contador;
  }
}

// Demo rápida
let p = new Persona("Ana", 20);
alert(p.presentarse());
alert("¿Mayor de edad? " + p.mayorDeEdad());
alert("Total personas creadas: " + Persona.totalPersonas);
