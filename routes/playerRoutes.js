var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }))

var agentTag = function(){
               var tag = Math.floor(Math.random()*10000);
               return tag;
};

router.route('/')

 .get(function(req, res) {
   mongoose.model('Player').find({}, function(err, players){
     if(err){
       return console.log(err);
     } else {
      res.send(players)
     }
   });
 })

 .post(function(req, res){
   var handle = req.body.handle;
   var email = req.body.email;
   var status = req.body.status;
   var tag = req.body.tag;
   var pic = req.body.pic;

   mongoose.model('Player').create({
    email: email,
     handle: handle,
     status: status,
     tag: agentTag(),
     pic: pic

   }, function(err, player){
     if(err){
       res.redirect("/completeProfile")

     } else{
       console.log("New Agent named " + player + "created!");
       return res.redirect('/profile')
       res.send({player: req.player, user: req.user});
       
     }
   });
 });


 router.route('/:id')

   .get(function(req, res) {
       mongoose.model('Player').findById({
           _id: req.params.id
       }, function(err, player) {
           if (err)
               res.send(err);

           res.json(player);
       });
   })
   
   .put(function(req, res) {

            var handle = req.body.handle;
            var status = req.body.status;
            var deceased = req.body.deceased;
            var target = req.body.target;
            var pic = req.body.pic;


       mongoose.model('Player').findById({
           _id: req.params.id
       }, function(err, player) {          
           if (err)
               res.send(err);
              
            player.handle = handle;
            player.email= email;
            player.password = password;
            player.status = status;
            player.deceased = deceased;
            player.tag = agentTag();
            player.pic = pic;

           player.save();
           res.json(player);
       });
   })
   
   .delete(function(req, res) {
       mongoose.model('Player').remove({
           _id: req.params.id
       }, function(err, player) {
           if (err)
               res.send(err);

           res.json({ message: 'Successfully deleted' });
       });
   });

module.exports = router; 