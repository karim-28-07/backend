const express = require("express")
const cors = require("cors")
const { superHeros } = require("./dataHeros.js")

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

app.get("/heros", (req, res) => {
    res.json(superHeros)
})

app.get("/heros/:name", (req, res) => {

    const name = req.params.name

    console.log("name : ", req.params.name)

    const listHeros = superHeros.find((elem) => {

        return elem.name.toLowerCase() === name.toLowerCase()
    })

    // if(listHeros)

    res.json({
        listHeros
    })
})

app.get("/heros/:name/powers", (req, res) => {

    const nameHero = req.params.name

    const listPowerHeros = superHeros.find((elem) => {

        return nameHero === elem.name.toLowerCase()
    })

    res.json(listPowerHeros.power)
})

const transformName = (req, res, next) => {
    console.log("req.body.name")

    if (req.body.name === undefined) {
        res.json({
            errorMessage: "to send a hero you must be send it"
        })
    } else {
        req.body.name = req.body.name.toLowerCase()

        next()
    }

}

app.post("/heros", (req, res, next) => {

    const hero = req.body

    const selectedHero = superHeros.find(elem => {
        return elem.name.toLowerCase() === hero.name.toLowerCase()
    })

    console.log("selectedHero", selectedHero);

    if (selectedHero) {

        res.json({
            errorMessage: "The hero already exists"
        })

    } else {
        next()
    }
}, transformName, (req, res) => {
    // console.log(req.body);

    const hero = req.body

    superHeros.push(hero)

    res.json({
        message: "Ok, héros ajouté",
        hero
    })
})

app.post("/heros/:name/powers", (req, res) => {

    const nameHero = req.params.name.toLowerCase()

    const selectedHero = superHeros.find((elem) => {

        return nameHero === elem.name
    })

    if (selectedHero) {

        const powerHero = req.body.power

        console.log("powerHero  req.body.power", req.body.power)

        selectedHero.powers.push(powerHero)

        console.log("selectedHero.powers", selectedHero.powers)

        res.json({
            message: `Power added! The powers of ${nameHero} are ${selectedHero.powers}`
        })
    } else {
        res.json({
            message: "hero not found"

        })

    }
})

const continueIfHeroExists = (req, res, next) => {

    const heroname = req.params.name.toLowerCase()

    const selectedHero = superHeros.find(elem => {
        return elem.name.toLowerCase() === heroname
    })

    if (selectedHero) {
        next()
    } else {
        res.json({
            message: "The Hero doesn't exists "
        })
    }
}

app.delete("/heros/:name", continueIfHeroExists, (req, res) => {

    const heroName = req.params.name.toLowerCase()

    // superHeros = superHeros.filter(elem =>{
    //     return elem.name.toLowerCase() !== heroName
    // })

    for (let i = 0; i < superHeros.length; i++) {
        if (superHeros[i].name.toLowerCase() === heroName) {
            superHeros.splice(i, 1)
        }
    }

    res.json({
        message: `${heroName} hase been deleted`
    })
})

app.delete("heros/:name/power/:power", continueIfHeroExists, (req, res) => {
    const heroName = req.params.name.toLowerCase()
    const heroPower = req.params.power.toLowerCase()

    const selectedHero = superHeros.find(elem => {
        return elem.name.toLowerCase() === heroName
    })

    const indexPower = selectedHero.power.findIndex(elem => {
        return elem === heroPower
    })

    if (selectedHero > -1) {

        selectedHero.power.splice(indexPower, 1)

        res.json({
            message: `The power ${heroPower} of ${heroName} has been deleted correctely`
        })
    } else {
        res.json({
            messsage: `The power ${heroPower} doesn't exists for the hero ${heroName}`
        })
    }
})

app.put("/heros/:name", continueIfHeroExists, (req, res) => {

    const heroName = req.params.name.toLowerCase()
    const newHero = req.body

    const heroId = superHeros.findIndex(elem => {
        return elem.name.toLowerCase() === heroName
    })

    // superHeros[heroId] = newHero

    superHeros.splice(heroId, 1, newHero)

    res.json({
        message: `${heroName} has been replaced correctly `
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

