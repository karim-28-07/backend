const express = require("express")
const cors = require("cors")
const  country  = require("./datacountries.js")

const app = express()

app.use(cors())

const port = 8000

app.get("/country", (req,res) => {

    console.log("country" , country)

    res.json({
        country
    })
})

app.listen(port, () => {
    console.log("Server à l'écoute dans le port 8000");
})
