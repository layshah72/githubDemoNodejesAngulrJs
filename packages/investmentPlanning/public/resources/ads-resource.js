'use strict';

/**
 * Copyright (C) 2015, layshah
 * 
 * Description : Shared Util - appUtil: Shared utility functions for the
 * application.
 * 
 * @author lay shah
 */

/**
 * Create categoryResource factory
 * 
 * @param $resource
 * 
 * @return categoryResource
 */
adsModule.factory('adsResource', [ '$resource', function($resource) {
	var adsResource = $resource('/api/ads/createAd', {}, {
		// Get all eventValueTypes
		all : {
			method : 'GET',
			url : '/api/ads/getAd',
			isArray : true
		},

		create : {
			method : 'POST',
			url : '/api/ads/createAd'
		},
		getUniqueId:{
			method : 'GET',
			url : '/api/ads/getUniqueId',
			isArray : true	
		}
	});

	return adsResource;
} ]);

