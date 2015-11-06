// load all the things we need
var flash = require('connect-flash');
var session = require('express-session');
var LocalStrategy = require('passport-local').Strategy;
var AWS = require('aws-sdk'); 
var crypto = require('crypto');    
var FacebookStrategy = require('passport-facebook').Strategy;



// TODO: load the user model
// TODO: Will be replaced by user name from DB source
var user = {
    userName: 'layshah',
    password: 'password'
};


module.exports = function(params) {
    var rootAppObj = params.app;
    var passport = params.passport;
    var commonProperties = params.commonProperties;

    var sessionOpts = {
        saveUninitialized: true, // saved new sessions
        resave: false, // do not automatically write to the session store
        secret: 'ottlo@123',
        cookie: {
            path: '/',
            httpOnly: true,
            secure: false,
            maxAge: 10000000
        },
        rolling: true
    };

    rootAppObj.use(session(sessionOpts));
    rootAppObj.use(passport.initialize());
    // persistent login sessions
    rootAppObj.use(passport.session());
    // use connect-flash for flash messages stored in session
    rootAppObj.use(flash());

    // =========================================================================
    // passport session setup
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and deserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user);
    });

    // used to deserialize the user
    passport.deserializeUser(function(user, done) {
        // TODO Find user from DB
        done(null, user);
    });

    // =========================================================================
    // LOCAL LOGIN
    // =========================================================================
    passport.use('local-login', new LocalStrategy({
        passReqToCallback: true
            // allows us to pass in the request from our route (lets us check if a user
            // is logged in or not)
    }, function(request, username, password, done) {
        // asynchronous
        process.nextTick(function() {
            // TODO: Make DB call to validate username/password
            // check for user name & password
            var userInfoModel = rootAppObj.models.user_info;
            var user_info;
            var encryptedPassword=crypto.createHash('md5').update(password).digest("hex");
            userInfoModel.find().where({ email: username }).exec(function(err, users) {
                if (err) { return done(err); }
                if (users[0]==null) { return done(null, false); }
                
                    console.log(users[0].password);   

                    if ( encryptedPassword != users[0].password) {

                        return done(null, false, request.flash('loginMessage',
                        'Incorrect username / password.'));
                    }
                    user.first_name=users[0].first_name;
                    user.identityId=users[0].identity_id;
                        console.log('login success');
                           
                        return done(null, users[0]);
                    
            });
           //mongo command starts
            // var mongoose = require('mongoose');

            // var userInfoMongo = mongoose.model('userInfoMongo');

            // userInfoMongo.findOne({ email: username }, function (err, users) {
            //     if (err) return done(err);
            //         console.log(users.email);
            //         if (users==null) { return done(null, false); }
                
            //         console.log(users.password);   

            //         if ( encryptedPassword != users.password) {

            //             return done(null, false, request.flash('loginMessage',
            //             'Incorrect username / password.'));
            //         }
            //         user.first_name=users.first_name;
            //         user.identityId=users.identity_id;
            //             console.log('login success');
                           
            //             return done(null, users);
            // })
           //mongo command ends
        });
           
            

    }));

    passport.use(new FacebookStrategy({
    clientID: '642262235916459',
    clientSecret: '5a1875130087f404f4086918d02ece66',
    callbackURL: "/auth/facebook/callback"
   
    },
      // facebook will send back the tokens and profile
  function(access_token, refresh_token, profile, done) {
            console.log(profile);
             profile.photo= "https://graph.facebook.com/" + profile.id + "/picture" + "?width=200&height=200" + "&access_token=" + access_token;
            return done(null, profile); // user found, return that user
          
      
    }));
};
