// CREATE AN OBJECT WITH RADICAL NEW SINGLE-COLLECITON STRUCTURE

function User(email,password,handle,tag,target,alive,pic) {
  this.local = {
    email,
    password,
    handle,
    tag,
    target,
    alive,
    pic
  } 
};

var Kelly       = new User('kelly@gmail.com', 'password2', 'killerkelly');
var Davis       = new User('wavydong@hotmales.com', 'wordpass', 'wavydave');
var Penguinator = new User('penguin@ice.com', 'ilovefish', 'penguinator');
var Zach        = new User('zacharywarren@outlook.com', 'password', 'zmwarren');

var objArray = [Kelly, Davis, Penguinator, Zach];

var playerArray = function(array){
  myArray = [];
  for (var i = 0; i < array.length; i++) {
    myArray.push(array[i].local.handle);
   }; 
  return myArray;
};

// LOOP THROUGH THE ENTIRE USERS COLLECTION AND SELECT THE HANDLES(IDS OR WHATEVER) AND SET THEM TO AN ARRAY
// USE THE ARRAY TO ASSIGN RANDOM TARGETS AND PUSH THOSE TARGETS TO THE APPROPRIATE PLAYERS' TARGET FIELD
// DETECT WHEN A PLAYER REGISTERS A KILL
// IF THE KILLED PLAYER'S TARGET'S TAG MATCHES THE KILLER'S ASSIGNMENT'S TAG
  //SET THE KILLED PLAYER'S ALIVE FIELD TO FALSE
  //PASS KILLED PLAYERS TARGET FIELD TO PLAYER'S TARGET FIELD
//OTHERWISE SEND AN ERROR MESSAGE
// WHEN A SINGLE PLAYER REMAINS, NOTIFY ALL PLAYERS THAT GAME HAS ENDED 

var randomize = function(players){
  var refCopy = players.slice();
  var randCopy = refCopy.slice();
  var randomizedArray = [];
  for (var i = 0; i < refCopy.length; i++) {
    var index = Math.floor(Math.random()*randCopy.length);
    randomizedArray[i] = randCopy[index];
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

var targetPutter = function(targets){
  for (var i = 0; i < players.length; i++) {
    users[i].local.target = targets[i];
  };
};


// CREATE AN ARRAY OF USERS
var users = playerArray(objArray);
// CALL THE RANDOMIZER, PASSING IN THE USERS ARRAY
targetArray = randomize(objArray);


var tagCreator = function(user){
  user.local.tag = Math.floor(Math.random()*10000);
}


router.route('/users')

.put(function(req, res) {
  // req WILL BE PASSED IN FROM THE FORM
  var killAttempt = mongoose.model('User').find({
        handle: req.params.handle)};
  var myDude = mongoose.model('User').find({
        handle: MYHANDLE});

    if (killAttempt === req.params.handle) {
      mongoose.model(myDude).update({ target: killAttempt.target)};
      mongoose.model(killAttempt).update({ alive: false)};
      mongoose.model(killAttempt).update({ target: null)};
    } else {
      res.send('Stop guessing random numbers. It won\'t work!')
    }
  if (playerArray < 2 ) {
    res.send("The game is over.")
  } else {
    game.save();
    res.redirect('/profile');
  } 
});


