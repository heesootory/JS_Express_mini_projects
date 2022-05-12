import { getMovieById, getMovies, addMovie } from "./db";

export const home = (req, res) =>
  res.render("movies", { movies: getMovies(), pageTitle: "Movies!" });

export const movieDetail = (req, res) => {
  const { params: { id } } = req;
  const movie = getMovieById(id);
  if (!movie) { res.render("404", { pageTitle: "Movie not found" }); }
  return res.render("detail", { movie });
};

export const getUpload = (req, res) =>{
  return res.render("add", {pageTitle: "Add Movie"});
}

export const postUpload = (req, res) =>{
  const {title} = req.body;
  const{ synopsis } = req.body;
  const{ genre } = req.body;
  const genreArray = genre.split(',');
  const newMovie = {
    title,
    synopsis,
    genres: genreArray,
  }
  addMovie(newMovie);
  return res.redirect("/");
}
/*
Write the controller or controllers you need to render the form
and to handle the submission
*/
