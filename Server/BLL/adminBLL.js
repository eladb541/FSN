const { getAllPersonsN, getPersonByIdN, getPersonNamesById,addnamesToJSONP,deleteNameByIdP } = require('../DAL/namesFile');
const { getAllPersonsP, getPersonByIdP, getPersonPermmisionsById , addPersonToJSONP,deletePersonByIdP,updateMemberPermissionsById} = require('../DAL/usersFile');
const User = require('../models/userModel');


const getAllUsers = async () => {
  try {
    const usersData = [];

    const names = await getAllPersonsN();
    const permissions = await getAllPersonsP();

    const usersDB = await User.find({});

    usersDB.forEach((userDB) => {
      const person = names.persons.find((per) => per.id === userDB._id.toString());
     
      const userPermissions = permissions.persons.find((per) => per.id === userDB._id.toString());

      const user = {
        _id:userDB._id,
        username: userDB.username,
        password: userDB.password,
        sessionTO: userDB.sessionTO,
        CreatedAt: userDB.CreatedAt,
        email: userDB.email,
        name: person ? person.name : '',
        permissions: userPermissions ? userPermissions.permissions : {},
      };

      usersData.push(user);
    });

    return usersData;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch users');
  }
};


const getOne = async (username) => {
  try {
    const member = await User.findOne({ username: username });
    return member;
  } catch (error) {
    console.error(error);
    return null;
  }
};


const getid = async (username) => {
  try {
    const member = await User.findOne({ username: username });
    return member._id;
  } catch (error) {
    console.error(error,"didnt succeed return id");
    return null;
  }
};




const adduser = async (obj) => {
  try {
    const member = new User(obj.db);
    const username = obj.db.username;
    await member.save();
    const Rid = getid(username);
    return Rid;
  } catch (error) {
    console.error(error, "didnt succeed create  user");
  }
};


const addper = async (obj) => {
  try {
    const per = await  addPersonToJSONP(obj);
    return per;
  } catch (error) {
    console.error(error);
  }
};

const addname = async (obj) => {
  try {
    const name = await addnamesToJSONP(obj);
    return name;
  } catch (error) {
    console.error(error);
  }
};



const deleteall = async (externalId) => {
  try{
 const delDb=  await deleteuserdb(externalId);
 const delper= await deletePer(externalId);
 const delname= await deletename(externalId);
  if (delDb==="delete"&& "delete" ===delper && "delete" ===delname) {
    return ("all delete")
  }
  else {
    return ("there is problem with delete")
  }
}
catch (error) {
  console.error(error);
}
};


const deleteuserdb= async(externalId)=>
{
  try{
    await User.deleteOne({ _id: externalId });
    return "delete"
}
  catch (error) {
    console.error(error);
  }
}


const deletePer= async(externalId)=>
{
  try{
    await deletePersonByIdP(externalId) 
    return "delete"
}
  catch (error) {
    console.error(error);
  }
}


const deletename= async(externalId)=>
{
  try{
    await deleteNameByIdP(externalId) 
    return "delete"
}
  catch (error) {
    console.error(error);
  }
}


const upadtepermi= async(externalId,per)=>
{
  try{
    const up = await updateMemberPermissionsById(externalId,per) 
    if (up==='update') {
      return ('update')
    }
    else{
      return ("the person was not found")
    }
}
  catch (error) {
    console.error(error);
  }
}





module.exports = { getAllUsers,getOne,adduser ,addper,addname,deleteall,upadtepermi};



