const mongoose = require("mongoose")
const User = require("./User")

mongoose.connect("mongodb://localhost:27017/userBD",{ useNewUrlParser: true },
{ useUnifiedTopology: true }, (err) => {
    if (err) {
        console.error(err);
    } else {
        console.log("I'm connected to the database")
    }
})

const addUsers = async () => {

    try {

        await User.insertMany([

            {
                username: "karim",
                email: "karim.mezouar@gmail.com",
                age: 33,
                ville: "Paris"
            },
            {
                username: "Amir",
                email: "amir.konexio@gmail.com",
                age: 32,
                ville: "Tokyo"
            },
            {
                username: "Mugi",
                email: "mugi.konexio@gmail.com",
                age: 25,
                ville: "Los Angeles"
            },
        ])
    } catch (error) {
        console.log(error);
    }
}

addUsers()