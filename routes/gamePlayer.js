var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }))


 router.route('/:id')

  .post(function(req, res) {

       var player = req.body.user;
       console.log(player);

       mongoose.model('Game').findById({
           _id: req.params.id
       }, function(err, game) {
            
          if (err)
              res.send(err);
            
            game._players.push(player);
            game.targets.push(null);
            game.save();
            
            console.log("New player named " + player + " added to game " + game.gameName);
            res.app.game = game;
            console.log(req.params);
            res.redirect('/completeGame/' + req.params.id);
      
      // res.render('completeGame.ejs', {game : game});
       });
   })

   .get(function(req, res) {
    console.log("ENTERING GET FUNCTION")
       mongoose.model('Game').findById({
           _id: req.params.id
       }, function(err, game) {
           if (err)
               res.send(err);

           res.json({message: "inside gameplayer get route"}, game._players);
       });
   })
   
   .put(function(req, res) {
       var player = req.body._player;
       
       mongoose.model('Game').findById({
           _id: req.params.id
       }, function(err, game) {
            

          if (err)
              res.send(err);
            
            game._players.push(player);
            game.save();
            res.json(game._players);
       });
   })

   .delete(function(req, res) {

    console.log("ENTERING DELETE FUNCTIONNNNNNNN")
    var player = req.body.player;

    console.log(player + " is in this array!");
    mongoose.model('Game').findById({
      _id: req.params.id
    }, function(err, game) {
      if (err)
        
        res.send(err);
      var index = game._players.indexOf(player);
      if (index != -1){
        game._players.splice(index, 1);
        game.targets.splice(index, 1);
        game.save();
        console.log("This is coming from the route: we deleted " + player);
        res.json({ message: player + " Eliminated!"})

      } else {
        console.log("player not there " + player);
        res.json({ message: "player not there!"})
      }

    });
   });

module.exports = router; 