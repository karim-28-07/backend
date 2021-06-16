const heroModel = require("../models/hero")
const powerModel = require("../models/power")
const { findHero } = require("../utils/heroesFunctions")

const sendHeroList = async (req, res) => {
    try {
        const heroes = await heroModel.find().populate("powers", { name: 1, _id: 0 }).select({
            name: 1,
            powers: 1,
            color: 1,
            isAlive: 1,
            age: 1,
            image: 1,
        })

        res.json(heroes)
    } catch (err) {
        console.log(err)

        res.status(500).json({ errorMessage: "There was a problem :(" })
    }

}

const sendHero = async (req, res) => {
    try {
        const nameHero = req.params.name
        const hero = await findHero(nameHero, true)

        if (hero) {
            res.json({ hero })
        } else {
            res.json({
                message: "Hero not found"
            })
        }
    } catch (err) {
        console.log(err)

        res.status(500).json({ errorMessage: "There was a problem :(" })
    }
}

const sendHeroPower = async (req, res) => {
    try {
        const nameHero = req.params.name
        const hero = await findHero(nameHero, true)

        if (hero) {
            res.json({ powers: hero.powers })
        } else {
            res.json({
                message: "Hero not found"
            })
        }
    } catch (err) {
        console.log(err)

        res.status(500).json({ errorMessage: "There was a problem :(" })
    }
}

const addNewHero = async (req, res) => {
    try {
        const hero = req.body
        const powers = hero.powers

        const existingPowers = await powerModel.find({ name: { $in: powers } })

        let savedPowers = []

        if (existingPowers.length !== powers.length) {

            const differencePowers = powers.filter(elem => {
                return !existingPowers.find(x => {
                    return x.name === elem
                })
            })

            const newPowers = differencePowers.map(elem => {
                return {
                    name: elem,
                    force: 0
                }
            })

            savedPowers = await powerModel.insertMany(newPowers)

        }

        hero.powers = [...existingPowers, ...savedPowers]


        const newHero = await heroModel.create(hero)

        res.json({
            message: "Ok, hero was created!",
            newHero
        })
    } catch (err) {
        console.log(err)

        res.status(500).json({ errorMessage: "There was a problem :(" })
    }
}

const addNewPowerHero = async (req, res) => {
    try {
        const nameHero = req.params.name

        const hero = await findHero(nameHero, true)

        const heroPower = req.body.power

        let powerToAdd = await powerModel.findOne({ name: heroPower })

        if (!powerToAdd) {
            powerToAdd = await powerModel.create({
                name: heroPower,
                power: 0
            })
        }

        hero.powers.push(powerToAdd)

        await heroModel.updateOne({ name: hero.name }, { powers: hero.powers })

        res.json({
            message: "Ok, hero power was added!"
        })
    } catch (err) {
        console.log(err)

        res.status(500).json({ errorMessage: "There was a problem :(" })
    }

}

const deleteHero = async (req, res) => {
    try {
        const nameHero = req.params.name

        await heroModel.deleteOne({
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
}

const deletePowerFromHero = async (req, res) => {
    try {
        const nameHero = req.params.name
        const heroPower = req.params.power

        const powerToRemove = await powerModel.findOne({ name: heroPower })

        if (powerToRemove) {
            const hero = await findHero(nameHero, true)

            const indexPower = hero.powers.findIndex(elem => {
                return elem._id.equals(powerToRemove._id)
            })

            if (indexPower > -1) {
                await heroModel.updateOne({ name: hero.name }, { $pull: { powers: powerToRemove._id } })

                res.json({
                    message: `The power ${heroPower} of ${nameHero} was deleted`
                })
            } else {
                res.status(400).json({
                    message: `The power ${heroPower} doesn't correspond to ${nameHero}`
                })
            }
        } else {
            res.status(400).json({
                message: "The power doesn't exist in the database!"
            })
        }
    } catch (err) {
        console.error(err)

        res.status(500).json({ errorMessage: "There was a problem :(" })
    }

}

const replaceHero = async (req, res) => {

    try {
        const nameHero = req.params.name
        const newValuesHero = req.body

        await heroModel.replaceOne({
            name: {
                $regex: new RegExp("^" + nameHero, "i")
            }
        }, newValuesHero)

        res.json({
            message: `${nameHero} was replaced!`
        })

    } catch (err) {
        console.error(err)

        res.status(500).json({ errorMessage: "There was a problem :(" })
    }

}

module.exports = {
    sendHeroList,
    sendHero,
    sendHeroPower,
    addNewHero,
    addNewPowerHero,
    deleteHero,
    deletePowerFromHero,
    replaceHero
}

