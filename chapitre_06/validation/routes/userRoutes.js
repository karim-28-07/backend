const express = require("express")
const router = express.Router()
const expressValidator = require("express-validator");
const { findUser, addUser, findUsername } = require("../controllers/usercontrollers")

router.get("/", findUser)

router.post("/add",
    expressValidator.body("username").isLength({ min: 3 }),
    expressValidator.body("email").isEmail(),
    expressValidator.body("age").isInt().isLength({ min: 2, max: 2 }),
    expressValidator.body("ville").custom(value => {
        if (value === "Paris" || value === "Los Angeles" || value === "Tokyo") {
            return value
        } else {
            return false
        }

    }), addUser)

    console.log("username", router.post("/add"));

router.get("/:username", findUsername)

module.exports = router


