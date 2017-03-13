var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var morgan = require("morgan");

var app = express();

app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, '..', 'public')));
var port = process.env.PORT || 8000; 

app.listen(port, function () {
    console.log("Now listening on port " + port);
});