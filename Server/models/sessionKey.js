const mongoose = require('mongoose');

const sessionKSchema = new mongoose.Schema(
  {
    key: String,

  },
  { versionKey: false }
);

const SK = mongoose.model('SessionK', sessionKSchema);

module.exports = SK;