var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    user: {
        type: String,
        maxlength: 20,
        required: true,
        unique: true,
        index: true
    },
    date: {
    	type: String
    },
    order: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true
        },
        amount: {
            type: Number,
            min: 0,
            required: true
        }
    }]

});

module.exports = mongoose.model('Cart', schema);
