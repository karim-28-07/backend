const expressValidator = require("express-validator");

const validationUsers = [

    expressValidator.body("email").isEmail(),
    expressValidator.body("password").isLength({ min: 8 }).has().uppercase()
    .has().lowercase().has().digits(2).has().not().spaces(),
    expressValidator.body("firstName").isLength({ min: 2, max: 18 }),
    expressValidator.body("surname").isLength({ min: 2, max: 18 }),
    
]

module.exports = {
    validationUsers
}