const express = require("express")
const router = express.Router()
const { signup, login } = require("../controllers/authController")
const { validationSignup, validationLogin } = require("../middlewares/validationsMiddlewares")
const { continueIfUserExists } = require("../middlewares/authMiddlewares")

router.post("/signup", validationSignup, signup)

router.post("/login", validationLogin, continueIfUserExists, login)

module.exports = router