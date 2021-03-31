const express = require('express');
const app = express();

const port = 8000;
app.listen(port, () => {
  console.log('Server started on port: ' + port);
});

// app.get('/authors/1/', (req, res) => {
//     res.send('Lawrence Nowell, UK');
//   });

//   app.get('/authors/2/', (req, res) => {
//     res.send('William Shakespeare, UK');
//   });

//   app.get('/authors/3/', (req, res) => {
//     res.send('Charles Dickens, US');
//   });

//   app.get('/authors/4/', (req, res) => {
//     res.send('Oscar Wilde, UK');
//   });

  

  var authors = [

     "Lawrence Nowell, UK",
     "William Shakespeare, UK",
     "Charles Dickens, US",
     "Oscar Wilde, UK",
    ]
    
    app.get('/authors/1/', (req, res) => {
  
      res.send(authors[0]);
  
    });
    app.get('/authors/2/', (req, res) => {
  
      res.send(authors[1]);
  
    });
    app.get('/authors/3/', (req, res) => {
  
      res.send(authors[2]);
  
    });
    app.get('/authors/4/', (req, res) => {
  
      res.send(authors[3]);
  
    });

    



   
 







  



  