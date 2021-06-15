const mongoose = require("mongoose")

// Création du shéma pour la Bd userBD dans un fichier a part et l'utiliser partout 

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    age: Number,
    ville: String,
    created: { type: Date, default: Date.now }
})

const User = mongoose.model("User", userSchema)

module.exports = User