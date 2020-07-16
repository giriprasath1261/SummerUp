const mongoose = require('mongoose');

let Grocery = new mongoose.Schema({
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

module.exports = mongoose.model('Grocery', Grocery);