const mongoose = require('mongoose');
const {
    Schema
} = mongoose;

const Shoe = new Schema({
    product: String,
    price: Number,
    color: String,
    stock: Number,
    size: Number
});

module.exports = mongoose.model('Shoe', Shoe);