const express = require('express');
const jwt=require('jsonwebtoken')
const Sk= require('../models/sessionKey');

const loginBLL=require('../BLL/loginBLL')

const router = express.Router();

router.post('/',async (req, res) => {
  const {username,password}=req.body
  const obj={"username": username,"password": password}
  console.log("Router")//
  console.log("username", username,"password", password)//
  const session=await loginBLL.login(obj); 
  return res.json(session)
}
)




;


module.exports = router;