var express = require("express");
// var mongojs = require("mongojs");
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

// mongojs specific starts
var dbMongo = require('./controllers/ecommWMongo');
app.post("/api/ecomm/catalogue", dbMongo.create);
app.get("/api/ecomm/catalogue", dbMongo.read);
app.put("/api/ecomm/catalogue", dbMongo.update);
app.delete("/api/ecomm/catalogue", dbMongo.delete);
// mongojs specific ends

var server = app.listen(port, function() {
    console.log("Listening at address", server.address());
});
