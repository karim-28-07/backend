const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username: {type : String, require : true},
    passeword: String
})

const userModel = mongoose.model("userModel", userSchema)

module.exports = userModel