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

app.get("/", async (req,res) => {

    try {

        const user = await User.find()

        res.json(user)
        
    } catch (error) {
        console.log(error)

        res.status(400).json({message : "There is problem with the usernam !!"})
    }
})

app.get("/users/add", async (req,res) => {

    try {

        const user = req.body 
        const newUser = await User.creat(user)

        res.json({
            message : "The new user was added corectly",
            newUser
        })
        
    } catch (error) {
        console.log(error);
        res.status(400).json({message : "There is problem with the usernam !!"})
    }
})

app.get("/users/:username", async (req, res) => {

    try {

        const username = req.params.username
        const user = await User.findById(username)

        if(user){

            res.json(user)
        }else {
            res.json({
                message : "The user cant not found"
            })
        }
        
    } catch (error) {
        console.log(error)
        res.status(400).json({message : "There is problem with the usernam !!"})
    }
})




app.listen(port, () => {
    console.log("Server is listening at port ", port);
})