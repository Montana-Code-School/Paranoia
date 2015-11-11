var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var gameSchema = new mongoose.Schema({

	_creator: [{type: Number, ref: 'User'}], 
    gameName: String,
    _players: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    targets: [{ type: Schema.Types.ObjectId, ref: 'User' }]   
})

module.exports = mongoose.model('Game', gameSchema);