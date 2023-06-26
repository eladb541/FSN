const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema(
  {
    id: Number,
    name: String,
    Genres: [String],
    ImageUrl:String,
    premiered:Date

    
  },
  { versionKey: false }
);

const Movie = mongoose.model('movie', movieSchema);

module.exports = Movie;