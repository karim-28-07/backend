const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/garage_test", (err) => {
    if (err) {
        console.error(err)
    } else {
        console.log("I'm connected to the database");
    }
})

const carSchema = mongoose.Schema({
    brand: String,
    model: String,
    year: Number,
    created: { type: Date, default: Date.now }
})

const Car = mongoose.model("Car", carSchema);

const car1 = async () => {

    try{
        const renault = new Car({
            brand: "Renault",
            model: "Espace",
            year: 1999
        })
    
        const renaultSaved = await renault.save()
    
        console.log("renault enregistre :", renaultSaved);
        
    }catch (err) {
        console.error(err);
    }
}

// car1()

const MySecondCar = new Car ({
    brand : "Renault",
    model : "Scenic",
    year : 2004
})

MySecondCar.save()
