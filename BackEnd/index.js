var express = require('express');
var connectToMongo = require("./db");
var cors = require('cors')


connectToMongo();

var app = express();
const port = 5000;

app.use(cors())

//Middleware to use body object ....
app.use(express.json())
app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))

var server = app.listen(port, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
});  