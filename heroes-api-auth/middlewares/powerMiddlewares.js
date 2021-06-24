const powerModel = require("../models/power")

const continueIfPowerExists = async (req, res, next) => {
    try {
        const powerBody = req.body
        const power = await powerModel.findOne({ name: powerBody.name })

        if (power) {
            next()
        } else {
            res.status(400).json({
                message: "The power doesn't exists"
            })
        }

    } catch (err) {
        console.error(err)

        res.status(500).json({ errorMessage: "There was a problem :(" })
    }
}

const continueIfPowerDoesntExists = async (req, res, next) => {
    try {
        const powerBody = req.body
        const power = await powerModel.findOne({ name: powerBody.name })

        if (power) {
            res.status(400).json({
                message: "The power already exists"
            })
        } else {
            next()
        }

    } catch (err) {
        console.error(err)

        res.status(500).json({ errorMessage: "There was a problem :(" })
    }
}

module.exports = {
    continueIfPowerDoesntExists,
    continueIfPowerExists
}