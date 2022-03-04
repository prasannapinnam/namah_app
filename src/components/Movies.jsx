import React, { useState, useEffect, Fragment } from "react";
import { getMovies } from "./../services/fakeMovieService";
import Reels from "./../images/reels.jpg";
import Pagination from "../common/pagination";
import Paginate from "./../common/paginate";
import ListGroup from "../common/listgroup";
import { getGenres } from "./../services/fakeGenreService";
import MoviesTable from "./MoviesTable";
import _ from "lodash";
import { Link } from "react-router-dom";
import SearchBox from "../common/SearchBox";

function Movies() {
  const [Movies, setMovies] = useState([]);
  const [pageSize, setPageSize] = useState(4);
  const [currentPage, setCurrentPage] = useState(1);
  const [Genres, setGenres] = useState([]);
  const [currentGenre, setCurrentGenre] = useState(null);
  const [sortColumn, setSortColumn] = useState({ path: "title", order: "asc" });
  const [searchQuery, setSearchQuery] = useState("");

  const isAdmin = localStorage.getItem("isAdmin");
  console.log(isAdmin);

  useEffect(() => {
    const genres = [{ _id: "", name: "All Genres" }, ...getGenres()];
    setMovies(getMovies());
    setGenres(genres);
  }, []);

  const handleDelete = (movie) => {
    setMovies(Movies.filter((m) => m._id !== movie._id));
  };

  const handleLike = (m) => {
    const movies = [...Movies];
    const index = movies.indexOf(m);
    movies[index] = { ...Movies[index] };
    movies[index].liked = !movies[index].liked;

    setMovies(movies);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleGenreSelect = (genre) => {
    setCurrentGenre(genre);
    setCurrentPage(1);
    setSearchQuery("");
  };

  const handleSort = (sorte) => {
    setSortColumn(sorte);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentGenre(null);
    setCurrentPage(1);
  };

  let filteredMovies = Movies;
  if (searchQuery)
    filteredMovies = Movies.filter((m) =>
      m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
    );
  else if (currentGenre && currentGenre._id)
    filteredMovies = Movies.filter((m) => m.genre._id === currentGenre._id);

  //coverting movies to uppercase
  let UpperCaseMovies = _.clone(filteredMovies);
  UpperCaseMovies = UpperCaseMovies.map((movie) => {
    movie.title = movie.title.toUpperCase();
    return movie;
  });

  const sortedMovies = _.orderBy(
    UpperCaseMovies,
    [sortColumn.path],
    [sortColumn.order]
  );

  const paginatedMovies = Paginate(sortedMovies, currentPage, pageSize);

  return (
    <div
      style={{
        backgroundImage: `url(${Reels})`,
        position: "absolute",
        height: "100%",
        width: "100%",
      }}
    >
      <div className="row">
        <div className="col-3">
          <ListGroup
            items={Genres}
            onItemSelect={handleGenreSelect}
            selectedGenre={currentGenre}
          />
        </div>
        <div className="col">
          {Movies.length === 0 ? (
            <h1>there are no movies in DB</h1>
          ) : searchQuery ? null : (
            <h1>there are {filteredMovies.length} num of movies in DB</h1>
          )}
          <SearchBox value={searchQuery} onChange={handleSearch} />
          <MoviesTable
            onLike={handleLike}
            onDelete={handleDelete}
            paginatedMovies={paginatedMovies}
            onSort={handleSort}
            sortColumn={sortColumn}
          />
          <div className="row">
            <div className="col-3"></div>
            <Pagination
              onPageChange={handlePageChange}
              movieCount={filteredMovies.length}
              pageSize={pageSize}
              currentPage={currentPage}
            />
          </div>

          <div className="col">
            {isAdmin && (
              <Link
                style={{
                  float: "right",
                  marginRight: "200px",
                }}
                to="/movies/new"
                className="btn btn-primary"
              >
                New Movie
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Movies;
