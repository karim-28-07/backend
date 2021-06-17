const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const userRoutes = require("./routes/userRoutes")
const User = require("./model/User")

mongoose.connect("mongodb://localhost:27017/userBD",{ useNewUrlParser: true },
{ useUnifiedTopology: true }, (err) => {
    if (err) {
        console.error(err);
    } else {
        console.log("I'm connected to the database")
    }
})

const app = express()
const port = 9000


app.use(cors())

app.use("/users", userRoutes)

app.use(express.json())



app.listen(port, () => {
    console.log("Server is listening at port ", port);
})