const express = require('express');
const router = express.Router();
const loginBLL = require("../BLL/loginBLL");
const axios = require("axios");



router.post('/', async (req, res) => {
  try {
    let msg = null;
    const { username, password } = req.body;
    const obj = { username, password };
    console.log("Router");
    console.log("username", username, "password", password);
    if (obj.password === null || obj.password === "") {
      msg = "The password cannot be empty";
      return res.status(404).json({ msg: msg });
    
    } else {
      const resp = await loginBLL.login(obj);
     
       
      
        return res.json(resp);
      }
    
  } catch (error) {
    msg1 = "Server error";
    return res.status(500).jsonjson({ msg: msg1 });
  }
});





;


module.exports = router;