const express = require("express")
const router = express.Router()
const { signup, login } = require("../controllers/authControllers")
const {validationUsers} = require("../middelwares/userValidator")

router.post("/signup", validationUsers, signup)

router.post("/login", login)

module.exports = router