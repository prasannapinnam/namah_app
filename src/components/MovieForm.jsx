import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import useForm from "../hooks/useForm";
import Joi from "joi-browser";
import { useState, useEffect } from "react";
import { getGenres } from "../services/fakeGenreService";
import { getMovie, saveMovie } from "./../services/fakeMovieService";

function MovieForm() {
  const params = useParams();
  const navigate = useNavigate();

  const [genres, setGenre] = useState([]);

  const schema = {
    _id: Joi.string(),
    title: Joi.string().required().label("Title"),
    genreId: Joi.string().required().label("Genre"),
    rating: Joi.number().min(1).max(5).required().label("Rating"),
    language: Joi.string().required().label("Language"),
  };

  const mapToViewModel = (movie) => {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      rating: movie.rating,
      language: movie.language,
    };
  };

  useEffect(() => {
    const genr = getGenres();
    setGenre(genr);

    const movieId = params.id;
    if (movieId === "new") return;

    const movie = getMovie(movieId);

    if (!movie) return navigate("/not-found", { replace: true });

    setData(mapToViewModel(movie));
  }, [params.id]);

  const doSubmit = () => {
    saveMovie(data);
    navigate("/movies");
  };

  const [handleSubmit, renderButton, renderInput, renderSelect, data, setData] =
    useForm(
      {
        title: "",
        genreId: "",
        rating: "",
        language: "",
      },
      schema,
      doSubmit
    );

  return (
    <div>
      <h1>Movie Form</h1>
      <form onSubmit={handleSubmit} style={{ padding: "0 20% 0 20%" }}>
        {renderInput("title", "Title")}
        {renderSelect("genreId", "Genre", genres)}
        {renderInput("rating", "Rating")}
        {renderInput("language", "Language")}
        {renderButton("Save")}
      </form>
    </div>
  );
}

export default MovieForm;
