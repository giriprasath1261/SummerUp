const mongoose = require('mongoose');

let Cart = new mongoose.Schema({
    product_id: {
        type: Number
    },
    product_name: {
        type: String
    },
    aisle_id: {
        type: Number
    },
    department_id: {
        type: Number
    },
});

module.exports = mongoose.model('Cart', Cart);