const MovieModel = require("../models/MovieModel");

const getAllMovies = async () => {
  const movies = await MovieModel.find({});
  return movies;
};

const putMoviesInDB = async (movies) => {
  movies.forEach(async (m) => {
    const newMovie = {
      id: m.id,
      name: m.name,
      Genres: m.genres,
      ImageUrl: m.image ? m.image.medium : null,
      premiered: new Date(Date.parse(m.premiered))
    };

    const finalMovie = new MovieModel(newMovie);
    await finalMovie.save();
  });
};

module.exports = { getAllMovies, putMoviesInDB };
