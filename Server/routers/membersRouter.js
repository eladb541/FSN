const express = require('express');
const router = express.Router();
const membersbll = require("../BLL/membersBLL");
const axios = require("axios");

router.get("/", async (req, res) => {
  try {
    const members = await membersbll.getAllMembers();

    if (members.length < 1) {
      const { data } = await axios.get("https://jsonplaceholder.typicode.com/users");
      await membersbll.putMembersInDB(data);

      const members1 = await membersbll.getAllMembers();
      return res.status(200).json(members1);
    }

    return res.status(200).json(members);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/", async (req, res) => {
  try {
    const memberData = req.body;
    const result = await membersbll.addMember(memberData);
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/", async (req, res) => {
  try {
    const params = req.body;
    const result = await membersbll.deleteMember(params._id);
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put('/', async (req, res) => {
  try {
  

    const params = req.body;
    const result = await membersbll.updateMember(params._id,params.obj);
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});






module.exports = router;
