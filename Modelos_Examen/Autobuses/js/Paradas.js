import { cargarLineas, cargarParadas, guardarParadas, seedDemo } from "./Storage.js";
import { esEnteroPositivo, esHoraValida, aMinutos, limpiarMensaje, setMsg } from "./Utils.js";

seedDemo();

const form = document.querySelector("#form-parada");
const msg = document.querySelector("#msgParada");
const tbody = document.querySelector("#tbodyParadas");

const numeroParadaInput = document.querySelector("#numeroParada");
const numeroLineaSelect = document.querySelector("#numeroLineaParada");
const localidadInput = document.querySelector("#localidadParada");
const intervaloInput = document.querySelector("#intervaloParada");
const modoEdicionInput = document.querySelector("#modoEdicionParada");
const numeroOriginalInput = document.querySelector("#numeroParadaOriginal");

const filtroLinea = document.querySelector("#filtroLineaParadas");
const btnCancelar = document.querySelector("#btnCancelarParada");

function rellenarSelectLineas() {
  const lineas = cargarLineas().sort((a,b)=>a.numero-b.numero);

  numeroLineaSelect.innerHTML = `<option value="">-- Selecciona línea --</option>`;
  filtroLinea.innerHTML = `<option value="todas">Todas</option>`;

  for (const l of lineas) {
    numeroLineaSelect.innerHTML += `<option value="${l.numero}">${l.numero} (${l.origen} → ${l.destino})</option>`;
    filtroLinea.innerHTML += `<option value="${l.numero}">${l.numero}</option>`;
  }
}

function render() {
  const paradas = cargarParadas();
  const lineaFiltro = filtroLinea.value;

  const lista = (lineaFiltro === "todas")
    ? paradas
    : paradas.filter(p=>p.numeroLinea===Number(lineaFiltro));

  tbody.innerHTML = "";

  for (const p of lista.sort((a,b)=>a.numeroParada-b.numeroParada)) {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${p.numeroParada}</td>
      <td>${p.numeroLinea}</td>
      <td>${p.localidad}</td>
      <td>${p.intervaloDesdeSalida}</td>
      <td>
        <button class="secondary" data-edit="${p.numeroParada}">Editar</button>
        <button class="danger" data-del="${p.numeroParada}">Borrar</button>
      </td>
    `;
    tbody.appendChild(tr);
  }
}

function resetForm() {
  form.reset();
  modoEdicionInput.value = "0";
  numeroOriginalInput.value = "";
  limpiarMensaje(msg);
}

btnCancelar.addEventListener("click", resetForm);

form.addEventListener("submit", (e) => {
  e.preventDefault();
  limpiarMensaje(msg);

  const lineas = cargarLineas();
  const paradas = cargarParadas();

  const numeroParada = Number(numeroParadaInput.value);
  const numeroLinea = Number(numeroLineaSelect.value);
  const localidad = localidadInput.value.trim();
  const intervaloDesdeSalida = intervaloInput.value;

  try {
    if (!esEnteroPositivo(numeroParada)) throw new Error("Número de parada inválido");
    if (!esEnteroPositivo(numeroLinea)) throw new Error("Debes seleccionar una línea");
    if (!localidad) throw new Error("Localidad obligatoria");
    if (!esHoraValida(intervaloDesdeSalida)) throw new Error("Intervalo inválido");

    const linea = lineas.find(l=>l.numero===numeroLinea);
    if (!linea) throw new Error("La línea no existe");

    const modoEdicion = modoEdicionInput.value === "1";
    const numeroOriginal = Number(numeroOriginalInput.value);

    if (!modoEdicion) {
      if (paradas.some(p=>p.numeroParada===numeroParada)) {
        throw new Error("Ese número de parada ya existe");
      }
    } else {
      if (numeroParada !== numeroOriginal && paradas.some(p=>p.numeroParada===numeroParada)) {
        throw new Error("Ese número de parada ya existe");
      }
    }

    const paradasDeLinea = paradas.filter(p=>p.numeroLinea===numeroLinea && p.numeroParada!==numeroOriginal);

    // Validación destino: si localidad == destino, debe ser el intervalo mayor
    const esDestino = localidad.toLowerCase() === linea.destino.toLowerCase();
    if (esDestino) {
      const minsNueva = aMinutos(intervaloDesdeSalida);
      const maxActual = Math.max(0, ...paradasDeLinea.map(p=>aMinutos(p.intervaloDesdeSalida)));
      if (minsNueva < maxActual) {
        throw new Error("La parada destino debe tener el intervalo más alto de la línea");
      }
    }

    if (!modoEdicion) {
      paradas.push({ numeroParada, numeroLinea, localidad, intervaloDesdeSalida });
      guardarParadas(paradas);
      setMsg(msg, "Parada creada correctamente");
    } else {
      const idx = paradas.findIndex(p=>p.numeroParada===numeroOriginal);
      if (idx === -1) throw new Error("Parada no encontrada");
      paradas[idx] = { numeroParada, numeroLinea, localidad, intervaloDesdeSalida };
      guardarParadas(paradas);
      setMsg(msg, "Parada modificada correctamente");
    }

    resetForm();
    render();
  } catch (err) {
    setMsg(msg, err.message, "error");
  }
});

tbody.addEventListener("click", (e) => {
  const editNum = e.target.dataset.edit;
  const delNum = e.target.dataset.del;

  if (editNum) {
    const paradas = cargarParadas();
    const p = paradas.find(x=>x.numeroParada===Number(editNum));
    if (!p) return;

    numeroParadaInput.value = p.numeroParada;
    numeroLineaSelect.value = p.numeroLinea;
    localidadInput.value = p.localidad;
    intervaloInput.value = p.intervaloDesdeSalida;

    modoEdicionInput.value = "1";
    numeroOriginalInput.value = p.numeroParada;
    setMsg(msg, "Editando parada " + p.numeroParada);
  }

  if (delNum) {
    const numero = Number(delNum);
    let paradas = cargarParadas();
    paradas = paradas.filter(p=>p.numeroParada!==numero);
    guardarParadas(paradas);
    setMsg(msg, "Parada borrada");
    render();
  }
});

filtroLinea.addEventListener("change", render);

rellenarSelectLineas();
render();
