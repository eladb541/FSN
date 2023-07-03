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

// POST - Create
const addmovie = async (obj) => {
  const movie = new MovieModel(obj);
  await movie.save();
  return "created";
};

const deleteMovie = async (externalId) => {
  await MovieModel.deleteOne({ _id: externalId });
  return 'Deleted!';
};


const UpdateMovie = async (externalId, obj) => {
  await MovieModel.updateOne({_id: externalId }, obj);

  return 'Updated!';
};



module.exports = { getAllMovies, putMoviesInDB, addmovie,deleteMovie,UpdateMovie};
