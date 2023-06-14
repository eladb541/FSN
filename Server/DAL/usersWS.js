const axios = require('axios');

const url = 'https://jsonplaceholder.typicode.com/users';

const getAllUsers = () => axios.get(url);

const getUserByIdWS = (userId) => axios.get(`${url}/${userId}`);


module.exports = { getAllUsers,getUserByIdWS };