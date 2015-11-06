module.exports = function(params) {
    var rootAppObj = params.app;
    var passport = params.passport;
    var cors = require('cors');
    // Route for login
    
    rootAppObj.get('/login', function(req, res) {
        var loginMessage = req.flash('loginMessage');

        res.redirect('http://localhost:3000/#/login');
    });

     rootAppObj.get('/signUp', function(req, res) {
       // 

        res.redirect('http://localhost:3000/#/signUp');

    });
    // Route for process the login form
    /*rootAppObj.post('/login', passport.authenticate('local-login', {
        successRedirect:'/' , // redirect to the secure profile
        // section
        failureRedirect: '/login', // redirect back to the login page if there
        // is an error
        failureFlash: true
            // allow flash messages
    }));*/

    // Route for process the login form
    rootAppObj.post('/login', passport.authenticate('local-login'),  function(req, res) {
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.
    console.log(req.user);
    res.redirect('/');
  });
    // Redirect the user to Facebook for authentication.  When complete,
// Facebook will redirect the user back to the application at
//     /auth/facebook/callback


rootAppObj.get('/auth/facebook', passport.authenticate('facebook'));

// Facebook will redirect the user to this URL after approval.  Finish the
// authentication process by attempting to obtain an access token.  If
// access was granted, the user will be logged in.  Otherwise,
// authentication has failed.
rootAppObj.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

    // Route for logout
    rootAppObj.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    // Route to test if the user is logged in or not
    rootAppObj.get('/loggedin', function(req, res) {
        res.sendStatus(req.isAuthenticated() ? 200 : 401);
    });
    
    
    rootAppObj.get('/account', function(req, res){
     if (req.isAuthenticated()) { 
       res.send({user : req.user}); 
     }else{
       res.redirect('/#/login');
     }
   });

    // Route for authenticate backend URLs
    rootAppObj.get('/api/**', isLoggedIn,
        function(req, res, next) {
            return next();
        });
    
    rootAppObj.post('/api/**', isLoggedIn,
        function(req, res, next) {
            return next();
        });
    // Route for index view
   
    // Route for index view
    rootAppObj.get('/',isLoggedIn, function(req, res) {
        res.render('index');
    });

   
};

// Function to authenticate req
function isLoggedIn(req, res, next) {
    console.log(req.url);
    var check=req.isAuthenticated();
    check=true;
    if (check||req.url.indexOf("signUp") > -1) {
        return next();
        
    }

    res.redirect('http://localhost:3000/login');
}