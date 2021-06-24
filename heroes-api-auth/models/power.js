const mongoose = require("mongoose")

const powerSchema = new mongoose.Schema({
    name: { type: String, required: true , unique: true },
    force: { type: Number, required: true },
    created: { type: Date, default: Date.now }
})

const powerModel = mongoose.model("Power", powerSchema)

module.exports = powerModel