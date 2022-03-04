import React from "react";
import Like from "../common/Like";
import { Link } from "react-router-dom";
import Table from "../common/Table";

function MoviesTable({
  paginatedMovies,
  onLike,
  onDelete,
  onSort,
  sortColumn,
}) {
  const isAdmin = localStorage.getItem("isAdmin");

  const columns = [
    {
      path: "title",
      label: "Title",
      content: (movie) => (
        <Link to={`/movies/${movie._id}`}> {movie.title} </Link>
      ),
    },
    { path: "genre.name", label: "Genre" },
    { path: "rating", label: "Rating" },
    { path: "language", label: "Language" },
    {
      key: "like",
      content: (movie) => (
        <Like isLiked={movie.liked} onLike={() => onLike(movie)} />
      ),
    },
  ];

  const deleteColumn = {
    key: "delete",
    content: (movie) => (
      <button onClick={() => onDelete(movie)} className="btn btn-danger btn-sm">
        Delete
      </button>
    ),
  };

  if (isAdmin) {
    columns.push(deleteColumn);
  }

  return (
    <Table
      columns={columns}
      sortColumn={sortColumn}
      onSort={onSort}
      paginatedMovies={paginatedMovies}
    />
  );
}

export default MoviesTable;
