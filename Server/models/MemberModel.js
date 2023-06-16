const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema(
  {
    fullname: String,
    email: String,
    city:String,
  

    
  },
  { versionKey: false }
);

const Member = mongoose.model('member', memberSchema);

module.exports = Member;