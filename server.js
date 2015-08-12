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
    // console.log("post: ", req.body);
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

app.put("/api/ecomm/catalogue", function(req, res) {
    // console.log("put: params: ", req.params, " body: ", req.body,
    //     " query: ", req.query, req.query.product);
    if (!req.query.id) {
        res.status(400).send('id query needed!');
    }
    var query = {
        _id: mongojs.ObjectId(req.query.id)
    };
    var update = {
        $set: req.body
    };
    db.catalogue.findAndModify({
        query: query,
        update: update
        },
        function(err, doc, lastErrorObject) {
            // console.log("put: ", err, doc, lastErrorObject);
            if (err) {
                res.status(500).json(err);
            } else {
                console.log("put: ", doc);
                res.json(doc);
            }

        });

    // db.catalogue.update({ "product": req.query.id },
    //  // req.query,
    // // {
    // //     "_id": ObjectId(req.query.id)
    // // },
    // req.body, function(err, doc) {
    //     console.log("put", err, doc);
    //     if (err) {
    //         res.status(500).json(err);
    //     } else {
    //         console.log("put: ", doc);
    //         res.json(doc);
    //     }
    // });
});

app.delete("/api/ecomm/catalogue", function(req, res) {
    console.log("delete: ", req.query, req.query.product);
    if (!req.query.id) {
        res.status(400).send('id query needed!');
    }
    var query = {
        _id: mongojs.ObjectId(req.query.id)
    };
    db.catalogue.remove(query, function(err, response) {
        if (err) {
            res.status(500).json(err);
        } else {
            res.status(200).json(response);
        }
    });
});

var server = app.listen(nodePort, function() {
    console.log("Listening at address", server.address());
});
