const express = require('express');
const app = express();

const port = 8000;
app.listen(port, () => {
  console.log('Server started on port: ' + port);
});



app.get('/authors/:id/', (req, res) => {

  var id = req.params.id;

  var listAuthors = [
    "Lawrence Nowell, UK",
    "William Shakespeare, UK",
    "Charles Dickens, US",
    "Oscar Wilde, UK",
  ]


  var infoAuthors = listAuthors[id - 1]

  res.send(infoAuthors);

});



