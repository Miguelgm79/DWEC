
const GENRES_KEY = "genres";
const MOVIES_KEY = "movies";
const OLD_GENRES_KEY = "cmdb_genres";
const OLD_MOVIES_KEY = "cmdb_movies";

/**
 * Migración: si hay datos en cmdb_* y no en claves originales,
 * los copia a las claves originales.
 */
function migrateOldKeysIfNeeded() {
  const oldGenres = JSON.parse(localStorage.getItem(OLD_GENRES_KEY) || "null");
  const oldMovies = JSON.parse(localStorage.getItem(OLD_MOVIES_KEY) || "null");

  const currentGenres = JSON.parse(localStorage.getItem(GENRES_KEY) || "null");
  const currentMovies = JSON.parse(localStorage.getItem(MOVIES_KEY) || "null");

  if (!currentGenres && oldGenres) {
    localStorage.setItem(GENRES_KEY, JSON.stringify(oldGenres));
  }
  if (!currentMovies && oldMovies) {
    localStorage.setItem(MOVIES_KEY, JSON.stringify(oldMovies));
  }
}

/**
 * Recupera el array de géneros desde LocalStorage.
 * @returns {{id:number, name:string}[]} lista de géneros
 */
function getGenres() {
  migrateOldKeysIfNeeded();
  return JSON.parse(localStorage.getItem(GENRES_KEY)) || [];
}

/**
 * Guarda el array de géneros en LocalStorage.
 * @param {{id:number, name:string}[]} genres
 */
function saveGenres(genres) {
  localStorage.setItem(GENRES_KEY, JSON.stringify(genres));
}

/**
 * Recupera el array de películas desde LocalStorage.
 * @returns {Array} lista de películas
 */
function getMovies() {
  migrateOldKeysIfNeeded();
  return JSON.parse(localStorage.getItem(MOVIES_KEY)) || [];
}

/**
 * Guarda el array de películas en LocalStorage.
 * @param {Array} movies
 */
function saveMovies(movies) {
  localStorage.setItem(MOVIES_KEY, JSON.stringify(movies));
}

/**
 * Asegura que existe el género "género desconocido".
 * Si no existe, lo crea con id autoincremental.
 */
function ensureUnknownGenre() {
  const genres = getGenres();
  const exists = genres.some(g => g.name.toLowerCase() === "género desconocido");
  if (!exists) {
    const newId = genres.length ? Math.max(...genres.map(g => g.id)) + 1 : 1;
    genres.push({ id: newId, name: "género desconocido" });
    saveGenres(genres);
  }
}

/**
 * Añade un género nuevo o actualiza uno existente.
 * @param {string} name
 * @param {number|null} idEditing
 * @returns {{ok:boolean, msg?:string}}
 */
function addOrUpdateGenreLogic(name, idEditing = null) {
  const cleanName = name.trim();
  if (!cleanName) return { ok: false, msg: "El género no puede estar vacío." };

  const genres = getGenres();

  // Duplicados (permitiendo el mismo si es el que editas)
  const dup = genres.some(g =>
    g.name.toLowerCase() === cleanName.toLowerCase() &&
    g.id !== idEditing
  );
  if (dup) return { ok: false, msg: "Ese género ya existe." };

  if (idEditing == null) {
    const newId = genres.length ? Math.max(...genres.map(g => g.id)) + 1 : 1;
    genres.push({ id: newId, name: cleanName });
  } else {
    const idx = genres.findIndex(g => g.id === idEditing);
    if (idx === -1) return { ok: false, msg: "Género no encontrado." };
    genres[idx].name = cleanName;
  }

  saveGenres(genres);
  return { ok: true };
}

/**
 * Elimina un género SOLO si no está asociado a películas.
 * @param {number} id
 * @returns {{ok:boolean, msg?:string}}
 */
function deleteGenreLogic(id) {
  const movies = getMovies();
  const usedInMovies = movies.some(m => m.genres.includes(id));

  if (usedInMovies) {
    return {
      ok: false,
      msg: "No puedes eliminar este género: hay películas que lo usan. Primero quítalo en esas películas."
    };
  }

  const genres = getGenres().filter(g => g.id !== id);
  saveGenres(genres);
  return { ok: true };
}

/**
 * Valida datos de una película según criterios.
 * @param {{id:number|null,title:string,releaseDate:string,popularity:number,genres:number[]}} movie
 * @returns {string|null} error o null si ok
 */
function validateMovieInput(movie) {
  const { id, title, releaseDate, popularity, genres } = movie;

  if (id !== null && !Number.isInteger(id)) {
    return "El ID debe ser entero.";
  }

  if (!title || title.trim().length < 1 || title.trim().length > 100) {
    return "El título debe tener entre 1 y 100 caracteres.";
  }

  if (releaseDate) {
    const date = new Date(releaseDate);
    const minDate = new Date("1900-01-01");
    const today = new Date();
    if (Number.isNaN(date.getTime()) || date < minDate || date > today) {
      return "La fecha de estreno debe ser válida (entre 1900 y hoy).";
    }
  }

  if (Number.isNaN(popularity) || popularity < 0 || popularity > 100) {
    return "La popularidad debe estar entre 0 y 100.";
  }

  // géneros deben existir
  const allGenres = getGenres().map(g => g.id);
  const invalid = genres.some(gid => !allGenres.includes(gid));
  if (invalid) return "Hay géneros seleccionados que no existen.";

  return null;
}

/**
 * Guarda película nueva o actualiza existente.
 * @param {{id:number|null,title:string,releaseDate:string,popularity:number,genres:number[]}} data
 * @returns {{ok:boolean,msg?:string}}
 */
function saveOrUpdateMovieLogic(data) {
  const movies = getMovies();

  const err = validateMovieInput(data);
  if (err) return { ok: false, msg: err };

  if (data.id == null) {
    const newId = movies.length ? Math.max(...movies.map(m => m.id)) + 1 : 1;
    movies.push({
      id: newId,
      title: data.title.trim(),
      releaseDate: data.releaseDate,
      popularity: data.popularity,
      genres: data.genres,
      ratings: [],
      votes: 0,
      score: "0.00"
    });
  } else {
    const idx = movies.findIndex(m => m.id === data.id);
    if (idx === -1) return { ok: false, msg: "Película no encontrada." };

    movies[idx].title = data.title.trim();
    movies[idx].releaseDate = data.releaseDate;
    movies[idx].popularity = data.popularity;
    movies[idx].genres = data.genres;
  }

  saveMovies(movies);
  return { ok: true };
}

/**
 * Elimina película por id.
 * @param {number} id
 * @returns {{ok:boolean,msg?:string}}
 */
function deleteMovieLogic(id) {
  const movies = getMovies();
  const exists = movies.some(m => m.id === id);
  if (!exists) return { ok: false, msg: "No existe esa película." };

  saveMovies(movies.filter(m => m.id !== id));
  return { ok: true };
}

/**
 * Añade una valoración a una película y recalcula score/votos.
 * @param {number} id
 * @param {number} rating (1..10 entero)
 * @returns {{ok:boolean,msg?:string}}
 */
function rateMovieLogic(id, rating) {
  const movies = getMovies();
  const movie = movies.find(m => m.id === id);
  if (!movie) return { ok: false, msg: "Película no encontrada." };

  if (!Number.isInteger(rating) || rating < 1 || rating > 10) {
    return { ok: false, msg: "La valoración debe ser un entero entre 1 y 10." };
  }

  movie.ratings.push(rating);
  movie.votes = movie.ratings.length;
  movie.score = (
    movie.ratings.reduce((a, b) => a + b, 0) / movie.votes
  ).toFixed(2);

  saveMovies(movies);
  return { ok: true };
}

/* Exponemos en window para uso desde app.js / onclick */
window.CMDBLogic = {
  getGenres, saveGenres,
  getMovies, saveMovies,
  ensureUnknownGenre,
  addOrUpdateGenreLogic,
  deleteGenreLogic,
  saveOrUpdateMovieLogic,
  deleteMovieLogic,
  rateMovieLogic
};
