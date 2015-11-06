'use strict';

/**
 * Copyright (C) 2015, Clearstream.tv
 * 
 * Description : Public Resource - categoryResource: To perform category related
 * REST operations.
 * 
 * @author Cybage
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
		getFile:{
			method : 'GET',
			url : '/api/ads/getFile'	
		}
	});

	return adsResource;
} ]);

