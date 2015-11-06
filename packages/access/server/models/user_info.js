'use strict';
// DB Model - userInfo

var waterlineOrmObj = require('waterline');

var user_info = waterlineOrmObj.Collection.extend({

	identity : 'user_info',

	tableName : 'user_info',

	// Connection A named connection which will be used to read/write to the
	// datastore
	connection : 'mySQLDev',

	// Define an adapter to use
	adapter : 'mySQL',

	// If Table is exist then it will not create table in database
	migrate : 'safe',

	autoCreatedAt : false,

	autoUpdatedAt : false,

	autoPK : false,

	// Define attributes for this userInfo collection
	attributes : {
		user_info_id : {
			type : 'integer',
			primaryKey : 'true'
		},


		first_name : {
			type : 'string'
		},

		middel_name : {
			type : 'string'
		},

		last_name : {
			type : 'string'
		},
		birth_date : {
			type : 'string'
		},

		gender :{
			type: 'string'
		},
		city :{
			type: 'string'
		},
		state :{
			type: 'string'
		},
		country :{
			type: 'string'
		},
		zipcode :{
			type: 'integer'
		},
		email :{
			type: 'string'
		},
		password :{
			type: 'string'
		},
		interests :{
			type: 'string'
		},
		identity_id:{
			type: 'string'	
		},
		displayName:{
			type: 'string'	
		},
		photo:{
			type: 'string'	
		}
		

		
		
	}
	
});

module.exports = user_info;