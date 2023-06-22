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


})




module.exports = router