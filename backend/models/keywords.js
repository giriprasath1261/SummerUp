const mongoose = require('mongoose');

let Keyword = new mongoose.Schema({
    keyword_id: {
        type: Number
    },
    keyword: {
        type: String
    },
    aisles: {
        type: [Number]
    }
});

module.exports = mongoose.model('Keyword', Keyword);