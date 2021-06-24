const mongoose = require("mongoose")

// Création du shéma pour la Bd Trippy_basics dans un fichier a part et l'utiliser partout 

const RestaurantSchema = new mongoose.Schema({
    name: String,
    adress: String,
    city: String,
    country: String,
    stars: Number,
    cuisine: String,
    priceCategory: Number,
    created: { type: Date, default: Date.now }
})

const Restaurant = mongoose.model("Restaurant", RestaurantSchema)

module.exports = Restaurant