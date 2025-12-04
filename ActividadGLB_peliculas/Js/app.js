
document.addEventListener("DOMContentLoaded", () => {
  // si existe la lógica externa
  if (window.CMDBLogic?.ensureUnknownGenre) {
    CMDBLogic.ensureUnknownGenre();
  }

  if (document.getElementById("genreForm")) initGenresPage();
  if (document.getElementById("movieForm")) initMoviesPage();
  if (document.getElementById("moviesTable")) initListadoPage();
});

/* ============================ GÉNEROS ============================ */

function initGenresPage() {
  const form = document.getElementById("genreForm");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    addOrUpdateGenre();
  });

  // Delegación de eventos para botones Editar/Eliminar
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

function addOrUpdateGenre() {
  const nameInput = document.getElementById("genreName");
  const idEditingInput = document.getElementById("genreIdEditing");

  const name = nameInput.value;
  const idEditing = idEditingInput.value
    ? parseInt(idEditingInput.value)
    : null;

  const res = CMDBLogic.addOrUpdateGenreLogic(name, idEditing);
  if (!res.ok) {
    alert(res.msg);
    return;
  }

  idEditingInput.value = "";
  nameInput.value = "";
  listGenres();
}

function startEditGenre(id) {
  const genre = CMDBLogic.getGenres().find(g => g.id === id);
  if (!genre) return;

  document.getElementById("genreIdEditing").value = id;
  document.getElementById("genreName").value = genre.name;
}

function deleteGenre(id) {
  const res = CMDBLogic.deleteGenreLogic(id);
  if (!res.ok) {
    alert(res.msg);
    return;
  }
  listGenres();
}

function listGenres() {
  const table = document.getElementById("genresTable");
  if (!table) return;

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

/* ============================ PELÍCULAS ============================ */

function initMoviesPage() {
  fillGenresSelect();
  listMovies(false);

  document.getElementById("saveMovie")
    .addEventListener("click", saveOrUpdateMovie);

  document.getElementById("deleteMovie")
    .addEventListener("click", deleteMovie);

  document.getElementById("newMovie")
    .addEventListener("click", clearMovieForm);

  // Delegación de eventos para seleccionar fila en CRUD
  const tableBody = document.getElementById("moviesTable");
  tableBody.addEventListener("click", (e) => {
    const tr = e.target.closest("tr");
    if (!tr) return;

    // si estamos en CRUD (no en listado votar)
    if (!tableBody.dataset.mode || tableBody.dataset.mode !== "votes") {
      const movieId = parseInt(tr.dataset.id);
      const movie = CMDBLogic.getMovies().find(m => m.id === movieId);
      if (movie) loadMovieIntoForm(movie);
    }
  });
}

function fillGenresSelect() {
  const select = document.getElementById("movieGenres");
  if (!select) return;

  const genres = CMDBLogic.getGenres();
  select.innerHTML = "";

  genres.forEach(g => {
    const opt = document.createElement("option");
    opt.value = g.id;
    opt.textContent = g.name;
    select.appendChild(opt);
  });
}

function saveOrUpdateMovie() {
  const idStr = document.getElementById("movieId").value.trim();
  const title = document.getElementById("movieTitle").value.trim();
  const releaseDate = document.getElementById("movieReleaseDate").value;
  const popularity = parseFloat(document.getElementById("moviePopularity").value);

  let selectedGenres = Array.from(
    document.getElementById("movieGenres").selectedOptions
  ).map(o => parseInt(o.value));

  // si no seleccionan nada -> género desconocido
  if (selectedGenres.length === 0) {
    const unknown = CMDBLogic.getGenres()
      .find(g => g.name.toLowerCase() === "género desconocido");
    if (unknown) selectedGenres = [unknown.id];
  }

  const id = idStr ? parseInt(idStr) : null;

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

function deleteMovie() {
  const idStr = document.getElementById("movieId").value.trim();
  if (!idStr) {
    alert("Selecciona una película primero.");
    return;
  }

  const id = parseInt(idStr);
  const res = CMDBLogic.deleteMovieLogic(id);

  if (!res.ok) {
    alert(res.msg);
    return;
  }

  clearMovieForm();
  listMovies(false);
}

function clearMovieForm() {
  document.getElementById("movieId").value = "";
  document.getElementById("movieTitle").value = "";
  document.getElementById("movieReleaseDate").value = "";
  document.getElementById("moviePopularity").value = "";
  document.getElementById("movieGenres").selectedIndex = -1;
}

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

function listMovies(withVotes = false) {
  const table = document.getElementById("moviesTable");
  if (!table) return;

  const movies = CMDBLogic.getMovies();
  const genres = CMDBLogic.getGenres();
  table.innerHTML = "";

  // marca modo para saber si es listado votar
  table.dataset.mode = withVotes ? "votes" : "crud";

  movies.forEach(movie => {
    const movieGenres = movie.genres
      .map(gid => genres.find(g => g.id === gid)?.name)
      .filter(Boolean)
      .join(", ");

    const tr = document.createElement("tr");
    tr.dataset.id = movie.id;

    if (withVotes) {
      tr.innerHTML = `
        <td>${movie.id}</td>
        <td>${movie.title}</td>
        <td>${movie.releaseDate || "-"}</td>
        <td>${movie.popularity ?? "-"}</td>
        <td>${movie.score || "0.00"}</td>
        <td>${movie.votes || 0}</td>
        <td>${movieGenres || "-"}</td>
        <td>
          <input type="number" min="1" max="10" step="1" id="rating-${movie.id}">
          <button type="button" class="btn-rate-movie">Votar</button>
        </td>
      `;
    } else {
      tr.innerHTML = `
        <td>${movie.id}</td>
        <td>${movie.title}</td>
        <td>${movie.releaseDate || "-"}</td>
        <td>${movie.popularity ?? "-"}</td>
        <td>${movieGenres || "-"}</td>
      `;
    }

    table.appendChild(tr);
  });
}

/* ============================ LISTADO (VOTAR) ============================ */

function initListadoPage() {
  const tableBody = document.getElementById("moviesTable");

  // Delegación para botón votar
  tableBody.addEventListener("click", (e) => {
    if (!e.target.classList.contains("btn-rate-movie")) return;

    const tr = e.target.closest("tr");
    if (!tr) return;

    const id = parseInt(tr.dataset.id);
    rateMovie(id);
  });

  listMovies(true);
}

function rateMovie(id) {
  const input = document.getElementById(`rating-${id}`);
  const rating = parseInt(input.value);

  const res = CMDBLogic.rateMovieLogic(id, rating);
  if (!res.ok) {
    alert(res.msg);
    return;
  }

  listMovies(true);
  input.value = "";
}
