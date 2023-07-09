const mongoose = require('mongoose');

const subscribeSchema = new mongoose.Schema(
  {
    
    membername: String,
    memberid: String,
    moviename:String,
    movieid:String,
    datemovie:Date,
    craetedaAt:Date

    
  },
  { versionKey: false }
);

const Subscribe = mongoose.model('subscribe', subscribeSchema);

module.exports = Subscribe;