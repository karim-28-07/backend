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

        res.status(500).json({ errorMessage: "There was a problem :(" })
    }

})

const findHero = async (name) => {
    try {
        return await Hero.findOne({
            name: {
                $regex: new RegExp("^" + name, "i")
            }
        })

    } catch (err) {
        console.error(err)

        return null
    }
}

app.get("/heroes/:name", async (req, res) => {

    try {
        const nameHero = req.params.name
        const hero = await findHero(nameHero)

        if (hero) {
            res.json({ hero })
        } else {
            res.json({
                message: "Hero not found"
            })
        }
    } catch (err) {
        console.error(err)

        res.status(500).json({ errorMessage: "There was a problem :(" })
    }

})

app.get("/heroes/:name/powers", async (req, res) => {
    try {
        const nameHero = req.params.name
        const hero = await findHero(nameHero)

        if (hero) {
            res.json({ powers: hero.powers })
        } else {
            res.json({
                message: "Hero not found"
            })
        }
    } catch (err) {
        console.error(err)

        res.status(500).json({ errorMessage: "There was a problem :(" })
    }
})

const transformName = (req, res, next) => {
    if (req.body.name === undefined) {
        res.json({
            errorMessage: "To add a hero send at least he's name"
        })
    } else {
        req.body.name = req.body.name

        next()
    }
}

app.post("/heroes", transformName, async (req, res, next) => {

    try {
        const heroBody = req.body
        const hero = await findHero(heroBody.name)

        if (hero) {
            res.status(400).json({
                message: "The hero already exists"
            })
        } else {
            next()
        }

    } catch (err) {
        console.error(err)

        res.status(500).json({ errorMessage: "There was a problem :(" })
    }
}, async (req, res) => {

    try {
        const hero = req.body

        const newHero = await Hero.create(hero)

        res.json({
            message: "Ok, hero was created!",
            newHero
        })
    } catch (err) {
        console.error(err)

        res.status(500).json({ errorMessage: "There was a problem :(" })
    }

})

app.post("/heroes/:name/powers", async (req, res) => {

    try {
        const nameHero = req.params.name

        const hero = await findHero(nameHero)

        if (hero) {
            const heroPower = req.body.power

            hero.powers.push(heroPower)

            const heroNewPowers = hero.powers

            await Hero.updateOne({ name: hero.name }, { powers: heroNewPowers })

            res.json({
                message: "Ok, hero power was added!"
            })

        } else {
            res.status(400).json({ errorMessage: "Hero was not found" })

        }

    } catch (err) {
        console.error(err)

        res.status(500).json({ errorMessage: "There was a problem :(" })
    }

})

const continueIfHeroExists = async (req, res, next) => {
    try {
        const nameHero = req.params.name

        const hero = await findHero(nameHero)

        if (hero) {
            next()
        } else {
            res.status(400).json({ errorMessage: "Hero was not found" })
        }

    } catch (err) {
        console.error(err)

        res.status(500).json({ errorMessage: "There was a problem :(" })
    }
}

app.delete("/heroes/:name", continueIfHeroExists, async (req, res) => {
    try {
        const nameHero = req.params.name

        await Hero.deleteOne({
            name: {
                $regex: new RegExp("^" + nameHero, "i")
            }
        })

        res.json({
            message: `${nameHero} effacé correctement`
        })
    } catch (err) {
        console.error(err)

        res.status(500).json({ errorMessage: "There was a problem :(" })
    }
})

app.delete("/heroes/:name/power/:power", continueIfHeroExists, async (req, res) => {
    try {
        const nameHero = req.params.name
        const heroPower = req.params.power

        const hero = await findHero(nameHero)

        const indexPower = hero.powers.findIndex(elem => {
            return elem.toLowerCase() === heroPower.toLowerCase()
        })

        if (indexPower > -1) {
            await Hero.updateOne({ name: hero.name }, { $pull: { powers: heroPower }  })

            res.json({
                message: `The power ${heroPower} of ${nameHero} was deleted`
            })
        } else {
            res.status(400).json({
                message: `The power ${heroPower} doesn't exists for ${nameHero}`
            })
        }
    } catch (err) {
        console.error(err)

        res.status(500).json({ errorMessage: "There was a problem :(" })
    }

})

app.put("/heroes/:name", continueIfHeroExists, async (req, res) => {

    try {
        const nameHero = req.params.name
        const newValuesHero = req.body

        await Hero.replaceOne({ name: {
            $regex: new RegExp("^" + nameHero, "i")
        } }, newValuesHero )

        res.json({
            message: `${nameHero} was replaced!`
        })

    } catch (err) {
        console.error(err)

        res.status(500).json({ errorMessage: "There was a problem :(" })
    }
    
})

app.get("*", (req, res) => {
    res.json({
        errorMessage: "The route was not found"
    }, 404)
})

app.listen(port, () => {
    console.log("Server is listening at port ", port);
})