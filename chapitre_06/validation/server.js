const express = require("express")
const expressValidator = require("express-validator")
const passwordValidator = require("password-validator")
const expressHandlebars = require("express-handlebars")

const app = express()
const port = 9000

app.engine("handlebars", expressHandlebars());
app.set("view engine", "handlebars");
app.use(express.static("public"));

app.use(cors())

app.use(express.json())



app.listen(port, () => {
    console.log("Server is listening at port ", port);
})