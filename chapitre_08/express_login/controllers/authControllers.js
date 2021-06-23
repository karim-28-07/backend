const userModel = require("../models/user")
const {validationResult} = require("express-validator")
const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")
const config = require("../../config")

const signup = async (req, res) => {
    try {

        const error = validationResult(req);
        const user = req.body
        if (!error.isEmpty()) {
            // console.log(error)
            res.status(400).json({ message: "There was a problem", user })

        } else {

            const email = req.body.email
            const password = bcrybtjs.hashSync(req.body.password)
            const firstName = req.body.firstName
            const surname = req.body.surname
            const date = req.body.date

            const user = await userModel.create({email, password, firstName, surname, date})

            res.json({
                message : "User was created" , user
            })
        }

    } catch (error) {
        res.status(400).json({ message: "There is problem !!", error })
    }
}

const login = async (req, res) => {
    try {
        const email = req.body.email
        const user = await userModel.findOne({ email })

        const result = bcryptjs.compareSync(req.body.password, user.password)

        if (result) {
            const token = jwt.sign(
                {
                    id: user._id
                }, config.secret,
                {
                    expiresIn: 3600
                })

            res.json({ message: "You're now login!", token })
        } else {
            res.status(401).json({ message: "Login failed" })
        }
    } catch (error) {
        console.log("Error: ", error)
        res.status(500).json({ message: "There was an error while treating the request" })
    }
}

module.exports = {
    signup,
    login
}