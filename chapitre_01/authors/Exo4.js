const express = require('express');
const app = express();

const port = 8000;
app.listen(port, () => {
    console.log('Server started on port: ' + port);
});


var authors = [

    {
        name: "Lawrence Nowell",
        nationality: "UK"
    },

    {
        books: ["Beowulf"]
    }

]

app.get('/json/authors/:id', (req, res) => {
    res.send(authors[0])
});
app.get('/json/authors/:id/books', (req, res) => {
    res.send(authors[1])
});

    
    



