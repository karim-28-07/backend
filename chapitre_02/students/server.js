const express = require("express")
const cors = require("cors")
const { students} = require("./studentsListe.js")

const app = express()

app.use(express.json()) // permet de recevoir body json dans les requetes
app.use(cors())

// middleware avec use
app.use((req, res, next) => {


    next()
})

const port = 9000

app.get("/students", (req,res) => {
    res.json(students)
})

app.post("/students", (req,res)=>{
    const newStudents = req.body.name
    students.push(newStudents)

    
    })


app.listen(port, () => {
    console.log("Server à l'écoute dans le port " + port);
})
