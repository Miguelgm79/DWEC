/* ============================
   LOCAL STORAGE HELPERS
============================ */

function getGenres() {
  return JSON.parse(localStorage.getItem("cmdb_genres")) || [];
}

function saveGenres(genres) {
  localStorage.setItem("cmdb_genres", JSON.stringify(genres));
}

function getMovies() {
  return JSON.parse(localStorage.getItem("cmdb_movies")) || [];
}

function saveMovies(movies) {
  localStorage.setItem("cmdb_movies", JSON.stringify(movies));
}

/* ============================
   INIT POR PÁGINA
============================ */

document.addEventListener("DOMContentLoaded", () => {
  const path = location.pathname.toLowerCase();

  if (path.includes("generos.html")) initGenresPage();
  if (path.includes("peliculas.html")) initMoviesCrudPage();
  if (path.includes("listado.html")) initMoviesListPage();
});

/* ============================
   GÉNEROS (CRUD simple)
============================ */

function initGenresPage() {
  listGenres();

  const form = document.getElementById("genreForm");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    addGenre();
  });
}

function addGenre() {
  const nameInput = document.getElementById("genreName");
  const name = nameInput.value.trim();

  if (!name) return;

  const genres = getGenres();

  if (genres.some(g => g.name.toLowerCase() === name.toLowerCase())) {
    alert("Ese género ya existe.");
    return;
  }

  const newId = genres.length ? Math.max(...genres.map(g => g.id)) + 1 : 1;

  genres.push({ id: newId, name });
  saveGenres(genres);

  nameInput.value = "";
  listGenres();
}

function deleteGenre(id) {
  let genres = getGenres();
  genres = genres.filter(g => g.id !== id);
  saveGenres(genres);

  // También eliminamos ese género de las pelis (si lo tienen)
  let movies = getMovies();
  movies.forEach(m => {
    m.genres = m.genres.filter(gid => gid !== id);
  });
  saveMovies(movies);

  listGenres();
  listMovies(); // por si estamos en pelis
}

function listGenres() {
  const table = document.getElementById("genresTable");
  if (!table) return;

  const genres = getGenres();
  table.innerHTML = "";

  genres.forEach(g => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${g.id}</td>
      <td>${g.name}</td>
      <td><button onclick="deleteGenre(${g.id})">Eliminar</button></td>
    `;
    table.appendChild(tr);
  });

  // refresca selector de géneros en películas
  fillGenresSelect();
}

/* ============================
   PELÍCULAS (CRUD + VALIDACIONES)
============================ */

function initMoviesCrudPage() {
  fillGenresSelect();
  listMovies(false);

  document.getElementById("newMovie").addEventListener("click", () => {
    document.getElementById("movieForm").reset();
    document.getElementById("movieId").value = "";
  });

  document.getElementById("movieForm").addEventListener("submit", (e) => {
    e.preventDefault();
    saveOrUpdateMovie();
  });

  document.getElementById("deleteMovie").addEventListener("click", deleteMovie);
}

function fillGenresSelect() {
  const select = document.getElementById("movieGenres");
  if (!select) return;

  const genres = getGenres();
  select.innerHTML = "";

  genres.forEach(g => {
    const opt = document.createElement("option");
    opt.value = g.id;
    opt.textContent = g.name;
    select.appendChild(opt);
  });
}

function selectMovie(movie) {
  document.getElementById("movieId").value = movie.id;
  document.getElementById("movieTitle").value = movie.title;
  document.getElementById("movieReleaseDate").value = movie.releaseDate;
  document.getElementById("moviePopularity").value = movie.popularity;

  const select = document.getElementById("movieGenres");
  Array.from(select.options).forEach(opt => {
    opt.selected = movie.genres.includes(parseInt(opt.value));
  });
}

// a–e
function validateMovieInput({ id, title, releaseDate, popularity, genres }) {
  const allGenres = getGenres();

  // a) ID numérico válido (y no modificable -> disabled)
  if (id != null && (!Number.isInteger(id) || id <= 0)) {
    return "El identificador debe ser un entero positivo.";
  }

  // b) tipos y tamaños
  if (typeof title !== "string" || title.trim().length === 0) {
    return "El título no puede estar vacío.";
  }
  if (title.length > 100) {
    return "El título no puede superar los 100 caracteres.";
  }
  if (typeof popularity !== "number" || Number.isNaN(popularity)) {
    return "La popularidad debe ser numérica.";
  }

  // c) fecha entre 01/01/1900 y hoy
  const minDate = new Date("1900-01-01");
  const relDate = new Date(releaseDate);
  const today = new Date();
  today.setHours(0,0,0,0);

  if (Number.isNaN(relDate.getTime())) {
    return "La fecha de estreno no es válida.";
  }
  if (relDate < minDate) {
    return "La fecha de estreno no puede ser anterior al 01/01/1900.";
  }
  if (relDate > today) {
    return "La fecha de estreno no puede ser posterior a hoy.";
  }

  // d) popularidad 0..100
  if (popularity < 0 || popularity > 100) {
    return "La popularidad debe estar entre 0 y 100.";
  }

  // e) géneros existentes
  const validGenreIds = new Set(allGenres.map(g => g.id));
  if (!Array.isArray(genres) || genres.length === 0) {
    return "Debes seleccionar al menos un género.";
  }
  const invalid = genres.filter(gid => !validGenreIds.has(gid));
  if (invalid.length > 0) {
    return "Has seleccionado géneros que no existen en el sistema.";
  }

  return null;
}

function saveOrUpdateMovie() {
  const movies = getMovies();

  const idStr = document.getElementById("movieId").value;
  const title = document.getElementById("movieTitle").value.trim();
  const releaseDate = document.getElementById("movieReleaseDate").value;
  const popularity = parseFloat(document.getElementById("moviePopularity").value);

  const selectedGenres = Array.from(
    document.getElementById("movieGenres").selectedOptions
  ).map(o => parseInt(o.value));

  let id = idStr ? parseInt(idStr) : null;

  const err = validateMovieInput({ id, title, releaseDate, popularity, genres: selectedGenres });
  if (err) { alert(err); return; }

  if (!id) {
    const newId = movies.length ? Math.max(...movies.map(m => m.id)) + 1 : 1;

    movies.push({
      id: newId,
      title,
      releaseDate,
      popularity,
      ratings: [],
      score: 0,
      votes: 0,
      genres: selectedGenres
    });
  } else {
    const idx = movies.findIndex(m => m.id === id);
    if (idx === -1) { alert("La película no existe."); return; }

    movies[idx].title = title;
    movies[idx].releaseDate = releaseDate;
    movies[idx].popularity = popularity;
    movies[idx].genres = selectedGenres;
  }

  saveMovies(movies);
  listMovies(false);
  document.getElementById("movieForm").reset();
  document.getElementById("movieId").value = "";
}

function deleteMovie() {
  const id = parseInt(document.getElementById("movieId").value);

  if (!id) {
    alert("Selecciona una película.");
    return;
  }

  let movies = getMovies().filter(m => m.id !== id);
  saveMovies(movies);
  listMovies(false);

  document.getElementById("movieForm").reset();
  document.getElementById("movieId").value = "";
}

/* ============================
   LISTADO + VOTAR
============================ */

function initMoviesListPage() {
  listMovies(true);
}

function listMovies(withVotes = false) {
  const table = document.getElementById("moviesTable");
  if (!table) return;

  const movies = getMovies();
  const genres = getGenres();
  table.innerHTML = "";

  movies.forEach(movie => {
    const tr = document.createElement("tr");

    const movieGenres = movie.genres
      .map(id => genres.find(g => g.id === id)?.name)
      .filter(Boolean)
      .join(", ");

    tr.innerHTML = `
      <td>${movie.id}</td>
      <td>${movie.title}</td>
      <td>${movie.releaseDate || "-"}</td>
      <td>${movie.popularity ?? "-"}</td>
      <td>${movie.score || 0}</td>
      ${withVotes ? `
        <td>
          <input type="number" min="1" max="10" step="0.1" id="rating-${movie.id}">
          <button onclick="rateMovie(${movie.id})">Votar</button>
        </td>
      ` : `<td>${movieGenres || "-"}</td>`}
    `;

    // En CRUD: click en fila para editar
    if (!withVotes) {
      tr.addEventListener("click", () => selectMovie(movie));
    }

    table.appendChild(tr);
  });
}

function rateMovie(id) {
  const movies = getMovies();
  const movie = movies.find(m => m.id === id);
  if (!movie) return;

  const input = document.getElementById(`rating-${id}`);
  const rating = parseFloat(input.value);

  if (Number.isNaN(rating) || rating < 1 || rating > 10) {
    alert("La valoración debe estar entre 1 y 10.");
    return;
  }

  movie.ratings.push(rating);
  movie.votes = movie.ratings.length;
  movie.score = (movie.ratings.reduce((a,b)=>a+b,0) / movie.votes).toFixed(2);

  saveMovies(movies);
  listMovies(true);

  input.value = "";
}
