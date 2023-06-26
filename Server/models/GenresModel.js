const mongoose = require('mongoose');

const GenresSchema = new mongoose.Schema(
  {
    Genres: [String]

  },
  { versionKey: false }
);

const Genre = mongoose.model('genre', GenresSchema);

module.exports = Genre;