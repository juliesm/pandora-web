var PBAuto = require("pandora-node");
var http = require('http');
var path = require('path');

var pb = new PBAuto({ip: '10.45.114.39'});

var express = require("express");
var bodyParser = require("body-parser");
var app = express();

app.use(bodyParser.json({limit:'50mb'}));
app.use(bodyParser.urlencoded({ extended: true }));

allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Authorization, Content-Length, X-Requested-With, Accept');
  if ('OPTIONS' === req.method) {
    res.sendStatus(200);
  } else {
    next();
  }
};

app.use(allowCrossDomain);

app.use('/static', express.static(path.join(__dirname, 'public')));
 
var routes = require("./routes/route.js")(app);


app.listen(4100,"10.45.114.39");

console.log("Listening");

