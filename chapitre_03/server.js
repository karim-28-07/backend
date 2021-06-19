const express = require('express');
const multer = require('multer');
const cors = require("cors")
const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose")
const User = require("./model/User")

mongoose.connect("mongodb://localhost:27017/upload", (err) => {
    if (err) {
        console.error(err);
    } else {
        console.log("I'm connected to the database")
    }
})

const upload = multer({ dest: 'public/uploads/' });

const port = 8050

const app = express();

app.use(cors())
app.use(express.json())

app.use(express.static('public'));

app.get("/users", async (req, res) => {

    try {

        const users = await User.find({})
        res.json(users)

    } catch (error) {
        console.log("Error:", error)

        fs.rmSync(req.file.path)

        res.status(500).json({ message: "Erreur dans la requête" })
    }
})

app.post('/users/add', upload.single('new-image'), async (req, res) => {

    try {
        console.log("req.body", req.body);
        console.log("req.file", req.file);

        const date = new Date().toISOString().slice(0,10).replace(/-/g,"");
        const extension = req.file.originalname.split(".")[1]
        const newImageName = req.body.name + "_" + date + "." + extension

        const userAdded = await User.create({
            name: req.body.name,
            profilePicture: req.file.originalname
        })

        fs.renameSync(req.file.path, path.join(req.file.destination, req.file.originalname));

        res.json({
            message: "User ajouté correctement",
            userAdded
        });

    } catch (error) {
        res.status(500).json({ message: "Erreur dans la requête" })
    }

});

app.listen(port, () => {
    console.log("The server is listing in the port: ", port)
})
