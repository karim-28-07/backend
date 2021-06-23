const express= require("express")
const cors= require("cors")
const mongoose= require("mongoose")
const userModel = require("./express_login/models/user")

mongoose.connect("mongodb://localhost:27017/Authentification", { useNewUrlParser: true },
{ useUnifiedTopology: true }, (err) => {
    if (err) {
        console.error(err);
    } else {
        console.log("I'm connected to the database")
    }
})

const app= express()
const port = 8080

app.use(express.json())

app.post("/signup")