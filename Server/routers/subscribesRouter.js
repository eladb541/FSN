const express = require('express');
const router = express.Router();
const subBll = require("../BLL/subscribesBLL");



router.post("/", async (req, res) => {
  try {
    const memberData = req.body;
    const result = await subBll.addsub(memberData);
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/", async (req, res) => {
  try {
    const params = req.body;
    const result = await subBll.deletesub(params._id);
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put('/', async (req, res) => {
  try {
  

    const params = req.body;
    const result = await subBll.updatesub(params._id,params.obj);
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


router.get('/', async (req, res) => {
  try {
    const genres = await subBll.getAllsub();
    res.json(genres);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch genres' });
  }
});

module.exports = router;






