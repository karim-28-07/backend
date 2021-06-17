const express = require("express")
const router = express.Router()
const expressValidator = require("express-validator");
const {findUser, addUser, findUsername} = require("../controllers/usercontrollers")

router.get("/", findUser)

router.post("/add", addUser)

router.get("/:username", findUsername)

module.exports = router


