'use strict';
// DB Model - ads

var waterlineOrmObj = require('waterline');

var ads = waterlineOrmObj.Collection.extend({

	identity : 'ads',

	tableName : 'ads',

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

	// Define attributes for this ads collection
	attributes : {
		ad_id : {
			type : 'integer',
			primaryKey : 'true'
		},


		ad_content : {
			type : 'string'
		},

		ad_name : {
			type : 'string'
		},

		ad_price : {
			type : 'string'
		},

		ad_url :{
			type: 'string'
		},
		buyer_id :{
			type: 'integer'
		}

		
		
	}
});

module.exports = ads;