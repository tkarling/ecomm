var Cart = require('../models/Cart');

module.exports = {

    create: function(req, res) {
        var newCart = new Cart(req.body);
        newCart.save(function(err, result) {
            if (err) return res.status(500).send(err);
            else res.send(result);
        });
    },
    read: function(req, res) {
        Cart.find(req.query)
            .populate("order.product")
            .exec(function(err, result) {
                if (err) return res.status(500).send(err);
                else res.send(result);
            });
    },

    update: function(req, res) {
        // console.log("update", req.query.id, req.body);
        Cart.findByIdAndUpdate(req.query.id, req.body, function(err, result) {
            if (err) return res.status(500).send(err);
            else res.send(result);
        });
    },

    delete: function(req, res) {
        // console.log("delete", req.query.id);
        Cart.findByIdAndRemove(req.query.id, function(err, result) {
            if (err) return res.status(500).send(err);
            else res.send(result);
        });
    },

    createOrder: function(req, res) {
        Cart.findByIdAndUpdate(
            req.params.id,
            // req.body,
            {
                $push: {
                    order: req.body
                }
            },
            function(err, result) {
                if (err) return res.status(500).send(err);
                res.send(result);
            });
    },

    updateOrder: function(req, res) {
        // console.log("update", req.query.id, req.body);
        // Cart.findByIdAndUpdate(req.query.id, req.body, function(err, result) {
        //     if (err) return res.status(500).send(err);
        //     else res.send(result);
        // });
    },

    deleteOrder: function(req, res) {
        // console.log("delete", req.query.id);
        // Cart.findByIdAndRemove(req.query.id, function(err, result) {
        //     if (err) return res.status(500).send(err);
        //     else res.send(result);
        // });
    }

};
