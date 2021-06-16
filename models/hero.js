const mongoose = require("mongoose")

const heroSchema = new mongoose.Schema({
    name: { type: String, unique: true },
    powers: [{
        type: mongoose.Types.ObjectId,
        ref: "Power"
    }],
    color: String,
    isAlive: Boolean,
    age: Number,
    image: String,
    created: { type: Date, default: Date.now }
})

const heroModel = mongoose.model("Hero", heroSchema)

module.exports = heroModel