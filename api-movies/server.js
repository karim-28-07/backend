const express = require("express")
const cors = require("cors")
const { dataMovies } = require("./dataMovies.js")

const app = express()

app.use(cors())

const port = 8001

app.get("/datamovies", (req, res) => {

    const result = dataMovies.map(elem => {
        return {
            poster_path: elem.poster_path,
            release_date: elem.release_date,
            title: elem.title,
            
        }
    })


    res.json(result)
})

app.listen(port, () => {
    console.log("Server à l'écoute dans le port " + port);
})
