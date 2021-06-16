const mongoose = require("mongoose")

const powerSchema = new mongoose.Schema({
    name: { type: String, unique: true },
    force: Number,
    created: { type: Date, default: Date.now }
})

const powerModel = mongoose.model("Power", powerSchema)

module.exports = powerModel