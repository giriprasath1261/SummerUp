const mongoose = require('mongoose');

let Recommendation = new mongoose.Schema({
    user_id: {
        type: Number
    },
    product_id: {
        type: Number
    }
});

module.exports = mongoose.model('Recommendation', Recommendation);