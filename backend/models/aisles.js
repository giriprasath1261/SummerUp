const mongoose = require('mongoose');

let Aisle = new mongoose.Schema({
    aisle_id: {
        type: Number
    },
    aisle: {
        type: String
    }
});

module.exports = mongoose.model('Aisle', Aisle);