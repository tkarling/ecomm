'use strict';

var mongojs = require("mongojs");
var mongoUri = 'mongodb://localhost:27017/ecomm';
var db = mongojs(mongoUri, ['catalogue']);

module.exports = {

    create: function(req, res) {
        // console.log("post: ", req.body);
        db.catalogue.insert(req.body, function(err, result) {
            if (err) {
                res.status(500).json(error);
            } else {
                console.log("post: ", req.body);
                res.json(result);
            }
        });
    },

    read: function(req, res) {
    	console.log("read");
        db.catalogue.find(function(err, docs) {
        	console.log("moi");
            if (!err) {
                console.log("get: ", docs);
                res.json(docs);
            } else {
                res.status(500).json(error);
            }
        });
    },

    update: function(req, res) {
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
    },

    delete: function(req, res) {
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
    }

};
