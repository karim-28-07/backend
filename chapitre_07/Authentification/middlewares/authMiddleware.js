const userModel = require("../models/user")
const jwt = require("jsonwebtoken")
const config = require("../config.js")

const verifyToken = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1]

        const result = jwt.verify(token, config.secret)

        if (result.id) {
            const user = await userModel.findById({ _id: result.id }).lean()

            req.user = user
            next()
        }
    } catch (error) {
        console.log("Error: ", error)
        res.status(401).json({ message: "You don't have acces to this information" })
    }
}

const onlyAdmin = (req, res, next) => {
    if (req.user && req.user.role === 1) {
        next()
    } else {
        res.status(403).json({ message: "I know who you are but Moncefs don't enter here" })
    }
}

module.exports = { verifyToken, onlyAdmin }