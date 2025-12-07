import { cargarLineas, cargarParadas, seedDemo } from "./Storage.js";
import { aMinutos, limpiarMensaje, setMsg } from "./Utils.js";

seedDemo();

const selectLinea = document.querySelector("#lineaDetalle");
const btnVer = document.querySelector("#btnVerDetalle");
const btnLimpiar = document.querySelector("#btnLimpiarDetalle");
const msg = document.querySelector("#msgDetalle");

const infoLinea = document.querySelector("#infoLinea");
const tbody = document.querySelector("#tbodyDetalle");

function rellenarSelect() {
  const lineas = cargarLineas().sort((a,b)=>a.numero-b.numero);
  selectLinea.innerHTML = `<option value="">-- Selecciona línea --</option>`;
  for (const l of lineas) {
    selectLinea.innerHTML += `<option value="${l.numero}">${l.numero} (${l.origen} → ${l.destino})</option>`;
  }
}

function limpiar() {
  selectLinea.value = "";
  tbody.innerHTML = "";
  infoLinea.innerHTML = "";
  limpiarMensaje(msg);
}

btnLimpiar.addEventListener("click", limpiar);

btnVer.addEventListener("click", () => {
  limpiarMensaje(msg);
  tbody.innerHTML = "";
  infoLinea.innerHTML = "";

  const numeroLinea = Number(selectLinea.value);
  if (!numeroLinea) {
    setMsg(msg, "Selecciona una línea", "error");
    return;
  }

  const lineas = cargarLineas();
  const paradas = cargarParadas();

  const linea = lineas.find(l=>l.numero===numeroLinea);
  if (!linea) {
    setMsg(msg, "Línea no encontrada", "error");
    return;
  }

  const paradasLinea = paradas
    .filter(p=>p.numeroLinea===numeroLinea)
    .sort((a,b)=>aMinutos(a.intervaloDesdeSalida)-aMinutos(b.intervaloDesdeSalida));

  infoLinea.innerHTML = `
    <strong>Línea ${linea.numero}</strong><br>
    ${linea.origen} → ${linea.destino}<br>
    Salida: ${linea.horaSalida} · Intervalo buses: ${linea.intervalo}
  `;

  if (paradasLinea.length === 0) {
    setMsg(msg, "Esta línea no tiene paradas aún");
    return;
  }

  for (const p of paradasLinea) {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${p.numeroParada}</td>
      <td>${p.localidad}</td>
      <td>${p.intervaloDesdeSalida}</td>
    `;
    tbody.appendChild(tr);
  }
});

rellenarSelect();
