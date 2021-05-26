const express = require("express")
const cors = require("cors")
const  country  = require("./datacountries.js")
const { reduce } = require("./datacountries.js")

const app = express()

app.use(cors())

const port = 8000

app.get("/country", (req,res) => {

    console.log("country" , country)

    res.json({
        country
    })
})

app.get("/country/:name", (req, res)=>{

    const name = req.params.name;

    console.log("name", name)

    const countryName = []

    for(let i = 0; i < country.length; i++){
        const curCountry = country[i]

        if (curCountry.name === name){

            countryName.push(curCountry)
        }
    }

    console.log("countryName", countryName)

    res.json ({
        countryName
    })

    
})






app.listen(port, () => {
    console.log("Server à l'écoute dans le port 8000");
})
