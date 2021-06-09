const mongoose = require('mongoose')
const Hero = require("./hero")

mongoose.connect("mongodb://localhost:27017/herosDB", (err) => {
    if (err) {
        console.error(err);
    } else {
        console.log("I'm connected to the database")
    }
})

const addHeros = async () => {

    try {
        await Hero.deleteMany({})

        await Hero.insertMany([
            {
                name: "Iron Man",
                powers: ["money"],
                color: "red",
                isAlive: true,
                age: 46,
                image: "https://blog.fr.playstation.com/tachyon/sites/10/2019/07/unnamed-file-18.jpg?resize=1088,500&crop_strategy=smart"
            },
            {
                name: "Thor",
                powers: ["electricity", "worthy"],
                color: "blue",
                isAlive: true,
                age: 300,
                image: "https://www.bdfugue.com/media/catalog/product/cache/1/image/400x/17f82f742ffe127f42dca9de82fb58b1/9/7/9782809465761_1_75.jpg"
            },
            {
                name: "Daredevil",
                powers: ["blind"],
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

addHeros()