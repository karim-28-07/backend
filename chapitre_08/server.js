const express= require("express")
const cors= require("cors")
const mongoose= require("mongoose")
const router = require("./express_login/routes/authRoutes")


mongoose.connect("mongodb://localhost:27017/Login", { useNewUrlParser: true },
{ useUnifiedTopology: true }, (err) => {
    if (err) {
        console.error(err);
    } else {
        console.log("I'm connected to the database")
    }
})

const app= express()
const port = 8080


app.use(express.json())
app.use("/auth", router)

app.post("/")

app.listen(port, () => {
    console.log("Server is listening at port ", port);
})