const mongoose = require('mongoose');

const MaxSIdSchema = new mongoose.Schema(
  {
    maxid: Number,

  },
  { versionKey: false }
);

const MaxSId = mongoose.model('maxSId', MaxSIdSchema);

module.exports = MaxSId;