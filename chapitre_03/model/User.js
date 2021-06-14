const mongoose = require("mongoose")

// Création du shéma pour la Bd herosDB dans un fichier a part et l'utiliser partout 

const userSchema = new mongoose.Schema({
    name: String,
    profilePicture : String,
    created: { type: Date, default: Date.now }
})

const User = mongoose.model("User", userSchema)

module.exports = User