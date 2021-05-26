const express = require("express")
const cors = require("cors")
const { popularMovies, weeklyMovies, allMovies } = require("./dataMoovice.js")

const app = express()

app.use(express.json()) // permet de recevoir body json dans les requetes
app.use(cors())

// middleware avec use
app.use((req, res, next) => {
    console.log("I received a request at ", new Date().toTimeString());

    next()
})

const port = 9000

app.get("/movies/popular", (req, res) => {

    res.json(popularMovies)
})

app.get("/movies/weekly", (req, res) => {
    const dateBegin = req.query.dateBegin
    const dateEnd = req.query.dateEnd

    // On pourrait chercher dans weeklyMovies ou popularMovies les films 
    // dont la release_date et entre les deux params

    res.json(weeklyMovies)
})

// middleware pour utiliser
const checkIdValid = (req, res, next) => {
    const id = parseInt(req.params.id)

    if (isNaN(id)) {
        res.json({
            errorMessage: "The id must be a number"
        })
    } else {
        next()
    }
}

// code pour la route /movies/:id sans query params
// app.get("/movies/:id", checkIdValid, (req, res) => {
//     const id = parseInt(req.params.id)

//     const movieFound = allMovies.find(elem => {
//         return elem.id === id
//     })

//     if (movieFound) {
//         res.json(movieFound)
//     } else {
//         res.json({
//             errorMessage: "The movie was not found"
//         })
//     }
// })

// code pour la route /movies/:id AVEC query params
app.get("/movies/:id", checkIdValid, (req, res) => {
    const id = parseInt(req.params.id)
    const query = req.query

    const movieFound = allMovies.find(elem => {
        return elem.id === id
    })

    if (movieFound) {

        if (query.fields) {
            if (Object.keys(movieFound).includes(query.fields)) {

                res.json({
                    [query.fields]: movieFound[query.fields]
                })
            }
        } else {
            res.json(movieFound)
        }

    } else {
        res.json({
            errorMessage: "The movie was not found"
        })
    }
})

app.post("/movies/add", (req, res) => {
    const newMovie = req.body
    
    allMovies.push(newMovie)

    res.json({
        message: "Movie added!"
    })
})


// gestion d'erreurs
app.get('*', (req, res) => {
    res.json({
        errorMessage: "The route doesn't exist :'("
    })
})

app.listen(port, () => {
    console.log("Server à l'écoute dans le port " + port);
})