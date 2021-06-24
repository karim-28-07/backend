const expressValidator = require("express-validator");
const passwordValidator = require('password-validator');

const validate = (req, res, next) => {
    const errors = expressValidator.validationResult(req);

    if (!errors.isEmpty()) {
        // TODO: send the information about the validation errors
        res.status(400).json({ errors: "Please send data in the good format" })
    } else {
        next()
    }
}

const validationPower = [
    expressValidator.body("name").exists().isString(),
    expressValidator.body("force").exists().isInt({ min: 1, max: 1000 }),
    validate
]

const validationForcePower = [
    expressValidator.body("force").exists().isInt({ min: 1, max: 1000 }),
    validate
]

const validationSignup = [
    expressValidator.body("email").exists().isEmail(),
    expressValidator.body("role").exists().isInt(),
    expressValidator.body("password").exists().isString().custom(value => {
        const schema = new passwordValidator()

        schema
            .is().min(4)
            .is().max(30)
            .has().uppercase()
            .has().lowercase()
            .has().symbols()
            .has().digits(2)
            .has().not().spaces()
            .is().not().oneOf(["Salut-12"])

        return schema.validate(value);

    }),
    expressValidator.body(["firstName", "lastName"]).exists().isString(),
    validate
]

const validationLogin = [
    expressValidator.body("email").exists().isEmail(),
    expressValidator.body("password").exists().isString(),
    validate
]

module.exports = {
    validationPower,
    validationForcePower,
    validationSignup,
    validationLogin
}