const express = require("express")

const router = express.Router()
const movieBLL = require("../BLL/movieBLL")
const axios = require("axios")

router.get("/", async (req, res) => {

    const movies = await movieBLL.getAllMovies()

    if (movies.length < 1) {
        const { data: movies } = await axios.get("https://api.tvmaze.com/shows")
        await movieBLL.putMoviesInDB(movies)

        const movies1 = await movieBLL.getAllMovies()
        return res.status(200).json(movies1)

    }

    return res.status(200).json(movies)


});
router.post('/', async (req, res) => {
    try{const obj = req.body;
      const result = await movieBLL.addmovie(obj);
      res.json.status(200).jsoon(result);

    }
    catch (error){
     
       return console.error(error);
    }
  
  });

  router.delete("/", async (req, res) => {
    try {
      const params = req.body;
      const result = await movieBLL.deleteMovie(params._id);
      res.status(200).json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });


















  router.put('/', async (req, res) => {
    try {
    
  
      const params = req.body;
      const result = await movieBLL.UpdateMovie(params._id,params.obj);
      res.json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });





module.exports = router