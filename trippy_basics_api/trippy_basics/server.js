const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const Hotel = require("./model/Hotel")
const Restaurant = require("./model/Restaurant")
const { findById } = require("./model/Hotel")
const { query } = require("express")

mongoose.connect("mongodb://localhost:27017/Trippy_basics", (err) => {
    if (err) {
        console.error(err);
    } else {
        console.log("I'm connected to the database")
    }
})

const port = 8000

const app = express()

const debug = (req, res, next) => {
    console.log("I received a request!");

    next()
}

app.use(cors())

app.use(express.json())
app.use(debug)

app.get("/hotels", async (req, res) => {

    try {

        const hotels = await Hotel.find()
        res.json(hotels)

    } catch (err) {
        console.log(err)
        res.status(500).json({ errormessage: "There was a problem :(" })
    }

})

app.get("/hotels/:id", async (req, res) => {

    try {

        const hotelId = req.params.id
        const hotel = await Hotel.findById(hotelId)
        if (hotel) {
            res.json({ hotel })
        } else {
            res.json({
                message: "Hotel not found"
            })
        }

    } catch (err) {
        console.log(err)
        res.status(500).json({ errormessage: "There was a problem :(" })
    }
})

app.post("/hotels", async (req, res) => {
    try {

        const hotel = req.body
        const newHotel = await Hotel.create(hotel)
        res.json({
            message: "Ok, hotel name was created!",
            newHotel
        })
    } catch (err) {
        console.error(err)

        res.status(500).json({ errorMessage: "There was a problem :(" })
    }
})

app.put("/hotels/:id", async (req, res) => {

    try {

        const hotelId = req.params.id
        const name = req.query.name
        console.log("hotelId", hotelId);
        console.log("name", name);
        // const hotel = await Hotel.findById(hotelId)

        const hotel = await Hotel.updateOne({ _id: hotelId }, { name: name })

        res.json(hotel)

    } catch (error) {
        console.log(error);
        res.status(500).json({ errorMessage: "There was a problem :(" })
    }
})

app.delete("/hotels/:id", async (req, res) => {

    try {

        const hotelId = req.params.id
        const deleteHotel = await Hotel.findByIdAndDelete(hotelId)

        res.json({
            message: "The hotel was delete correctly"
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ errorMessage: "There was a problem :(" })
    }
})

app.get("/restaurants", async (req, res) => {

    try {

        const restaurants = await Restaurant.find()
        res.json(restaurants)

    } catch (error) {
        console.log(error);
        res.status(500).json({ errorMessage: "There was a problem :(" })
    }
})

app.get("/restaurants/:id", async (req, res) => {

    try {

        const restaurantsId = req.params.id
        const restaurants = await Restaurant.findById(restaurantsId)

        if (restaurants) {

            res.json(restaurants)
        } else {
            res.json({
                message: "Restaurent not found"
            })
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ errorMessage: "There was a problem :(" })
    }
})

app.post("/restaurants/", async (req, res) => {
    try {

        const restaurant = req.body
        const newRestaurant = await Restaurant.create(restaurant)

        res.json({
            message: "The restaurant wes be added correctly",
            newRestaurant
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({ errorMessage: "There was a problem :(" })
    }
})

app.put("/restaurants/:id", async (req, res) => {

    try {

        const restaurantsId = req.params.id
        const name = req.query.name
        console.log("restaurantsId", restaurantsId);
        console.log("name", name);

        const restaurants = await Restaurant.updateOne({ _id: restaurantslId }, { name: name })

        res.json(restaurants)

    } catch (error) {
        console.log(error);
        res.status(500).json({ errorMessage: "There was a problem :(" })
    }
})

app.delete("/restaurants/:id", async (req, res) => {

    try {

        const restaurantsId = req.params.id
        const deleteRestaurant = await Restaurant.findByIdAndDelete(restaurantsId)

        res.json({
            message: "The restaurant was be deleted correctly"
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({ errorMessage: "There was a problem :(" })
    }
})

app.get("*", (req, res) => {
    res.json({
        errorMessage: "The route was not found"
    }, 404)
})

app.listen(port, () => {
    console.log("Server is listening at port ", port);
})
