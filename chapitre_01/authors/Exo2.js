const express = require('express');
const app = express();

const port = 8000;
app.listen(port, () => {
  console.log('Server started on port: ' + port);
});

app.get('/authors/1/', (req, res) => {
    res.send('Lawrence Nowell, UK');
  });

  app.get('/authors/2/', (req, res) => {
    res.send('William Shakespeare, UK');
  });

  app.get('/authors/3/', (req, res) => {
    res.send('Charles Dickens, US');
  });

  app.get('/authors/4/', (req, res) => {
    res.send('Oscar Wilde, UK');
  });


//   app.get('/authors/: name/country/:country', (req, res) => {
//     res.send(`authors ${req.params.name} ,  ${req.params.country}`);
//   });
