import {
  getMovieById,
  getMovies,
  getMovieByMinimumRating,
  getMovieByMinimumYear
} from "./db";

export const home = (req, res) => {
  const all_movies = getMovies();
  console.log("home!");
  return res.render("home", { pageTitle: "Movies!", all_movies });
};
export const movieDetail = (req, res) => {
  const { id } = req.params;
  const each_movie = getMovieById(id);
  return res.render("detail", { pageTitle: "each_movie", each_movie });
};
export const filterMovie = (req, res) => {
  if(req.query.year){
    const movie_year = req.query.year;
    const movies = getMovieByMinimumYear(parseInt(movie_year));
    return res.render("filter", { pageTitle: `Searching by year: ${movie_year}!`, movies });
  }
  else if(req.query.rating){
    const movie_rate = req.query.rating;
    const movies = getMovieByMinimumRating(parseInt(movie_rate));
    return res.render("filter", { pageTitle: `Searching by rating: ${movie_rate}!`, movies });
  }
  
};

