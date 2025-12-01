/* ============================
   FUNCIONES EXISTENTES
============================ */

function computeScore(arr) {
    if (!arr || arr.length === 0) return 0;
    const sum = arr.reduce((a, b) => a + b, 0);
    return Math.round(sum / arr.length);
}

function initialGenres() {
    return [
        { id: 1, name: "Ciencia ficción" },
        { id: 2, name: "Aventura" },
        { id: 3, name: "Acción" }
    ];
}

function initialMovies() {
    return [
        {
            id: 1,
            title: "Star Wars: Episode IV - A New Hope",
            releaseDate: "1977-05-25",
            popularity: 95.3,
            ratings: [9,9,10,8,9],
            score: computeScore([9,9,10,8,9]),
            votes: 5,
            genres: [1,2]
        },
        {
            id: 2,
            title: "Star Wars: Episode V - The Empire Strikes Back",
            releaseDate: "1980-05-21",
            popularity: 94.7,
            ratings: [10,9,10,9,10,9],
            score: computeScore([10,9,10,9,10,9]),
            votes: 6,
            genres: [1,2]
        },
        {
            id: 3,
            title: "Star Wars: Episode VI - Return of the Jedi",
            releaseDate: "1983-05-25",
            popularity: 90.1,
            ratings: [8,9,8,9],
            score: computeScore([8,9,8,9]),
            votes: 4,
            genres: [1,2]
        },
        {
            id: 4,
            title: "Star Wars: Episode I - The Phantom Menace",
            releaseDate: "1999-05-19",
            popularity: 75.6,
            ratings: [6,7,6,7,6],
            score: computeScore([6,7,6,7,6]),
            votes: 5,
            genres: [1,3]
        },
        {
            id: 5,
            title: "Star Wars: Episode II - Attack of the Clones",
            releaseDate: "2002-05-16",
            popularity: 72.4,
            ratings: [6,6,7,6],
            score: computeScore([6,6,7,6]),
            votes: 4,
            genres: [1,3]
        }
    ];
}

function initCMDB() {
    if (!localStorage.getItem("cmdb_genres")) {
        localStorage.setItem("cmdb_genres", JSON.stringify(initialGenres()));
    }
    if (!localStorage.getItem("cmdb_movies")) {
        localStorage.setItem("cmdb_movies", JSON.stringify(initialMovies()));
    }
}

function getGenres() {
    return JSON.parse(localStorage.getItem("cmdb_genres") || "[]");
}

function saveGenres(g) {
    localStorage.setItem("cmdb_genres", JSON.stringify(g));
}

function getMovies() {
    return JSON.parse(localStorage.getItem("cmdb_movies") || "[]" );
}

function saveMovies(movies) {
    localStorage.setItem("cmdb_movies", JSON.stringify(movies));
}

/* ============================
   LISTAR PELÍCULAS
============================ */
function listMovies() {
    const table = document.getElementById("moviesTable");
    const movies = getMovies();
    const genres = getGenres();
    table.innerHTML = "";

    movies.forEach(movie => {
        const tr = document.createElement("tr");

        const genreNames = movie.genres
            .map(id => genres.find(g => g.id === id)?.name || "Desconocido")
            .join(", ");

        tr.innerHTML = `
            <td>${movie.title}</td>
            <td>${new Date(movie.releaseDate).toLocaleDateString("es-ES")}</td>
            <td>${movie.popularity}</td>
            <td>${movie.score}</td>
            <td>${movie.votes}</td>
            <td>${genreNames}</td>
            <td><button onclick="openVote(${movie.id}, '${movie.title.replace(/'/g, "\\'")}')">Votar</button></td>
        `;

        table.appendChild(tr);
    });
}

/* ============================
   POPUP DE VOTACIÓN
============================ */

let selectedMovie = null;

function openVote(id, title) {
    selectedMovie = id;
    document.getElementById("popupTitle").innerText = title;
    document.getElementById("votingPopup").style.display = "block";
}

document.getElementById("closePopup").addEventListener("click", () => {
    document.getElementById("votingPopup").style.display = "none";
});

document.getElementById("sendVote").addEventListener("click", () => {
    const value = parseInt(document.getElementById("ratingValue").value);

    if (voteMovie(selectedMovie, value)) {
        listMovies();
        document.getElementById("votingPopup").style.display = "none";
        document.getElementById("ratingValue").value = "";
    }
});

function voteMovie(movieId, rating) {
    if (!Number.isInteger(rating) || rating < 0 || rating > 10) {
        alert("La puntuación debe ser un entero entre 0 y 10.");
        return null;
    }

    const movies = getMovies();
    const idx = movies.findIndex(m => m.id === movieId);
    if (idx === -1) return null;

    movies[idx].ratings.push(rating);
    movies[idx].votes = movies[idx].ratings.length;
    movies[idx].score = computeScore(movies[idx].ratings);

    saveMovies(movies);
    return movies[idx];
}

/* ============================
   GESTIÓN DE GÉNEROS
============================ */

function listGenres() {
    const tbody = document.getElementById("genresTable");
    const genres = getGenres();
    tbody.innerHTML = "";

    genres.forEach(g => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${g.id}</td>
            <td>${g.name}</td>
        `;
        tr.addEventListener("click", () => selectGenre(g));
        tbody.appendChild(tr);
    });
}

function selectGenre(g) {
    document.getElementById("genreId").value = g.id;
    document.getElementById("genreName").value = g.name;
}

document.getElementById("newGenre").addEventListener("click", () => {
    document.getElementById("genreId").value = "";
    document.getElementById("genreName").value = "";
});

document.getElementById("genreForm").addEventListener("submit", (e) => {
    e.preventDefault();

    const id = document.getElementById("genreId").value;
    const name = document.getElementById("genreName").value.trim();
    let genres = getGenres();

    if (name.length === 0) {
        alert("El nombre no puede estar vacío.");
        return;
    }

    if (name.length > 30) {
        alert("El nombre no puede superar los 30 caracteres.");
        return;
    }

    if (!id) {
        const newId = genres.length > 0 ?
            Math.max(...genres.map(g => g.id)) + 1 : 1;
        genres.push({ id: newId, name });
    } else {
        const idx = genres.findIndex(g => g.id == id);
        genres[idx].name = name;
    }

    saveGenres(genres);
    listGenres();
});

document.getElementById("deleteGenre").addEventListener("click", () => {
    const id = parseInt(document.getElementById("genreId").value);

    if (!id) {
        alert("Selecciona un género.");
        return;
    }

    const movies = getMovies();
    const used = movies.some(m => m.genres.includes(id));

    if (used) {
        alert("No se puede eliminar este género porque está asociado a películas.");
        return;
    }

    let genres = getGenres();
    genres = genres.filter(g => g.id !== id);

    saveGenres(genres);
    listGenres();
    document.getElementById("genreForm").reset();
});

/* ============================
   INICIAR APP
============================ */
initCMDB();
listGenres();
listMovies();
