
const expressValidator = require("express-validator")
const User = require("../model/User")

const findUser = async (req, res) => {

    try {

        const user = await User.find().lean()

        res.json(user)

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "There is problem with the usernam !!", error })
    }
}

const addUser = async (req, res) => {

    try {

        console.log(req.body)

        const error = expressValidator.validationResult(req);
        const user = req.body


        if (!error.isEmpty()) {
            // console.log(error)
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
        const userfound = await User.findOne({username : username}).lean()

        res.json(userfound)

    } catch (error) {

        res.status(400).json({ message: "There is problem with the usernam !!", error })
    }
}

const findUserById = async (req, res) => {

    try {

        const userId = req.params.id
        const userfound = await User.findOne({_id : userId}).lean()

        res.json(userfound)

    } catch (error) {

        res.status(400).json({ message: "There is problem with the usernam !!", error })
    }
}

const findUserByEmail = async (req, res) => {

    try {

        const userEmail = req.params.email
        console.log(userEmail)
        const userFoundEmail = await User.findOne({email : userEmail}).lean()
        console.log(userFoundEmail)
        
        if (userFoundEmail === null){
            return res.json({
                message : "Email is not valide"
            })
        }
        res.json(userFoundEmail)

    } catch (error) {

        res.status(400).json({ message: "There is problem with the usernam !!", error })
    }
}

module.exports = { findUser, addUser, findUsername, findUserById, findUserByEmail}