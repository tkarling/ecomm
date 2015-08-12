var mongoose = require('mongoose');

var schema = new mongoose.Schema ({
  product: { type: String, maxlength: 20, required: true, unique: true, index: true},
  price: { type: Number, min: 0, required: true },
  description: { type: String, maxlength: 100, required: true }
});

module.exports = mongoose.model('Product', schema);
