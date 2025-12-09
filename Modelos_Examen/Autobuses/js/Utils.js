export function esEnteroPositivo(n) {
  return Number.isInteger(n) && n >= 1;
}

export function esHoraValida(h) {
  return /^([01]\d|2[0-3]):[0-5]\d$/.test(h);
}

export function aMinutos(hhmm) {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
}

export function limpiarMensaje(el) {
  el.textContent = "";
  el.classList.remove("error", "ok");
}

export function setMsg(el, texto, tipo="ok") {
  el.textContent = texto;
  el.classList.remove("error", "ok");
  el.classList.add(tipo);
}
