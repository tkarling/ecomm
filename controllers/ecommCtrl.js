var Product = require('../models/Product');

module.exports = {

    create: function(req, res) {
        var newProduct = new Product(req.body);
        newProduct.save(function(err, result) {
            if (err) return res.status(500).send(err);
            else res.send(result);
        });
    },
    read: function(req, res) {
        Product.find(req.query)
            .exec(function(err, result) {
                if (err) return res.status(500).send(err);
                else res.send(result);
            });
    },

    update: function(req, res) {
        // console.log("update", req.query.id, req.body);
        Product.findByIdAndUpdate(req.query.id, req.body, function(err, result) {
            if (err) return res.status(500).send(err);
            else res.send(result);
        });
    },

    delete: function(req, res) {
        // console.log("delete", req.query.id);
        Product.findByIdAndRemove(req.query.id, function(err, result) {
            if (err) return res.status(500).send(err);
            else res.send(result);
        });
    }
};
