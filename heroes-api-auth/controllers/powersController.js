const powerModel = require("../models/power")

const getPowers = async (req, res) => {
    try {
        const powers = await powerModel.find().select({
            name: 1,
            force: 1
        })

        res.json(powers)
    } catch (err) {
        console.log(err)

        res.status(500).json({ errorMessage: "There was a problem :(" })
    }
}

const getPower = async (req, res) => {
    try {
        const idPower = req.params.id
        const power = await powerModel.findById(idPower).select({ name: 1, force: 1 })

        if (power) {
            res.json(power)
        } else {
            res.json({
                message: "Power not found"
            })
        }
    } catch (err) {
        console.log(err)

        res.status(500).json({ errorMessage: "There was a problem :(" })
    }
}

const addNewPower = async (req, res) => {
    try {
        const power = req.body

        const newPower = await powerModel.create(power)

        res.json({
            message: "Ok, power was created!",
            newPower
        })
    } catch (err) {
        console.log(err)

        res.status(500).json({ errorMessage: "There was a problem :(" })
    }
}

// TODO: validate that the power doesn't correspond to a hero before deleting it
const deletePower = async (req, res) => {
    try {
        const idPower = req.params.id

        await powerModel.findByIdAndDelete(idPower)

        res.json({
            message: `Power was deleted`
        })
    } catch (err) {
        console.error(err)

        res.status(500).json({ errorMessage: "There was a problem :(" })
    }
}

const replacePower = async (req, res) => {
    try {
        const idPower = req.params.id
        const newValuesPower = req.body

        await powerModel.replaceOne({ _id: idPower }, newValuesPower)

        res.json({
            message: "Power was replaced!"
        })

    } catch (err) {
        console.error(err)

        res.status(500).json({ errorMessage: "There was a problem :(" })
    }
}

const updateForcePower = async (req, res) => {
    try {
        const idPower = req.params.id
        const newForce = req.body.force

        await powerModel.findByIdAndUpdate({ _id: idPower }, { $set: { force: newForce } })

        res.json({
            message: "Force of power was update!"
        })

    } catch (err) {
        console.error(err)

        res.status(500).json({ errorMessage: "There was a problem :(" })
    }
}

module.exports = {
    getPowers,
    getPower,
    addNewPower,
    deletePower,
    replacePower,
    updateForcePower
}