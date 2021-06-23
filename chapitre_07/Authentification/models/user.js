const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username: { type: String, unique: true },
    password: String,
    role: Number
})

const userModel = mongoose.model("User", userSchema)

module.exports = userModel