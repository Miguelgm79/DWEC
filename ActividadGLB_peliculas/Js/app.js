<<<<<<< HEAD
/**
 * @file app.js
 * @description
 * Capa de interfaz (UI) de la CMDB de películas.
 * Gestiona la interacción con el DOM para:
 *  - CRUD de géneros
 *  - CRUD de películas
 *  - Listado de películas con votaciones
 *
 * Esta capa depende de CMDBLogic.js, expuesto en window.CMDBLogic.
 * Los datos se almacenan en localStorage a través de esa lógica.
 *
 * @author 
 * Miguel Garcia
 * @version 1.0.0
 */

/**
 * Representa una fila de género.
 * @typedef {Object} Genre
 * @property {number} id - Identificador único autoincremental.
 * @property {string} name - Nombre del género (máx. 50 caracteres).
 */

/**
 * Representa una película del sistema.
 * @typedef {Object} Movie
 * @property {number} id - Identificador único autoincremental.
 * @property {string} title - Título de la película (máx. 100 caracteres).
 * @property {string} releaseDate - Fecha de estreno en formato YYYY-MM-DD.
 * @property {number} popularity - Popularidad entre 0 y 100.
 * @property {number[]} genres - IDs de géneros asociados.
 * @property {number[]} ratings - Lista de valoraciones (1..10).
 * @property {number} votes - Número total de votos.
 * @property {string|number} score - Media de votos con 2 decimales.
 */

/**
 * Estructura de respuesta estándar usada por CMDBLogic.
 * @typedef {Object} LogicResult
 * @property {boolean} ok - Indica si la operación fue correcta.
 * @property {string} [msg] - Mensaje de error si ok=false.
 */

/* ============================
   INIT POR PÁGINA 
============================ */

/**
 * Inicializa la vista adecuada según los elementos presentes en cada HTML.
 *
 * IMPORTANTÍSIMO:
 * - Si existe movieForm => estamos en CRUD de películas, NO iniciamos listado.
 * - Solo iniciamos listado cuando hay moviesTable Y NO hay movieForm.
 *
 * @listens DOMContentLoaded
 * @returns {void}
 */
document.addEventListener("DOMContentLoaded", () => {
=======
document.addEventListener("DOMContentLoaded", () => {
  // asegura género desconocido si existe lógica
>>>>>>> 341ab2e (Proyecto js)
  if (window.CMDBLogic?.ensureUnknownGenre) {
    CMDBLogic.ensureUnknownGenre();
  }

<<<<<<< HEAD
  if (document.getElementById("genreForm")) initGenresPage();
  if (document.getElementById("movieForm")) initMoviesPage();

  // ✅ solo listado si NO es CRUD
  if (document.getElementById("moviesTable") && !document.getElementById("movieForm")) {
=======
  // Página de géneros
  if (document.getElementById("genreForm")) {
    initGenresPage();
  }

  // CRUD de películas (peliculas.html)
  if (document.getElementById("movieForm")) {
    initMoviesPage();
  }

  // Listado votar (listado.html) => SOLO si NO estamos en CRUD
  if (
    document.getElementById("moviesTable") &&
    !document.getElementById("movieForm")
  ) {
>>>>>>> 341ab2e (Proyecto js)
    initListadoPage();
  }
});

<<<<<<< HEAD
/* ============================
   GÉNEROS
============================ */
=======
/* ============================ UTILS ============================ */

function formatDate(iso) {
  if (!iso) return "-";
  const [y, m, d] = iso.split("-");
  return `${d}/${m}/${y}`;
}

/* ============================ GÉNEROS ============================ */
>>>>>>> 341ab2e (Proyecto js)

/**
 * Inicializa la página de géneros:
 * - Listener de submit en formulario.
 * - Delegación de eventos para editar/eliminar.
 * - Render inicial de géneros.
 *
 * @returns {void}
 */
function initGenresPage() {
  const form = document.getElementById("genreForm");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    addOrUpdateGenre();
  });

  const tableBody = document.getElementById("genresTable");
  tableBody.addEventListener("click", (e) => {
    const tr = e.target.closest("tr");
    if (!tr) return;

    const id = parseInt(tr.dataset.id);

    if (e.target.classList.contains("btn-edit-genre")) {
      startEditGenre(id);
    }

    if (e.target.classList.contains("btn-delete-genre")) {
      deleteGenre(id);
    }
  });

  listGenres();
}

/**
 * Añade un género nuevo o actualiza uno existente.
 * Lee inputs del formulario y delega la validación/persistencia
 * en CMDBLogic.addOrUpdateGenreLogic.
 *
 * @returns {void}
 */
function addOrUpdateGenre() {
  const nameInput = document.getElementById("genreName");
  const idEditingInput = document.getElementById("genreIdEditing");

  const name = nameInput.value;
  const idEditing = idEditingInput.value
    ? parseInt(idEditingInput.value)
    : null;

  /** @type {LogicResult} */
  const res = CMDBLogic.addOrUpdateGenreLogic(name, idEditing);
  if (!res.ok) {
    alert(res.msg);
    return;
  }

  idEditingInput.value = "";
  nameInput.value = "";
  listGenres();
}

/**
 * Carga un género en el formulario y activa modo edición.
 *
 * @param {number} id - ID del género a editar.
 * @returns {void}
 */
function startEditGenre(id) {
  /** @type {Genre|undefined} */
  const genre = CMDBLogic.getGenres().find(g => g.id === id);
  if (!genre) return;

  document.getElementById("genreIdEditing").value = id;
  document.getElementById("genreName").value = genre.name;
}

/**
 * Elimina un género del sistema.
 * Si el género está en uso por alguna película,
 * CMDBLogic devolverá error y se mostrará al usuario.
 *
 * @param {number} id - ID del género a eliminar.
 * @returns {void}
 */
function deleteGenre(id) {
  /** @type {LogicResult} */
  const res = CMDBLogic.deleteGenreLogic(id);
  if (!res.ok) {
    alert(res.msg);
    return;
  }
  listGenres();
}

/**
 * Renderiza la tabla de géneros en pantalla
 * y refresca el selector de géneros de películas.
 *
 * @returns {void}
 */
function listGenres() {
  const table = document.getElementById("genresTable");
  if (!table) return;

  /** @type {Genre[]} */
  const genres = CMDBLogic.getGenres();
  table.innerHTML = "";

  genres.forEach(g => {
    const tr = document.createElement("tr");
    tr.dataset.id = g.id;
    tr.innerHTML = `
      <td>${g.id}</td>
      <td>${g.name}</td>
      <td>
        <button type="button" class="btn-edit-genre">Editar</button>
        <button type="button" class="btn-delete-genre">Eliminar</button>
      </td>
    `;
    table.appendChild(tr);
  });

  fillGenresSelect();
}

<<<<<<< HEAD
/* ============================
   PELÍCULAS (CRUD)
============================ */
=======
/* ============================ PELÍCULAS (CRUD) ============================ */
>>>>>>> 341ab2e (Proyecto js)

/**
 * Inicializa la página CRUD de películas:
 * - Carga géneros en select múltiple.
 * - Render inicial de tabla (modo CRUD).
 * - Listeners de guardar, eliminar y nueva.
 * - Click en fila para cargar película en formulario.
 *
 * @returns {void}
 */
function initMoviesPage() {
  fillGenresSelect();
  listMovies(false);

  document.getElementById("movieForm")
    .addEventListener("submit", (e) => {
      e.preventDefault();
      saveOrUpdateMovie();
    });

  document.getElementById("deleteMovie")
    .addEventListener("click", deleteMovie);

  document.getElementById("newMovie")
    .addEventListener("click", clearMovieForm);

<<<<<<< HEAD
=======
  // Seleccionar fila para editar/eliminar
>>>>>>> 341ab2e (Proyecto js)
  const tableBody = document.getElementById("moviesTable");
  tableBody.addEventListener("click", (e) => {
    const tr = e.target.closest("tr");
    if (!tr) return;

    const movieId = parseInt(tr.dataset.id);
<<<<<<< HEAD
    /** @type {Movie|undefined} */
=======
>>>>>>> 341ab2e (Proyecto js)
    const movie = CMDBLogic.getMovies().find(m => m.id === movieId);
    if (movie) loadMovieIntoForm(movie);
  });
}

/**
 * Rellena el <select multiple> de géneros
 * con los géneros existentes en sistema.
 *
 * @returns {void}
 */
function fillGenresSelect() {
  const select = document.getElementById("movieGenres");
  if (!select) return;

  /** @type {Genre[]} */
  const genres = CMDBLogic.getGenres();
  select.innerHTML = "";

  genres.forEach(g => {
    const opt = document.createElement("option");
    opt.value = g.id;
    opt.textContent = g.name;
    select.appendChild(opt);
  });
}

/**
 * Carga una película en el formulario CRUD
 * para consultar o modificar.
 *
 * @param {Movie} movie - Película seleccionada.
 * @returns {void}
 */
function loadMovieIntoForm(movie) {
  document.getElementById("movieId").value = movie.id;
  document.getElementById("movieTitle").value = movie.title;
  document.getElementById("movieReleaseDate").value = movie.releaseDate || "";
  document.getElementById("moviePopularity").value = movie.popularity ?? "";

  const sel = document.getElementById("movieGenres");
  Array.from(sel.options).forEach(opt => {
    opt.selected = movie.genres.includes(parseInt(opt.value));
  });
}

/**
 * Limpia el formulario de películas (modo nueva película).
 *
 * @returns {void}
 */
function clearMovieForm() {
  document.getElementById("movieId").value = "";
  document.getElementById("movieTitle").value = "";
  document.getElementById("movieReleaseDate").value = "";
  document.getElementById("moviePopularity").value = "";

  const sel = document.getElementById("movieGenres");
  if (sel) Array.from(sel.options).forEach(o => o.selected = false);
}

/**
 * Guarda una película nueva o actualiza una existente.
 * Lee campos del formulario y delega validación y persistencia
 * en CMDBLogic.saveOrUpdateMovieLogic.
 *
 * Si no hay géneros seleccionados,
 * asigna automáticamente "género desconocido".
 *
 * @returns {void}
 */
function saveOrUpdateMovie() {
  const idStr = document.getElementById("movieId").value.trim();
  const title = document.getElementById("movieTitle").value.trim();
  const releaseDate = document.getElementById("movieReleaseDate").value;
  const popularity = parseFloat(document.getElementById("moviePopularity").value);

  /** @type {number[]} */
  let selectedGenres = Array.from(
    document.getElementById("movieGenres").selectedOptions
  ).map(o => parseInt(o.value));

  if (selectedGenres.length === 0) {
    const unknown = CMDBLogic.getGenres()
      .find(g => g.name.toLowerCase() === "género desconocido");
    if (unknown) selectedGenres = [unknown.id];
  }

  const id = idStr ? parseInt(idStr) : null;

  /** @type {LogicResult} */
  const res = CMDBLogic.saveOrUpdateMovieLogic({
    id, title, releaseDate, popularity, genres: selectedGenres
  });

  if (!res.ok) {
    alert(res.msg);
    return;
  }

  clearMovieForm();
  listMovies(false);
}

/**
 * Elimina la película seleccionada (por ID).
 * Si no hay ID cargado, muestra aviso.
 *
 * @returns {void}
 */
function deleteMovie() {
  const idStr = document.getElementById("movieId").value.trim();
  if (!idStr) {
    alert("Selecciona una película haciendo click en la tabla.");
    return;
  }

  const id = parseInt(idStr);

  /** @type {LogicResult} */
  const res = CMDBLogic.deleteMovieLogic(id);

  if (!res.ok) {
    alert(res.msg);
    return;
  }

  clearMovieForm();
  listMovies(false);
}

<<<<<<< HEAD
/**
 * Renderiza la tabla de películas.
 *
 * - withVotes=false: modo CRUD (sin votar, muestra géneros).
 * - withVotes=true : modo listado (muestra input + botón votar).
 *
 * @param {boolean} [withVotes=false] - Activa el modo votación.
 * @returns {void}
=======
function clearMovieForm() {
  document.getElementById("movieId").value = "";
  document.getElementById("movieTitle").value = "";
  document.getElementById("movieReleaseDate").value = "";
  document.getElementById("moviePopularity").value = "";

  const sel = document.getElementById("movieGenres");
  Array.from(sel.options).forEach(o => o.selected = false);
}

function loadMovieIntoForm(movie) {
  document.getElementById("movieId").value = movie.id;
  document.getElementById("movieTitle").value = movie.title;
  document.getElementById("movieReleaseDate").value = movie.releaseDate || "";
  document.getElementById("moviePopularity").value = movie.popularity ?? "";

  const sel = document.getElementById("movieGenres");
  Array.from(sel.options).forEach(opt => {
    opt.selected = (movie.genres || []).includes(parseInt(opt.value));
  });
}

/**
 * Lista películas.
 * withVotes = false -> modo CRUD (peliculas.html)
 * withVotes = true  -> modo listado votar (listado.html)
>>>>>>> 341ab2e (Proyecto js)
 */
function listMovies(withVotes = false) {
  const table = document.getElementById("moviesTable");
  if (!table) return;

  /** @type {Movie[]} */
  const movies = CMDBLogic.getMovies();
  /** @type {Genre[]} */
  const genres = CMDBLogic.getGenres();

<<<<<<< HEAD
  table.innerHTML = "";

=======
>>>>>>> 341ab2e (Proyecto js)
  movies.forEach(movie => {
    const movieGenres = (movie.genres || [])
      .map(gid => genres.find(g => g.id === gid)?.name)
      .filter(Boolean)
      .join(", ");

    const tr = document.createElement("tr");
    tr.dataset.id = movie.id;

    if (withVotes) {
      // ✅ LISTADO VOTAR (7 columnas exactas del PDF)
      tr.innerHTML = `
        <td>${movie.title}</td>
        <td>${formatDate(movie.releaseDate)}</td>
        <td>${movie.popularity ?? "-"}</td>
<<<<<<< HEAD
        <td>${movie.score || "0.00"}</td>
        <td>
          <input type="number" min="1" max="10" step="1" id="rating-${movie.id}">
=======
        <td>${movie.score ?? "0"}</td>
        <td>${movie.votes || 0}</td>
        <td>${movieGenres || "-"}</td>
        <td class="vote-cell">
          <input type="number" min="0" max="10" step="1" id="rating-${movie.id}">
>>>>>>> 341ab2e (Proyecto js)
          <button type="button" class="btn-rate-movie">Votar</button>
        </td>
      `;
    } else {
      // ✅ CRUD (como lo tenías)
      tr.innerHTML = `
        <td>${movie.id}</td>
        <td>${movie.title}</td>
        <td>${formatDate(movie.releaseDate)}</td>
        <td>${movie.popularity ?? "-"}</td>
        <td>${movie.score || "0.00"}</td>
        <td>${movieGenres || "-"}</td>
      `;
    }

    table.appendChild(tr);
  });
}

/* ============================
   LISTADO (VOTACIÓN)
============================ */

/**
 * Inicializa la página de listado con votaciones:
 * - Delegación de click para votar.
 * - Render inicial en modo votos.
 *
 * @returns {void}
 */
function initListadoPage() {
  const tableBody = document.getElementById("moviesTable");

  tableBody.addEventListener("click", (e) => {
    const btn = e.target.closest(".btn-rate-movie");
    if (!btn) return;

    const tr = btn.closest("tr");
    if (!tr) return;

    const id = parseInt(tr.dataset.id);
    rateMovie(id);
  });

  listMovies(true);
}

<<<<<<< HEAD
/**
 * Envía una valoración a CMDBLogic y refresca la tabla.
 *
 * @param {number} id - ID de la película a valorar.
 * @returns {void}
 */
=======

>>>>>>> 341ab2e (Proyecto js)
function rateMovie(id) {
  const input = document.getElementById(`rating-${id}`);
  const rating = parseInt(input.value);

<<<<<<< HEAD
  /** @type {LogicResult} */
=======
  if (Number.isNaN(rating)) {
    alert("Introduce una valoración entre 0 y 10.");
    return;
  }

>>>>>>> 341ab2e (Proyecto js)
  const res = CMDBLogic.rateMovieLogic(id, rating);
  if (!res.ok) {
    alert(res.msg);
    return;
  }

  listMovies(true);
  input.value = "";
}
