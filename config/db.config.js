'use strict';

// Get waterline ORM
var Waterline = require('waterline');

// Create waterline obejct
var waterline = new Waterline();



// Load sails-postgresql Adapter
var mySQLAdapter = require('sails-mysql');




// Start Load DB models
/**
 * Important note: Waterline is converting camleCase model name into lowercase
 * model name. So make sure
 */

var user_details = require("../packages/introduction/server/models/user_details.js");

var user_info = require("../packages/access/server/models/user_info.js");


waterline.loadCollection(user_details);

waterline.loadCollection(user_info);



module.exports = function(params) {
	var app = params.app;

	// App property file object
	var appProperties = params.appProperties;

	// Load Database properties
	var db = {};
	db.adapter = appProperties.get('mysql.adapter');
	db.host = appProperties.get('mysql.host');
	//db.port = appProperties.get('mysql.port');
	db.database = appProperties.get('mysql.database');
	db.user = appProperties.get('mysql.user');
	db.password = appProperties.get('mysql.password');
	db.ssl = appProperties.get('mysql.ssl');

	console.log("Database properties loaded : ");
	console.log(db);

	// Create CS SMA dbConfig
	var dbConfig = {
		// Specify 'adapters' config
		adapters : {
			mySQL : mySQLAdapter,

		},

		// Specify `connections` config
		connections : {
			mySQLDev : {
				adapter : db.adapter,
				host : db.host,
				port : db.port,
				database : db.database,
				user : db.user,
				password : db.password,
				ssl : db.ssl

			}
		}
	};



	// Initialize Waterline
	waterline.initialize(dbConfig, function(err, models) {
		console.log("Start Initializing waterline===========");
		if (err) {
			throw err;
			console.log(err);
		}
		app.models = models.collections;
		app.connections = models.connections;

		console.log(app.models);
		console.log("End Initializing waterline=============");
		// Expose your models for further use
	});
};

