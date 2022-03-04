import * as genresAPI from "./fakeGenreService";

const movies = [
  {
    _id: "5b21ca3eeb7f6fbccd471815",
    title: "Akhanda",
    genre: { _id: "5b21ca3eeb7f6fbccd471818", name: "Action" },
    rating: 3.5,
    language: "Telugu",
    publishDate: "2018-01-03T19:04:28.809Z",
    liked:true
  },
  {
    _id: "5b21ca3eeb7f6fbccd471816",
    title: "Bahubali",
    genre: { _id: "5b21ca3eeb7f6fbccd471818", name: "Action" },
    rating: 5,
    language: "Multi-lingual"
  },
  {
    _id: "5b21ca3eeb7f6fbccd471817",
    title: "Shyam singha roy",
    genre: { _id: "5b21ca3eeb7f6fbccd471820", name: "Thriller" },
    rating: 4,
    language: "Multi-lingual"
  },
  {
    _id: "5b21ca3eeb7f6fbccd471819",
    title: "Atrangi re",
    genre: { _id: "5b21ca3eeb7f6fbccd471814", name: "Comedy" },
    rating: 4,
    language: "Hindi"
  },
  {
    _id: "5b21ca3eeb7f6fbccd47181a",
    title: "F3",
    genre: { _id: "5b21ca3eeb7f6fbccd471814", name: "Comedy" },
    rating: 4.5,
    language: "Telugu"
  },
  {
    _id: "5b21ca3eeb7f6fbccd47181b",
    title: "Bangaraju",
    genre: { _id: "5b21ca3eeb7f6fbccd471814", name: "Comedy" },
    rating: 4,
    language: "Telugu",
    liked:true
  },
  {
    _id: "5b21ca3eeb7f6fbccd47181e",
    title: "Marakkar",
    genre: { _id: "5b21ca3eeb7f6fbccd471820", name: "Thriller" },
    rating: 3,
    language: "Malayalam"
  },
  {
    _id: "5b21ca3eeb7f6fbccd47181f",
    title: "KGF2",
    genre: { _id: "5b21ca3eeb7f6fbccd471820", name: "Thriller" },
    rating: 4.5,
    language: "Kannada"
  },
  {
    _id: "5b21ca3eeb7f6fbccd471821",
    title: "The Avengers",
    genre: { _id: "5b21ca3eeb7f6fbccd471818", name: "Action" },
    rating: 5,
    language: "English"
  }
];

export function getMovies() {
  return movies;
}

export function getMovie(id) {
  return movies.find(m => m._id === id);
}

export function saveMovie(movie) {
  let movieInDb = movies.find(m => m._id === movie._id) || {};
  movieInDb.title = movie.title;
  movieInDb.genre = genresAPI.genres.find(g => g._id === movie.genreId);
  movieInDb.rating = movie.rating;
  movieInDb.language = movie.language;

  if (!movieInDb._id) {
    movieInDb._id = Date.now().toString();
    movies.push(movieInDb);
  }

  return movieInDb;
}

export function deleteMovie(id) {
  let movieInDb = movies.find(m => m._id === id);
  movies.splice(movies.indexOf(movieInDb), 1);
  return movieInDb;
}
