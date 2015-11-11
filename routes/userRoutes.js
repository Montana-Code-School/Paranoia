var mongoose = require('mongoose');

module.exports = function(app, passport) {

// normal routes ===============================================================

    // show the home page (will also have our login links)

    app.get('/', function(req, res) {
        // res.render('index.ejs');
        res.render('index.ejs', { message: req.flash('loginMessage') });
    });
    // PROFILE SECTION =========================
    app.get('/profile', isLoggedIn, function(req, res) {

       
       mongoose.model('Player').find({email: req.user.local.email}, function(err, player){
            if(err){
                console.log(err);
            }
            console.log(player, "so player")
            res.render('profile.ejs', {
                user : req.user,
                player : player
            })
        });
    
    });

    
    // COMPLETE PROFILE SECTION =========================
    app.get('/completeProfile', isLoggedIn, function(req, res) {
        res.render('completeProfile.ejs', {
            user : req.user,
        });
    });


    app.get('/createGame', isLoggedIn, function(req, res) {
        res.render('createGame.ejs', {
            user : req.user
        });
    });
    
    app.get('/completeGame/:id', isLoggedIn, function(req, res) {
        var gameId = req.params.id;
            mongoose.model('Game').findById(gameId).populate('_players').populate('targets').exec( function(err, game){
                if(err){
                  return console.log(err);
                } else {
                mongoose.model('User').find({}, function(err, users){
                  if(err){
                    return console.log(err);
                  } else {
                   res.render('completeGame.ejs', {users: users, game:game})
                  }
              });
            }
        });
    });

    app.get('/gameProfile', isLoggedIn, function(req, res) {
        res.render('gameProfile.ejs', {
            user : req.user
        });
    });
    
    app.get('/game/:id', isLoggedIn, function(req, res) {
        console.log(req.params.id);
        mongoose.model('Game').findById({
           _id: req.params.id
        }, function(err, game) {
            if (err)
                res.send(err);
          
            res.render('completeGame.ejs', {
                user : req.user,
                game : game
            });
        });   
    });

    // LOGOUT ==============================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    // AUTHENTICATE (FIRST LOGIN) ==================================================

    // LOGIN ===============================
    app.get('/login', function(req, res) {
        res.render('login.ejs', { message: req.flash('loginMessage') });
    });

    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/login', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    // SIGNUP =================================
    app.get('/signup', function(req, res) {
        res.render('signup.ejs', { message: req.flash('signupMessage') });
    });

    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    // AUTHORIZE (ALREADY LOGGED IN)
    app.get('/connect/local', function(req, res) {
        res.render('connect-local.ejs', { message: req.flash('loginMessage') });
    });
    app.post('/connect/local', passport.authenticate('local-signup', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/connect/local', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

};

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/');
}