const express = require('express');
const AdminBLL = require('../BLL/adminBLL');

const router = express.Router();



  router.get('/', async (req, res) => {
    try {
      const users = await AdminBLL.getAllUsers();
      res.json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch users' });
    }
  });

  router.post("/", async (req, res) => {
    try {
      const userdata = req.body;
      const name=userdata.allname;
      const per=userdata.allpermmision;
     const finalresult="succeed"
      const result = await AdminBLL.adduser(userdata);
      if (result) {
        name.id=result;
        per.id=result;
       const myname=await AdminBLL.addper(per);
        const myper=await AdminBLL.addname(name);
        if(myname==="added" &&  myper==="added")
        res.status(200).json(finalresult);
      }
      else{

        res.status(500).json({ error: "Internal Server Error - per" });
      }
     
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }




  });


  router.delete("/", async (req, res) => {
    try {
      const params = req.body;
      const result = await AdminBLL.deleteall(params._id);
      if (result==="all delete") {
        res.status(200).json(result);
      }
      else{res.status(500).json(result);}
      
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });


  router.put('/', async (req, res) => {
    try {

       const params = req.body;
      const result = await AdminBLL.upadtepermi(params._id,params.obj);
      if (result==='update') {
        res.status(200).json(result);
      }
      else{res.status(500).json(result);}
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });












  module.exports = router;
