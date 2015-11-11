var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }))

var User = require('../models/user')
var Game = require('../models/gamedb');

// /api/gameRoutes/
router.route('/')

.get(function(req, res) {
   mongoose.model('Game').find({}, function(err, games){
     if(err){
       return console.log(err);
     } else {
      res.json(games);
     }
   });
 })

.post(function(req, res, next){
        
  var game =  new Game();
    
  game.gameName = req.body.gameName;
  // Game
  //   .findOne({ gameName: game.gameName })
  //   .populate('_players')
  //   .exec(function (err, game) {
  //     if (err) return handleError(err);
  //     console.log('The creator is %s', game._players);
  //   });

  game.save( function(err) {
     if(err){
       res.send("Houston we have a problem")
     } else{
      console.log("New game named " + game.gameName + " created!");
      res.app.game = game;
       res.redirect('/completeGame/'+game._id)
     // res.render('completeGame.ejs', {game : game});
       
     }
   });
 });
     

 router.route('/:id')

   .get(function(req, res) {
       mongoose.model('Game').findById({
           _id: req.params.id
       }, function(err, game) {
           if (err)
               res.send(err);

           res.json(game);
       });
   })
   
   .put(function(req, res) {
        var gameName = req.body.gameName;
        var moderator=req.body.moderator;
        var startTime=req.body.startTime;
        var endTime=req.body.endTime;
        var location=req.body.location;
        var players=req.body.players;

       mongoose.model('Game').findById({
           _id: req.params.id
       }, function(err, game) {
           if (err)
               res.send(err);
              
            game.gameName = gameName;
            game.moderator= moderator;
            game.startTime= startTime;
            game.endTime= endTime;
            game.location= location;
            game.players= players;

           game.save();
           res.json(game);
       });
   })

   .delete(function(req, res) {
       mongoose.model('Game').remove({
           _id: req.params.id
       }, function(err, game) {
           if (err)
               res.send(err);

           res.json({ message: 'Successfully deleted' });
       });
   });

module.exports = router; 