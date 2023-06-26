const GenresModel = require("../models/GenresModel");

const getAllGenres = async () => {
  const genres = await GenresModel.find({});
  return genres;
};

module.exports = { getAllGenres };
