const mongoose = require('mongoose');

let Counters = new mongoose.Schema({
    counter_id: {
        type: Number
    },
    number_of_people: {
        type: Number
    },
    total_products: {
        type: Number
    }
});

module.exports = mongoose.model('Counters', Counters);