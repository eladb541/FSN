const { getAllUsers: getAllUsersWS,getUserByIdWS } = require('../DAL/usersWS');
const { getAllPersons,getPersonById } = require('../DAL/usersFile');
const User = require('../models/userModel');
const Sk=require('../models/sessionKey');
const express=require('express')
const jwt=require('jsonwebtoken')
const router=express.Router();

const login = async (obj) => {
    console.log("Bll")
  const {username,password} = obj;
  console.log(obj)


  try{
        const user=await User.findOne({username,password})
    if(!user){
        console.log("dont find user")
        return res.status(404).json({error:"one of identify details is wrong"})
        
        }
        const session=await Sk.findOne();
    if(!session){
        console.log("dont find session")
        return res.status(500).json({error:"session is not found"})
        }
        const accessToken=jwt.sign(
            {"id" :user._id , "username":user.username},
            accessToken=session.key
        )
        return res(session) 
  }
  catch(error) {
    console.log("catch")
console.error(error)
return res(null)
  }
 
  };

;

module.exports = {login};
