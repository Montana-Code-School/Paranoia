var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }))


router.route('/:id')

  .post(function(req, res) {
       mongoose.model('Game').findById({
           _id: req.params.id
       }, function(err, game) {
           if (err)
               res.send(err);
           game.targets = targetsRandomized(game.players);
           console.log(game.targets);
           game.save();
           res.render('completeGame.ejs', {game : game});
       });
   })
  .put(function(req, res){
  	mongoose.model('Game').findById({
  		_id: req.params.id
  	}, function(err, game){
  		if(err)
  			res.send(err);
  		console.log("HELLLOOOO")
  		game.targets = grabTag(game.players, game.targets);
  		game.save();
  		res.render('completeGame.ejs', {game: game});
  	});
  })

var targetsRandomized = function(players){
	var refCopy = players.slice();
	var randCopy = refCopy.slice();
	var randomizedArray = [];
	for (var i = 0; i < refCopy.length; i++) {
		var index = Math.floor(Math.random()*randCopy.length);
		randomizedArray[i] =  randCopy[index];
		randCopy.splice(index, 1);

	};
	var targets = [];
	var oneLess = randomizedArray.length;
	for (var i = 0; i < randomizedArray.length; i++) {
		var newTarget = randomizedArray[(i + 1) % oneLess];
		targets[players.indexOf(randomizedArray[i])] = newTarget;
	};
	return targets;
	
};



module.exports = router;
module.exports.targetsRandomized = targetsRandomized;

