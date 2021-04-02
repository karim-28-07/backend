const express = require('express');
const app = express();

const port = 8000;
app.listen(port, () => {
  console.log('Server started on port: ' + port);
});

var listBooks = [
    "Beowulf",
    "Hamlet, Othello, Romeo and Juliet, MacBeth",
    "Oliver Twist, A Christmas Carol",
    "The Picture of Dorian Gray, The Importance of Being Earnest"

]


app.get('/authors/:id/books/', (req, res) => {

  var indexArray = req.params.id - 1;

  var books = listBooks[indexArray]
  
    res.send(books);

  });


