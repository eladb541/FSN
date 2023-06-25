const express = require('express');


const loginBLL=require('../BLL/loginBLL')

const router = express.Router();

router.post('/',async (req, res) => {
  try {
    const {username,password}=req.body
    const obj={username, password}
    console.log("Router")//
    console.log("username", username,"password", password)//
    const resp =await loginBLL.login(obj); 
  
    if (resp.status === 404) res.status(404).json(resp)
  
    return res.json(resp)
  }catch(e) {
    console.log(e.message)
  }

}
)




;


module.exports = router;