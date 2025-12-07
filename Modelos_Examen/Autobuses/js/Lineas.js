import { cargarLineas, guardarLineas, cargarParadas, guardarParadas, seedDemo } from "./Storage.js";
import { esEnteroPositivo, esHoraValida, limpiarMensaje, setMsg } from "./Utils.js";

seedDemo();

const form = document.querySelector("#form-linea");
const msg = document.querySelector("#msgLinea");
const tbody = document.querySelector("#tbodyLineas");

const numeroLineaInput = document.querySelector("#numeroLinea");
const origenInput = document.querySelector("#origenLinea");
const destinoInput = document.querySelector("#destinoLinea");
const horaSalidaInput = document.querySelector("#horaSalida");
const intervaloInput = document.querySelector("#intervaloLinea");
const modoEdicionInput = document.querySelector("#modoEdicionLinea");
const numeroOriginalInput = document.querySelector("#numeroLineaOriginal");

const btnCancelar = document.querySelector("#btnCancelarLinea");

function render() {
  const lineas = cargarLineas().sort((a,b)=>a.numero-b.numero);
  tbody.innerHTML = "";

  for (const l of lineas) {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${l.numero}</td>
      <td>${l.origen}</td>
      <td>${l.destino}</td>
      <td>${l.horaSalida}</td>
      <td>${l.intervalo}</td>
      <td>
        <button class="secondary" data-edit="${l.numero}">Editar</button>
        <button class="danger" data-del="${l.numero}">Borrar</button>
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

  const numero = Number(numeroLineaInput.value);
  const origen = origenInput.value.trim();
  const destino = destinoInput.value.trim();
  const horaSalida = horaSalidaInput.value;
  const intervalo = intervaloInput.value;

  try {
    if (!esEnteroPositivo(numero)) throw new Error("Número de línea inválido");
    if (!origen) throw new Error("Origen obligatorio");
    if (!destino) throw new Error("Destino obligatorio");
    if (origen.toLowerCase() === destino.toLowerCase()) throw new Error("Origen y destino no pueden ser iguales");
    if (!esHoraValida(horaSalida)) throw new Error("Hora de salida inválida");
    if (!esHoraValida(intervalo)) throw new Error("Intervalo inválido");

    const modoEdicion = modoEdicionInput.value === "1";
    const numeroOriginal = Number(numeroOriginalInput.value);

    if (!modoEdicion) {
      if (lineas.some(l=>l.numero===numero)) throw new Error("Ese número de línea ya existe");
      lineas.push({ numero, origen, destino, horaSalida, intervalo });
      guardarLineas(lineas);
      setMsg(msg, "Línea creada correctamente");
    } else {
      // si cambia número, no repetir
      if (numero !== numeroOriginal && lineas.some(l=>l.numero===numero)) {
        throw new Error("Ese número de línea ya existe");
      }

      const idx = lineas.findIndex(l=>l.numero===numeroOriginal);
      if (idx === -1) throw new Error("Línea no encontrada");

      lineas[idx] = { numero, origen, destino, horaSalida, intervalo };

      // Si cambió el número, actualiza paradas asociadas
      if (numero !== numeroOriginal) {
        for (const p of paradas) {
          if (p.numeroLinea === numeroOriginal) p.numeroLinea = numero;
        }
        guardarParadas(paradas);
      }

      guardarLineas(lineas);
      setMsg(msg, "Línea modificada correctamente");
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
    const lineas = cargarLineas();
    const l = lineas.find(x=>x.numero===Number(editNum));
    if (!l) return;

    numeroLineaInput.value = l.numero;
    origenInput.value = l.origen;
    destinoInput.value = l.destino;
    horaSalidaInput.value = l.horaSalida;
    intervaloInput.value = l.intervalo;

    modoEdicionInput.value = "1";
    numeroOriginalInput.value = l.numero;
    setMsg(msg, "Editando línea " + l.numero);
  }

  if (delNum) {
    const numero = Number(delNum);
    let lineas = cargarLineas();
    const paradas = cargarParadas();

    if (paradas.some(p=>p.numeroLinea===numero)) {
      setMsg(msg, "No puedes borrar la línea: tiene paradas asociadas", "error");
      return;
    }

    lineas = lineas.filter(l=>l.numero!==numero);
    guardarLineas(lineas);
    setMsg(msg, "Línea borrada");
    render();
  }
});

render();

