const express = require("express")
const mongoose = require("mongoose")
const userModel = require("./models/userModel")
const bcryptjs = require("bcryptjs")

mongoose.connect("mongodb://localhost:27017/Authentification", { useNewUrlParser: true },
{ useUnifiedTopology: true }, (err) => {
    if (err) {
        console.error(err);
    } else {
        console.log("I'm connected to the database")
    }
})

const app = express()
const port = 8005

app.use(express.json())

app.post("/signup", async (req, res) => {

    try {

        const passeword = bcryptjs.hashSync(req.body.passeword)
        const user = await userModel.create({passeword, username : req.body.username})
        res.json({user})
           
        
    } catch (error) {
        res.status(401).json({message: "The user cant not creat"}, error)
    }

})

app.listen(port, () => {
    console.log("Server is listening at port ", port);
})