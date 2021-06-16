const express = require("express")
const cors = require("cors")
const expressValidator = require("express-validator")
const passwordValidator = require("password-validator")
const User = require("./model/User")
// const expressHandlebars = require("express-handlebars")

const app = express()
const port = 9000

// app.engine("handlebars", expressHandlebars());
app.set("view engine", "handlebars");
app.use(express.static("public"));

app.use(cors())

app.use(express.json())

app.get("/username", async (req,res) => {

    try {

        const username = await User.find()

        res.json(username)
        
    } catch (error) {
        console.log(error)

        res.status(400).json({message : "There is problem with the usernam !!"})
    }
})


app.listen(port, () => {
    console.log("Server is listening at port ", port);
})