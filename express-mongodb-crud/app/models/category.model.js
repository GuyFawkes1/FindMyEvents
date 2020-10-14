const Product = require('../models/product.model.js');
const mongoose = require('mongoose'), Schema = mongoose.Schema;

const CategorySchema = mongoose.Schema({
    name: String
});

module.exports = mongoose.model('category', CategorySchema);