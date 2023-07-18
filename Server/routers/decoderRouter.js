const express = require('express');
const router = express.Router();
const decodeBLL = require("../BLL/decoderBLL");
const axios = require("axios");



router.post('/', async (req, res) => {
  try {
   
    const { secretKeyToCompare , mysession } = req.body;
    const obj = { secretKeyToCompare, mysession };
    console.log(obj)
    const resp = await decodeBLL.checkgene(obj);
    return res.json(resp)
     
    
  } catch (error) {
    msg1 = "Server error";
    return res.status(500).jsonjson({ msg: msg1 });
  }
});

router.post('/movies', async (req, res) => {
  try {
   
    const { secretKeyToCompare , mysession } = req.body;
    const obj = { secretKeyToCompare, mysession };
    console.log(obj)
    const resp = await decodeBLL.checkmovies(obj);
    return res.json(resp)
     
    
  } catch (error) {
    msg1 = "Server error";
    return res.status(500).jsonjson({ msg: msg1 });
  }
});


router.post('/members', async (req, res) => {
  try {
   
    const { secretKeyToCompare , mysession } = req.body;
    const obj = { secretKeyToCompare, mysession };
    console.log(obj)
    const resp = await decodeBLL.checkmembers(obj);
    return res.json(resp)
     
    
  } catch (error) {
    msg1 = "Server error";
    return res.status(500).jsonjson({ msg: msg1 });
  }
});


router.post('/subscribes', async (req, res) => {
  try {
   
    const { secretKeyToCompare , mysession } = req.body;
    const obj = { secretKeyToCompare, mysession };
    console.log(obj)
    const resp = await decodeBLL.checksub(obj);
    return res.json(resp)
     
    
  } catch (error) {
    msg1 = "Server error";
    return res.status(500).jsonjson({ msg: msg1 });
  }
});

router.post('/admin', async (req, res) => {
  try {
   
    const { secretKeyToCompare , mysession } = req.body;
    const obj = { secretKeyToCompare, mysession };
    console.log(obj)
    const resp = await decodeBLL.checkadmin(obj);
    return res.json(resp)
     
    
  } catch (error) {
  console.log(error)
    return res.status(500).jsonjson({ msg :false });
  }
});

router.post('/addmember', async (req, res) => {
  try {
   
    const { secretKeyToCompare , mysession } = req.body;
    const obj = { secretKeyToCompare, mysession };
    console.log(obj)
    const resp = await decodeBLL.checkaddmember(obj);
    return res.json(resp)
     
    
  } catch (error) {
  console.log(error)
    return res.status(500).jsonjson({ msg :false });
  }
});

router.post('/addmovie', async (req, res) => {
  try {
   
    const { secretKeyToCompare , mysession } = req.body;
    const obj = { secretKeyToCompare, mysession };
    console.log(obj)
    const resp = await decodeBLL.checkaddmovie(obj);
    return res.json(resp)
     
    
  } catch (error) {
  console.log(error)
    return res.status(500).jsonjson({ msg :false });
  }
});

router.post('/addsub', async (req, res) => {
  try {
   
    const { secretKeyToCompare , mysession } = req.body;
    const obj = { secretKeyToCompare, mysession };
    console.log(obj)
    const resp = await decodeBLL.checkaddsub(obj);
    return res.json(resp)
     
    
  } catch (error) {
  console.log(error)
    return res.status(500).jsonjson({ msg :false });
  }
});

router.post('/namecoded', async (req, res) => {
  try {
   
    const { secretKeyToCompare , mysession } = req.body;
    const obj = { secretKeyToCompare, mysession };
    console.log(obj)
    const resp = await decodeBLL.namecoded(obj);
    return res.json(resp)
     
    
  } catch (error) {
  console.log(error)
    return res.status(500).jsonjson({ username :null });
  }
});




module.exports = router;



