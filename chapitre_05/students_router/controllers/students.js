const mongoose = require("mongoose")

const studentsSchema = mongoose.Schema({
    name: String,
    age: Number,
    date: { type: Date, default: Date.now }
})

const Student = mongoose.model("Student", studentsSchema)

module.exports = Student
