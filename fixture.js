const mongoose = require('mongoose')
const heroModel = require("./model/hero")
const powerModel = require("./model/power")

mongoose.connect("mongodb://localhost:27017/herosDB", (err) => {
    if (err) {
        console.error(err);
    } else {
        console.log("I'm connected to the database")
    }
})

const addHeros = async () => {

    try {
        await heroModel.deleteMany({})
        await powerModel.deleteMany({})

        const powers = await powerModel.insertMany([
            {
                name: "money",
                force: 0
            },
            {
                name: "electricity",
                force: 100
            },
            {
                name: "worthy",
                force: 200
            },
            {
                name: "blind",
                force: 5
            },
            {
                name: "fly",
                force: 75
            }
        ])

        console.log("powers", powers)

        await heroModel.insertMany([
            {
                name: "Iron Man",
                powers: [powers[0]],
                color: "red",
                isAlive: true,
                age: 46,
                image: "https://blog.fr.playstation.com/tachyon/sites/10/2019/07/unnamed-file-18.jpg?resize=1088,500&crop_strategy=smart"
            },
            {
                name: "Thor",
                powers: [powers[1], powers[2], powers[4]],
                color: "blue",
                isAlive: true,
                age: 300,
                image: "https://www.bdfugue.com/media/catalog/product/cache/1/image/400x/17f82f742ffe127f42dca9de82fb58b1/9/7/9782809465761_1_75.jpg"
            },
            {
                name: "Daredevil",
                powers: [powers[3]],
                color: "red",
                isAlive: false,
                age: 30,
                image: "https://aws.vdkimg.com/film/2/5/1/1/251170_backdrop_scale_1280xauto.jpg"
            }
        ])

        console.log("The collection heros was recreated with the base data");

    } catch (err) {
        console.error(err)
    }
}

// addHeros()

const showHeros = async () => {
    try {
        const heros = await heroModel.find({}).populate("powers")

        console.log("heros", heros);
        console.log("heros 1st", heros[1].powers);

    } catch (error) {
        console.log(error)
    }
}

showHeros()