'use strict';
// DB Model - memory_index

var waterlineOrmObj = require('waterline');

var user_details = waterlineOrmObj.Collection.extend({

	identity : 'user_details',

	tableName : 'user_details',

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

	// Define attributes for this user_details collection
	attributes : {
		user_details_id : {
			type : 'integer',
			primaryKey : 'true'
		},


		maritial_status : {
			type : 'integer'
		},
		have_children : {
			type : 'integer'
		},
		age : {
			type : 'integer'
		},
		gender :{
			type: 'string'
		},
		annual_income : {
			type : 'integer'
		},
		category_id:{
			type:'integer'
		}
		
		
	}
});

module.exports = user_details;