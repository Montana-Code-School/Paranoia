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
           game.targets = targetsRandomized(game._players);
           console.log(game.targets);
           game.save();
           res.redirect('/completeGame/' + game._id);
       });
   })
  .put(function(req, res){
    mongoose.model('Game').findById({
      _id: req.params.id
    }, function(err, game){
      if(err)
        res.send(err);
      console.log("HELLLOOOO")
      game.targets = grabTag(game._players, game.targets);
      game.save();
      res.redirect('/completeGame/' + game._id);
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
  

  for (var i = 0; i < targets.length; i++) {
    players[i].local.target = targets[i]
  };

  return targets;
  
};






// var killTarget = function(players, targets, tag) {
//   playerId = STORED BY PLAYERS LOGIN SESSION
//   targetId = games.targets; 
//   targetTag = STORED IN TARGETS USER DOCUMENT
//   inputag PASSED BY PLAYER

//   if (inputtag === TARGET TAG) {
//     targets.slice('target', 1);
//     users.local.target ====
//     target.tag === null;
//   } else {
//     alert("Stop guessing random numbers!")
//   }
// }
// player enters target's tag
// Find and store players' target
// store target's tag
// check whether that player's target's tag [users.local.tag] matches the form entry
// If so, delete target from game [games.players] 
  // AND player inherits target's target
  // AND targets are updated in game [games.targets]
  // AND set victim's tag to null

// When one player remains in game, notification of win is sent to that player


module.exports = router;
module.exports.targetsRandomized = targetsRandomized;
