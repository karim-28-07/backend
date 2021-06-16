const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const { debug } = require("./middlewares/debug")
const { heroesRoutes } = require("./routes/heroesRoutes")

mongoose.connect("mongodb://localhost:27017/herosDB", { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if (err) {
        console.error(err);
    } else {
        console.log("I'm connected to the database")
    }
})

const port = 8000

const app = express()

app.use(cors())

app.use(express.json())

app.use(debug)

app.use("/heroes", heroesRoutes)

app.listen(port, () => {
    console.log("Server is listening at port ", port);
})