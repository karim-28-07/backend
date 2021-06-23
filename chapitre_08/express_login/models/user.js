const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    email: {type : String, require : true},
    password: String,
    firstName: String,
    surname: String,
    date: {type: Date}
})

const userModel = mongoose.model("User", userSchema)

module.exports = userModel