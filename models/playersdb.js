var mongoose = require('mongoose');

var playerSchema = new mongoose.Schema({
        handle: String,
        tag: Number,
        pic: String
});

module.exports = mongoose.model('Player', playerSchema);