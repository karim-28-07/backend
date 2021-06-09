const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const Hero = require("./model/hero")

mongoose.connect("mongodb://localhost:27017/herosDB", (err) => {
    if (err) {
        console.error(err);
    } else {
        console.log("I'm connected to the database")
    }
})

const port = 8000

const app = express()

const debug = (req, res, next) => {
    console.log("I received a request!");

    next()
}

app.use(cors())

app.use(express.json())

app.use(debug)

app.get("/heroes", async (req, res) => {
    try {
        const heroes = await Hero.find()

        res.json(heroes)
    } catch (err) {
        console.error(err)

        res.json({ errorMessage: "There was a probleme :(" }, 500)
    }

})

app.get("/heroes/:name",  async (req, res) => {
    
    try {
        const name = req.params.name
        console.log("name : ", req.params.name)
        const listHeros = await Hero.findOne({ name: name })
        res.json({listHeros})

    } catch (error) {
            console.log(error)
        res.json({
            errormessage : "There was a problem !"
        }, 500)
    }
})

    
    // const nameHero = req.params.name.toLowerCase()
    // let selectedHero = {}

    // for (var i = 0; i < superHeros.length; i++) {

    //     if (superHeros[i].name.toLowerCase() === nameHero) {
    //         selectedHero = superHeros[i]
    //     }
    // }

    // if (Object.keys(selectedHero).length !== 0) {

    //     res.json(selectedHero)
    // } else {

    //     res.json({
    //         message: "Hero not found"
    //     })
    // }

// })

app.get("/heroes/:name/powers", (req, res) => {
    const nameHero = req.params.name.toLowerCase()

    const selectedHero = superHeros.find(elem => {
        return nameHero === elem.name.toLowerCase()
    })

    res.json(selectedHero.powers)
})

const transformName = (req, res, next) => {
    if (req.body.name === undefined) {
        res.json({
            errorMessage: "To add a hero send at least he's name"
        })
    } else {
        req.body.name = req.body.name.toLowerCase()

        next()
    }

}

app.post("/heroes", transformName, (req, res, next) => {
    const hero = req.body

    const selectedHero = superHeros.find(elem => {
        return elem.name.toLowerCase() === hero.name
    })

    if (selectedHero) {

        res.json({
            errorMessage: "The hero already exists"
        })

    } else {
        next()
    }
}, (req, res) => {
    // console.log(req.body);

    const hero = req.body

    superHeros.push(hero)

    res.json({
        message: "Ok, héros ajouté",
        hero
    })
})

app.post("/heroes/:name/powers", (req, res) => {
    const nameHero = req.params.name.toLowerCase()

    const selectedHero = superHeros.find(elem => {
        return nameHero === elem.name.toLowerCase()
    })

    if (selectedHero) {
        const heroPower = req.body.power

        selectedHero.powers.push(heroPower)

        res.json({
            message: `Power added! The powers of ${nameHero} are ${selectedHero.powers}`
        })
    } else {
        res.json({
            errorMessage: "Hero not found"
        })
    }
})

const continueIfHeroExists = (req, res, next) => {
    const heroName = req.params.name.toLowerCase()

    const selectedHero = superHeros.find(elem => {
        return elem.name.toLowerCase() === heroName
    })

    if (selectedHero) {
        next()
    } else {
        res.json({
            errorMessage: "The hero doesn't exists"
        })
    }
}

app.delete("/heroes/:name", continueIfHeroExists, (req, res) => {
    const heroName = req.params.name.toLowerCase()

    // superHeros = superHeros.filter(elem => {
    //     return elem.name.toLowerCase() !== heroName
    // })

    for (var i = 0; i < superHeros.length; i++) {
        if (superHeros[i].name.toLowerCase() === heroName) {
            superHeros.splice(i, 1)
        }
    }

    res.json({
        message: `${heroName} effacé correctement`
    })
})

app.delete("/heroes/:name/power/:power", continueIfHeroExists, (req, res) => {
    const heroName = req.params.name.toLowerCase()
    const heroPower = req.params.power.toLowerCase()

    const selectedHero = superHeros.find(elem => {
        return elem.name.toLowerCase() === heroName
    })

    const indexPower = selectedHero.powers.findIndex(elem => {
        return elem === heroPower
    })

    if (indexPower > -1) {
        selectedHero.powers.splice(indexPower, 1)

        res.json({
            message: `Le pouvoir ${heroPower} de ${heroName} a été effacé correctement`
        })
    } else {
        res.json({
            message: `Le pouvoir ${heroPower} n'existe pas dans l'héro ${heroName}`
        })
    }

})

app.put("/heroes/:name", continueIfHeroExists, (req, res) => {
    const heroName = req.params.name.toLowerCase()
    const newHero = req.body

    const heroId = superHeros.findIndex(elem => {
        return elem.name.toLowerCase() === heroName
    })

    superHeros[heroId] = newHero

    // superHeros.splice(heroId, 1, newHero) // Same as above

    res.json({
        message: `${heroName} a été remplace correctement`
    })
})

app.get("*", (req, res) => {
    res.json({
        errorMessage: "The route was not found"
    }, 404)
})

app.listen(port, () => {
    console.log("Server is listening at port ", port);
})