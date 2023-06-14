const mongoose = require('mongoose');

const connectDB = () => {
  mongoose
    .connect('mongodb://127.0.0.1:27017/userDB')
    .then(() => console.log('Connected to usersDB!'))
    .catch((error) => console.log(error));
};

const keyDB = () => {
  mongoose
    .connect('mongodb://127.0.0.1:27017/SessionK')
    .then(() => console.log('Connected to SessionK!'))
    .catch((error) => console.log(error));
};


module.exports = { connectDB,keyDB };