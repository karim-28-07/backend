const mongoose = require("mongoose")

// Création du shéma pour la Bd herosDB dans un fichier a part et l'utiliser partout 

const heroSchema = new mongoose.Schema({
    name: String,
    powers: [String],
    color: String,
    isAlive: Boolean,
    age: Number,
    image: String,
    created: { type: Date, default: Date.now }
})

const Hero = mongoose.model("Hero", heroSchema)

module.exports = Hero