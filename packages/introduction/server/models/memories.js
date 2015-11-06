'use strict';
// DB Model - memories

var waterlineOrmObj = require('waterline');

var memories = waterlineOrmObj.Collection.extend({

	identity : 'memories',

	tableName : 'memories',

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

	// Define attributes for this memory_index collection
	attributes : {
		memories_id : {
			type : 'integer',
			primaryKey : 'true'
		},


		memories_description : {
			type : 'string'
		},

		
		memories_url :{
			type: 'string'
		},

		memory_index_id:{
			type :'integer'
		}

		
		
	}
});

module.exports = memories;