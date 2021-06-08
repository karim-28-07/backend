const express = require("express")
const cors = require("cors")
// const { superHeros } = require("./dataHeros.js")

const mongoose = require("mongoose")

mongoose.connect("mongodb://localhost:27017/heros", (err) => {
    if (err) {
        console.error(err)
    } else {
        console.log("I'm connected to the database");
    }
})

const heroShema = new mongoose.Schema({
    name: String,
    power: Array,
    color: String,
    isAlive: Boolean,
    age: Number,
    image: String,
    date: { type: Date, default: Date.now }

})

const hero = mongoose.model('hero', heroShema)

hero.insertMany([
    {
        name: "iron man",
        power: ["money"],
        color: "red",
        isAlive: true,
        age: 46,
        image: "https://blog.fr.playstation.com/tachyon/sites/10/2019/07/unnamed-file-18.jpg?resize=1088,500&crop_strategy=smart"
    },
    {
        name: "thor",
        power: ["electricty", "worthy"],
        color: "blue",
        isAlive: true,
        age: 300,
        image: "https://www.bdfugue.com/media/catalog/product/cache/1/image/400x/17f82f742ffe127f42dca9de82fb58b1/9/7/9782809465761_1_75.jpg"
    },
    {
        name: "daredevil",
        power: ["blind"],
        color: "red",
        isAlive: false,
        age: 30,
        image: "https://aws.vdkimg.com/film/2/5/1/1/251170_backdrop_scale_1280xauto.jpg"
    }
]).then(data => {
    // console.log(data);
}).catch(err => {
    console.error("Error insertMany heros: ", err);
})


const app = express()

app.use(express.json()) // permet de recevoir body json dans les requetes de postMan
app.use(cors())

// middleware avec use

const debug = ((req, res, next) => {
    console.log("I recieved the response")

    next()
})

app.use(debug)

const port = 9000

app.get("/heros", async (req, res) => {

    try {
        const heros = await hero.find().exec()
        res.json(heros)
    } catch (error) {
        console.error("Error in GET /heros", error)

        res.json({
            message: "Error when finding heors :("
        })
    }
})

app.get("/heros/:name", async (req, res) => {

    try {
        const name = req.params.name
        console.log("name : ", req.params.name)
        const listHeros = await hero.findOne({ name: name })
        res.json({ listHeros })

    } catch (error) {

        res.json({
            listHeros
        })
    }
})

app.get("/heros/:name/powers", async (req, res) => {
    
    try {
        const nameHero = req.params.name
        console.log("nameHero", nameHero)
        // const listPowerHeros = await hero.findOne({ name: nameHero })
        // res.json(listPowerHeros.power)

    } catch (error) {

        res.json({
           message: "error"
        })
    }
})








// gestion d'erreurs

app.get('*', (req, res) => {
    res.json({
        errorMessage: "The route doesn't exist :'("
    })
})

app.listen(port, () => {
    console.log("Server à l'écoute dans le port " + port);
})







