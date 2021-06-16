const { heroExists } = require("../utils/heroesFunctions")

const continueIfHeroExists = async (req, res, next) => {
    try {
        const nameHero = req.params.name

        const hero = await heroExists(nameHero)

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

const continueIfHeroDoesntExists = async (req, res, next) => {

    try {
        const heroBody = req.body
        const hero = await heroExists(heroBody.name)

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
}

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

module.exports = {
    continueIfHeroExists,
    continueIfHeroDoesntExists,
    transformName
}