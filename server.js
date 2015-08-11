var express = require("express");
var mongojs = require("mongojs");
var bodyParser = require("body-parser");
var cors = require("cors");

var app = express();
var nodePort = 3038;

//Run mongoDB
var db = mongojs('ecomm', ['catalogue']);
var port = 27017;


// MIDDLEWARE
app.use(express.static("public"));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(cors());

app.post("/api/ecomm/catalogue", function(req, res) {
    console.log("post: ", req.body);
    db.catalogue.insert(req.body, function(err, result) {
        if (err) {
            res.status(500).json(error);
        } else {
            console.log("post: ", req.body);
            res.json(result);
        }
    });
});

app.get("/api/ecomm/catalogue", function(req, res) {
    db.catalogue.find(function(err, docs) {
        if (!err) {
            console.log("get: ", docs);
            res.json(docs);
        } else {
            res.status(500).json(error);
        }
    });
});

var server = app.listen(nodePort, function() {
    console.log("Listening at address", server.address());
});
