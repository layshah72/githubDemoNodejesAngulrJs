// server.js

// =============================================================
// set up

var express = require('express');
var path = require('path');
var util = require('util');
var bodyParser = require('body-parser');
var http = require('http');
//var io =require('socket.io');
var schedule = require('node-schedule');
var propertiesReader = require('properties-reader');
var passport = require('passport');
var AWS = require('aws-sdk'); 
var cors = require('cors');
var crypto = require('crypto');
var shelljs=require('shelljs');






// Create app object
//var express = module.exports = express();

var app = express()
  , server = require('http').createServer(app)
  ;
	app.use(express.static(path.join(__dirname, 'public')));


app.set('port', (3000||process.env.PORT));
// listen (start app with node server.js)



app.models = {};




app.set('view engine', 'ejs');

app.set('views', path.join(__dirname, 'packages/shared/views'));

app.use(cors());
app.use(bodyParser.json({
	limit : '5mb'
})); // for parsing application/json
app.use(bodyParser.urlencoded({
	extended : true
}));


app.use("/rootFunvestApp", express.static(__dirname + '/packages'));


app.use("/assets", express.static(__dirname
		+ '/packages/shared/assets'));
app.use("/images", express.static(__dirname
		+ '/packages/shared/assets/images'));
app.use("/crop", express.static(__dirname
		+ '/packages/shared/assets/crop'));
app.use("/css", express.static(__dirname
		+ '/packages/shared/assets/css'));
app.use("/views", express.static(__dirname
		+ '/packages/shared/views'));
app.use("/js", express.static(__dirname
		+ '/packages/shared/assets/js'));
app.use("/controller", express.static(__dirname
		+ '/packages/shared/controllers'));
app.use("/service", express.static(__dirname
		+ '/packages/shared/services'));
app.use("/route", express.static(__dirname
		+ '/packages/shared/routes'));
app.use("/partials", express.static(__dirname
		+ '/packages/shared/partials'));

app.use("/bower_components", express.static(__dirname + '/bower_components'));
app.use("/node_modules", express.static(__dirname + '/node_modules'));

app.use("/dist", express.static(__dirname + '/dist'));


// Get env value from grunt task
var env = process.env.NODE_ENV;
// Load environment specific property files
var appProperties = new propertiesReader("./config/env/" + env + ".js");

// Load passport ==============================================================

require('./config/passport-config.js')({
    app: app,
    passport: passport,
    commonProperties: appProperties
});

// Load all routes ============================================================
require('./config/routes-config.js')({
    app: app,
    passport: passport
});



// =============================================================


// Load db.config.js
require("./config/db.config.js")({
	app : app,
	appProperties : appProperties
});



var introductionroutes = require(
		"./packages/introduction/server/routes/introductionManagement-route.js")({
	app : app
});

var goalSettingroutes = require(
		"./packages/goalSeting/server/routes/goalManagement-route.js")({
	app : app
});		

app.use(bodyParser.urlencoded({
	extended : false
}));
//serevr chatting file



// io.on('connection', function(socket){
//   console.log('a user connected');
  

//    socket.on('chat message', function(msg){
//    		console.log('message: ' + msg);
   		
//    	});	 
// });

app.listen(  app.get('port'),function(){
	console.log('app server is listening on port '+process.env.PORT );
});

// //Scheduling Demo

// var rule = new schedule.RecurrenceRule();
// rule.dayOfWeek = [0, new schedule.Range(0, 6)];
// rule.hour = 17;
// //rule.minute = 0;



// var j = schedule.scheduleJob(rule, function(){
//     console.log('WOw....The Scheduling Is Working');
    
// });





// server.listen(9000,function(){
//   console.log('http server is listening on port 9000');
// });








 // var rule = new schedule.RecurrenceRule();
 // rule.minute = 3;

 // var j = schedule.scheduleJob(rule, function(){
 //     //console.log('Hello World');
 //     get();
 // });












