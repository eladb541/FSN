const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    username: String,
    password: String,
    sessionTO:Number,
    CreatedAt:Date,
    email:String
  },
  { versionKey: false }
);

const User = mongoose.model('user', userSchema);

module.exports = User;