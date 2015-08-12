var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");

var app = express();
var port = 3038;

// MIDDLEWARE
app.use(express.static("public"));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(cors());

// setup MONGOJS w following
// var ecommCtrl = require('./controllers/ecommWMongo');

// setup MONGOOSE w following
var ecommCtrl = require('./controllers/ecommCtrl');

app.post("/api/ecomm/catalogue", ecommCtrl.create);
app.get("/api/ecomm/catalogue", ecommCtrl.read);
app.put("/api/ecomm/catalogue", ecommCtrl.update);
app.delete("/api/ecomm/catalogue", ecommCtrl.delete);

// MONGOOSE specific stuff starts
var mongoose = require('mongoose');
var mongoUri = 'mongodb://localhost:27017/ecomm';
mongoose.set('debug', true);
mongoose.connect(mongoUri);
mongoose.connection.once('open', function() {
  console.log('connected to mongoDB at: ', mongoUri);
});
// MONGOOSE specific stuff ends

var server = app.listen(port, function() {
    console.log("Listening at address", server.address());
});
