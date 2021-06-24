const heroModel = require("../models/hero")
const powerModel = require("../models/power")
const { findHeroByName } = require("../utils/heroesFunctions")

const getHeros = async (req, res) => {
    try {
        const heroes = await heroModel.find().populate("powers", { name: 1, _id: 0 }).select({
            name: 1,
            powers: 1,
            color: 1,
            isAlive: 1,
            age: 1,
            image: 1
        })

        res.json(heroes)
    } catch (err) {
        console.log(err)

        res.status(500).json({ errorMessage: "There was a problem :(" })
    }
}

const getHeroById = async (req, res) => {
    try {
        const idHero = req.params.id
        const hero = await heroModel.findById(idHero)

        if (hero) {
            res.json(hero)
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

const getHero = async (req, res) => {
    try {
        const nameHero = req.params.name
        const hero = await findHeroByName(nameHero, true)

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

const getHeroPower = async (req, res) => {
    try {
        const idHero = req.params.id
        const hero = await heroModel.findById(idHero).populate("powers")

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
        const idHero = req.params.id
        const hero = await heroModel.findById(idHero).populate("powers")

        const heroPower = req.body.power

        let powerToAdd = await powerModel.findOne({ name: heroPower })

        if (!powerToAdd) {
            powerToAdd = await powerModel.create({
                name: heroPower,
                power: 0
            })
        }

        hero.powers.push(powerToAdd)

        await hero.save() // to change the __v automatically

        // await heroModel.updateOne({ name: hero.name }, { powers: hero.powers }) // doesn't change the __v automatically

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
        const idHero = req.params.id

        await heroModel.deleteOne({ _id: idHero })

        res.json({
            message: `Hero effacé correctement`
        })
    } catch (err) {
        console.error(err)

        res.status(500).json({ errorMessage: "There was a problem :(" })
    }
}

const deletePowerFromHero = async (req, res) => {
    try {
        const idHero = req.params.id
        const idPower = req.params.idPower

        const powerToRemove = await powerModel.findById(idPower)

        if (powerToRemove) {
            const hero = await heroModel.findById(idHero).populate("powers")

            const indexPower = hero.powers.findIndex(elem => {
                return elem._id.equals(powerToRemove._id)
            })

            if (indexPower > -1) {
                await heroModel.updateOne({ _id: hero._id }, { $pull: { powers: powerToRemove._id } })

                res.json({
                    message: `The power ${powerToRemove.name} of ${hero.name} was deleted`
                })
            } else {
                res.status(400).json({
                    message: `The power ${powerToRemove.name} doesn't correspond to ${hero.name}`
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
        const idHero = req.params.id
        const newValuesHero = req.body

        await heroModel.replaceOne({ _id: idHero }, newValuesHero)

        res.json({
            message: `Hero values replaced!`
        })

    } catch (err) {
        console.error(err)

        res.status(500).json({ errorMessage: "There was a problem :(" })
    }

}

module.exports = {
    getHeros,
    getHeroById,
    getHero,
    getHeroPower,
    addNewHero,
    addNewPowerHero,
    deleteHero,
    deletePowerFromHero,
    replaceHero
}

