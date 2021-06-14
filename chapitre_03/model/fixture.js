const mongoose = require('mongoose')
const User = require("./User")

mongoose.connect("mongodb://localhost:27017/UserDB", (err) => {
    if (err) {
        console.error(err);
    } else {
        console.log("I'm connected to the database")
    }
})

const addUsers = async () => {

    try {
       
        await User.insert([
            {
                name: "Karim",
                profilePicture: "Karim.png",
                
            },
           
        ])

        console.log("The collection Users was recreated with the base data");
        
    } catch (err) {
        console.error(err)
    }
}

addUsers()