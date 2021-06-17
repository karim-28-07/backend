const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const {userRoutes} = require("./routes/userRoutes")
const User = require("./model/User")
const expressValidator = require("express-validator")
const passwordValidator = require("password-validator")

const app = express()
const port = 9000

app.set("view engine", "handlebars");
app.use(express.static("public"));

app.use(cors())

app.use("/users", userRoutes)

app.use(express.json())



app.listen(port, () => {
    console.log("Server is listening at port ", port);
})