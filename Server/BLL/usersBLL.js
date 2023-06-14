const { getAllUsers: getAllUsersWS,getUserByIdWS } = require('../DAL/usersWS');
const { getAllPersons,getPersonById } = require('../DAL/usersFile');
const User = require('../models/userModel');

const getAllUsers = async () => {
  const usersData = [];

  const { data: usersWeb } = await getAllUsersWS();
  const personss = await getAllPersons();

  const usersDB = await User.find({});
  console.log(personss)
  
  personss.forEach((per) => {
    const obj = {
      id: per.id,
      phone: per.phone,
    };
  
    const userWeb = usersWeb.find((user) => user.id === obj.id);
    if (userWeb) {
      obj.name = userWeb.name;
      obj.email = userWeb.email;
    }
  
    const userDB = usersDB.find((user) => user.externalId === obj.id);
    if (userDB) {
      obj.address = {
        city: userDB.city,
        country: userDB.country,
      };
    }
  
    usersData.push(obj);
  });
  
console.log("===")
console.log(usersData)
  return usersData;
}

const getUserById = async (userId) => {
  const user = {};

  const { data: userWeb } = await getUserByIdWS(userId);
  const person = await getPersonById(userId);

  const userDB = await User.findOne({ externalId: userId });

  user.id = person.id;
  user.phone = person.phone;

  if (userWeb) {
    user.name = userWeb.name;
    user.email = userWeb.email;
  }

  if (userDB) {
    user.address = {
      city: userDB.city,
      country: userDB.country,
    };
  }

  return user;
};
// POST - Create
const addUser = async (obj) => {
  const user = new User(obj);
  await user.save();
  return "created";
};

// PUT - Update
const updateuser = async (externalId, obj) => {
  await User.updateOne({ externalId }, obj);
  return 'Updated!';
};
// DELETE - Delete

const deleteUser = async (externalId) => {
  await User.deleteOne({ externalId: externalId });
  return 'Deleted!';
};











;

module.exports = { getAllUsers, getUserById ,addUser,updateuser,deleteUser};
