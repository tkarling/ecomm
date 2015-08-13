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
// var ProductCtrl = require('./controllers/ecommWMongo');

// setup MONGOOSE w following
var ProductCtrl = require('./controllers/ProductCtrl');
var CartCtrl = require('./controllers/CartCtrl');

app.post("/api/ecomm/catalogue", ProductCtrl.create);
app.get("/api/ecomm/catalogue", ProductCtrl.read);
app.put("/api/ecomm/catalogue", ProductCtrl.update);
app.delete("/api/ecomm/catalogue", ProductCtrl.delete);

app.post("/api/ecomm/cart", CartCtrl.create);
app.get("/api/ecomm/cart", CartCtrl.read);
app.put("/api/ecomm/cart", CartCtrl.update);
app.delete("/api/ecomm/cart", CartCtrl.delete);

app.post("/api/ecomm/cart/:id/order", CartCtrl.createOrder);
app.put("/api/ecomm/cart/:id/order", CartCtrl.updateOrder);
app.delete("/api/ecomm/cart/:id/order", CartCtrl.deleteOrder);


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
