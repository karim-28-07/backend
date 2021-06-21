const express = require("express")
const router = express.Router()
const expressValidator = require("express-validator");
const { findUser, addUser, findUsername, findUserById, findUserByEmail } = require("../controllers/usercontrollers")
const {validationUsers} = require("../midelewers/userValidation")


router.get("/", findUser)

router.post("/add", validationUsers, addUser)

    console.log("username", router.post("/add"));

router.get("/username/:username", findUsername)

router.get("/id/:id", findUserById)

router.get("/email/:email", findUserByEmail)

module.exports = router


