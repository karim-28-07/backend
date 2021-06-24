const mongoose = require("mongoose")

// Création du shéma pour la Bd Trippy_basics dans un fichier a part et l'utiliser partout 

const HotelSchema = new mongoose.Schema({
    name: String,
    adress: String,
    city: String,
    country: String,
    stars: Number,
    hasSpa: Boolean,
    hasPool: Boolean,
    priceCategory: Number,
    created: { type: Date, default: Date.now }
})

const Hotel = mongoose.model("Hotel", HotelSchema)

module.exports = Hotel