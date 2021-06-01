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

app.get("/heros/:name/powers", (req,res)=>{
    
    const nameHero  = req.params.name

    const listPowerHeros = superHeros.find((elem)=>{

       return  nameHero === elem.name.toLowerCase()
    })

    res.json (listPowerHeros.power)
})

app.post("/heros",(req,res)=>{

    console.log("req.body", req.body)

    // res.json()

    const newHero = { name : req.body.name}

    console.log("newHero", newHero)

    superHeros.push(newHero)

    res.json({
        message : "ok héros ajouter",
        

    })
})

const transformName = (req, res, next) => {
    console.log("req.body.name")

    if(req.body.name === undefined){
        res.json({
            errorMessage : "to send a hero you must be send it"
        })
    }else {
        req.body.name = req.body.name.toLowerCase()

        next()
    }

}

app.post("/heros",transformName, (req,res)=>{

    // console.log("req.body", req.body)

    // res.json()

    const newHero = req.body.name

    superHeros.push(newHero)

    res.json({
        message : "ok héros ajouter",
        newHero
    })
})

app.post("/heros/:name/powers", (req,res)=>{

    const nameHero = req.params.name.toLowerCase()

    const selectedHero = superHeros.find((elem)=>{

        return nameHero === elem.name
    })

    if(selectedHero) {

        const powerHero = req.body.power

        console.log("powerHero  req.body.power", req.body.power)

        selectedHero.powers.push(powerHero)
        
        console.log("selectedHero.powers", selectedHero.powers)

        res.json({
            message : `Power added! The powers of ${nameHero} are ${selectedHero.powers}`
        })
    }else {
        res.json({
            message : "hero not found"

        })
    
    }
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

    