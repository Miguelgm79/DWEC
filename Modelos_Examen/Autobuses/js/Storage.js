const KEY_LINEAS = "lineas";
const KEY_PARADAS = "paradas";

export function cargarLineas() {
  return JSON.parse(localStorage.getItem(KEY_LINEAS)) || [];
}
export function guardarLineas(lineas) {
  localStorage.setItem(KEY_LINEAS, JSON.stringify(lineas));
}

export function cargarParadas() {
  return JSON.parse(localStorage.getItem(KEY_PARADAS)) || [];
}
export function guardarParadas(paradas) {
  localStorage.setItem(KEY_PARADAS, JSON.stringify(paradas));
}

// Semilla demo opcional
export function seedDemo() {
  if (!localStorage.getItem(KEY_LINEAS)) {
    guardarLineas([
      { numero: 1, origen: "Avilés", destino: "Gijón", horaSalida: "06:00", intervalo: "00:30" },
      { numero: 2, origen: "Avilés", destino: "Oviedo", horaSalida: "07:15", intervalo: "01:00" }
    ]);
  }
  if (!localStorage.getItem(KEY_PARADAS)) {
    guardarParadas([
      { numeroParada: 1, numeroLinea: 1, localidad: "Corvera", intervaloDesdeSalida: "00:15" },
      { numeroParada: 2, numeroLinea: 1, localidad: "Gijón", intervaloDesdeSalida: "00:50" },
      { numeroParada: 3, numeroLinea: 2, localidad: "Llanera", intervaloDesdeSalida: "00:25" },
      { numeroParada: 4, numeroLinea: 2, localidad: "Oviedo", intervaloDesdeSalida: "00:55" }
    ]);
  }
}
