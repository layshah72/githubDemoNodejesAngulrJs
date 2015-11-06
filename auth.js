// //passport
// module.exports = function(params) {
// // Get rootApp object

// var app = params.app;

// var session = require('express-session')
// var cookieParser = require('cookie-parser');
// var passport = require('passport'),
//     LocalStrategy = require('passport-local').Strategy;

// app.use(cookieParser());
// app.use(session({
//     secret: 'keyboard cat'
// }));
// app.use(passport.initialize());
// app.use(passport.session());

// // Will be replaced by user name from other source
// var user = {
//     userName: 'layshah',
//     password: 'password'
// };

// // intercept all request
// app.all('*', function(req, res, next) {
//     // check if user is logged in
//     if (req.user && req.user.userName == user.userName) {
//     	console.log("username is found");
//         next();
//         return;
//     } else if (req.url.indexOf("login") > -1) {
    	
//         next();       
//         return;
//     }
//     console.log("here we have to redirect");

// 	res.redirect('#/login');	
// });

// // Use local strategy for authentication
// passport.use(new LocalStrategy(function(username, password, done) {
//     // check for user name
//     if (username != user.userName) {
//         return done(null, false, {
//             message: 'Incorrect username.'
//         });
//     }
//     // check for password
//     if (password != user.password) {
//         return done(null, false, {
//             message: 'Incorrect password.'
//         });
//     }

//     // return success
//     return done(null, user);
// }));

// // redirect to login page if authentication fail
// app.post('/login', passport.authenticate('local', {
//     successRedirect: '/',
//     failureRedirect: '/login',
//     failureFlash: false
// }));

// // serialize user in session
// // Passport session setup.
// //   To support persistent login sessions, Passport needs to be able to
// //   serialize users into and deserialize users out of the session.  Typically,
// //   this will be as simple as storing the user ID when serializing, and finding
// //   the user by ID when deserializing.
// passport.serializeUser(function(user, done) {
//     done(null, user.userName);
// });

// // de-serialize user in session
// passport.deserializeUser(function(id, done) {
//     done(null, user);
// });

// // index page
// app.get('/', function(req, res) {
//     res.render('index', {});
// });



// // logout action
// app.get('/logout', function(req, res) {
//     req.logout();
//     res.redirect('/login');
// });

// }