const userModel = require("../models/user")

const getUsers = async (req, res) => {
    try {
        const users = await userModel.find().lean()

        res.json(users)
    } catch (error) {
        console.log("Error: ", error)
        res.status(500).json({ message: "There was an error while treating the request" })
    }
}

const getUser = (req, res) => {
    res.json(req.user)
}

module.exports = { getUsers, getUser }