const express = require("express")
const cors = require("cors")
const { superHeros} = require("./dataHeros.js")

const app = express()

app.use(express.json()) // permet de recevoir body json dans les requetes de postMan
app.use(cors())

// middleware avec use

const debug = ((req, res, next) => {
    console.log("I recieved the response")
    
    next()
})

app.use(debug)



const port = 9000

app.get("/heros", (req,res) => {
    res.json(superHeros)
})

app.get("/heros/:name", (req,res) => {
     
    const name = req.params.name

    console.log("name : ", req.params.name)

    const listHeros = superHeros.find((elem)=>{

       return  elem.name.toLowerCase() === name.toLowerCase()
    })

    if(listHeros)

    res.json ({
        listHeros
    })
})

app.post("/heros/:name/powers", (req,res)=>{
    
    const power  = req.params.power

    console.log("power : ", req.params.power)

    const listPowerHeros = superHeros.find((elem)=>{

       return  elem.power.toLowerCase() === power.toLowerCase()
    })

    if(listPowerHeros)

    res.json ({
        listPowerHeros
    })
})

    
// gestion d'erreurs

app.get('*', (req, res) => {
    res.json({
        errorMessage: "The route doesn't exist :'("
    })
})



app.listen(port, () => {
    console.log("Server à l'écoute dans le port " + port);
})

    