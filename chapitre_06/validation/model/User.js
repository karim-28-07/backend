const mongoose = require("mongoose")

// Création du shéma pour la Bd userBD dans un fichier a part et l'utiliser partout 

const userSchema = new mongoose.Schema({
    username: {type : String, require : true},
    email: {type : String, require : true},
    age: Number,
    ville: String,
    created: { type: Date, default: Date.now }
})

const User = mongoose.model("User", userSchema)

module.exports = User