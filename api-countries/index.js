var express = require('express');
var app = express();


var port = 8000;
app.listen(port, () => {
    console.log('Server started on port: ' + port);
});

app.get('/countries', function (req, res) {
    var countries = ["Algeria","Morocco", "Tunisia","Argentina","France"]
    res.send(countries)
});