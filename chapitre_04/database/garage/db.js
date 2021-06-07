
const mongoose = require("mongoose")

mongoose.connect("mongodb://localhost:27017/garage", (err) => {
    if (err) {
        console.error(err)
    } else {
        console.log("I'm connected to the database");
    }
})

const carShema = new mongoose.Schema ({
    modele : String,
    marque : String,
    year : Number,
    Created : {type: Date, default : Date.now }
});

const car = mongoose.model('car', carShema)

 const MyFirstCar = new car ({
    marque : "Renault",
    modele : "Espace",
    year : 1999
})

// MyFirstCar.save()

const MySecondCar = new car ({
    marque : "Renault", 
    modele : "Scenic", 
    year : 2004
})

// MySecondCar.save()

const MyThirdCar = new car ({
    marque : "peugeot", 
    modele : "308", 
    year : 2017
})

// MyThirdCar.save()

car.findById({_id: "60be1877ce7d1d41388dc6d9"}, (err, car) => {
    if (!err) {
      console.log(car); 
    }
  });

    

const UpdateCar = async () => {
    const UpdateYear = await car.update({_id :"60be1877ce7d1d41388dc6d9"}, {year : 2000})
}

UpdateCar()

const DeleteCar = async () => {
    const DeleteTwoCars = await car.deleteMany({marque : "Renault"})
}

DeleteCar()

const MoreCars = [
    
    { marque: 'Aston Martin',modele: 'DB9', year : 2010 },
    {marque: 'Range Rover',modele: 'Discovery Sport', year : 2017}
    
    ];

car.insertMany(MoreCars, function(error, docs) {});