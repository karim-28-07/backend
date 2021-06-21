const expressValidator = require("express-validator");

const validationUsers = [

    expressValidator.body("username").isLength({ min: 3 }),
    expressValidator.body("email").isEmail(),
    expressValidator.body("age").isInt().isLength({ min: 2, max: 2 }),
    expressValidator.body("ville").custom(value => {
        if (value === "Paris" || value === "Los Angeles" || value === "Tokyo") {
            return value
        } else {
            return false
        }
    })
]

module.exports = {
    validationUsers
}
