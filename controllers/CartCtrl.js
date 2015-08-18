var Cart = require('../models/Cart');

module.exports = {

    create: function(req, res) {
        //console.log("create cart", req.body)
        var newCart = new Cart(req.body);
        newCart.save(function(err, result) {
            if (err) return res.status(500).send(err);
            else res.send(result);
        });
    },
    read: function(req, res) {
        //console.log("cart read", req.params, req.query);
        Cart.find(req.query)
            .populate("order.product")
            .exec(function(err, result) {
                if (err) return res.status(500).send(err);
                else res.send(result);
            });
    },

    update: function(req, res) {
        // console.log("update", req.query.id, req.body);
        var cartId = req.query.id;
        Cart.findByIdAndUpdate(cartId, req.body, function(err, result) {
            if (err) return res.status(500).send(err);
            else res.send(result);
        });
    },

    delete: function(req, res) {
        // console.log("delete", req.query.id);
        var cartId = req.query.id;
        Cart.findByIdAndRemove(cartId, function(err, result) {
            if (err) return res.status(500).send(err);
            else res.send(result);
        });
    },

    createOrder: function(req, res) {
        var cartId = req.params.id;
        var newOrder = req.body;
        Cart.findByIdAndUpdate(
            cartId,
            // req.body,
            {
                $push: {
                    order: newOrder
                }
            },
            function(err, result) {
                if (err) return res.status(500).send(err);
                res.send(result);
            });
    },

    updateOrder: function(req, res) {
        var cartId = req.params.id;
        var productId = req.query.id;
        var updatedOrder = req.body;
        //console.log("deleteOrder cartId, productId", cartId, productId);
        Cart.findOneAndUpdate(
            { "_id": cartId, "order._id": productId },
            {
                "$set": {
                    "order.$": updatedOrder
                }
            },
            function(err, result) {
                console.log("responding");
                if (err) return res.status(500).send(err);
                res.send(result);
            });
    },

    deleteOrder: function(req, res) {
        var cartId = req.params.id;
        var productId = req.query.id;
        //console.log("deleteOrder cartId, productId", cartId, productId);
        Cart.findByIdAndUpdate(
            cartId,
            {
                $pull: {
                    order: {_id: productId}
                }
            },
            function(err, result) {
                if (err) return res.status(500).send(err);
                res.send(result);
            });
    }

};
