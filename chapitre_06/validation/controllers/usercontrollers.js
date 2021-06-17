const expressValidator = require("express-validator")
const user = require("../model/User")

const findUser = async (req, res) => {

    try {

        const user = await User.find().lean()

        res.json(user)

    } catch (error) {

        res.status(400).json({ message: "There is problem with the usernam !!", error })
    }
}

const addUser = async (req, res) => {

    try {

        const error = expressValidator.validationResult(req);
        const user = req.body

        if (!errors.isEmpty()) {
            res.status(400).json({ message: "There was a problem" })

        } else {

            const UserAdded = await User.create(user)
            res.json({
                message: "The user was added",
                UserAdded
            })
        }

    } catch (error) {

        res.status(400).json({ message: "There is problem with the usernam !!", error })

    }
}

const findUsername = async (req, res) => {

    try {

        const username = req.params.username
        const userfound = await User.findOne(username)

        res.json(userfound)

    } catch (error) {

        res.status(400).json({ message: "There is problem with the usernam !!", error })
    }
}

module.exports = { findUser, addUser, findUsername }