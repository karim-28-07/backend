const mongoose = require('mongoose')
const Hotel = require("./Hotel")
const Restaurant = require("./Restaurant")

mongoose.connect("mongodb://localhost:27017/Trippy_basics", (err) => {
    if (err) {
        console.error(err);
    } else {
        console.log("I'm connected to the database")
    }
})

const addHotel = async () => {

    try {

        await Hotel.deleteMany({})

        await Hotel.insertMany({
            name: "hotel des canettes",
            adress: "17 rue des canettes",
            city: "Paris",
            country: "France",
            stars: 3,
            hasSpa: false,
            hasPool: false,
            priceCategory: 2,
            
        })

        console.log("The collection heros was recreated with the base data");
    
    } catch (err) {
        console.error(err)
    }
}

addHotel()

const addRestaurant = async () => {

    try {

        await Restaurant.deleteMany({})

        await Restaurant.insertMany({
            name: "Oneil",
            adress: "18 rue des canettes",
            city: "Paris",
            country: "France",
            stars: 3,
            cuisine: "frensh",
            priceCategory: 3,
            
        })

        console.log("The collection heros was recreated with the base data");
    
    } catch (err) {
        console.error(err)
    }
}

addRestaurant()
