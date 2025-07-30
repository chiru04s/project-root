const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  code: String,
  name: String,
  ingredients: String,
  brand: String,
  categories: String,
  image: String
});

module.exports = mongoose.model('Product', ProductSchema);
