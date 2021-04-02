const express = require('express');
const app = express();

const port = 8000;
app.listen(port, () => {
    console.log('Server started on port: ' + port);
});

var authors = [
    {
        name: "Lawrence Nowell",
        nationality: "UK",
        books: ["Beowulf"]
    },
    {
        name: "William Shakespeare",
        nationality: "UK",
        books: ["Hamlet", "Othello", "Romeo and Juliet", "MacBeth"]
    },
    {
        name: "Charles Dickens",
        nationality: "US",
        books: ["Oliver Twist", "A Christmas Carol"]
    },
    {
        name: "Oscar Wilde",
        nationality: "UK",
        books: ["The Picture of Dorian Gray", "The Importance of Being Earnest"]
    },
]

app.get('/json/authors/:id', (req, res) => {
    var indexArray = req.params.id - 1;

    var author = authors[indexArray]

    var resultObj = {
        name: author.name,
        nationality: author.nationality
    }


    res.json(resultObj)
});
app.get('/json/authors/:id/books', (req, res) => {

    var id = req.params.id;

    var author = authors[id - 1]
    res.json({
        books : author.books
    })
});

    
    



