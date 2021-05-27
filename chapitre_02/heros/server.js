const express = require("express")
const cors = require("cors")
const { superHeros} = require("./dataHeros.js")

const app = express()

app.use(express.json()) // permet de recevoir body json dans les requetes de postMan
app.use(cors())

// middleware avec use
app.use((req, res, next) => {
    console.log("I received the request")
    
    next()
})



const port = 9000

app.get("/heros", (req,res) => {
    res.json(superHeros)
})

app.get("/heros/:name", (req,res) => {
     
    res.json(`${req.params.name}`)
})

app.post("/heros", (req,res)=>{
    const newHeros = req.body.name
    superHeros.push(newHeros)
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

    