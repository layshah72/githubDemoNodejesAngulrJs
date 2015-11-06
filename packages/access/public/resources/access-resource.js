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
accessModule.factory('accessResource', [ '$resource', function($resource) {
	var memoriesResource = $resource('/api/access/createUserInfo', {}, {
		// Get all eventValueTypes
		createUserInfo : {
			method : 'POST',
			url : '/api/access/createUserInfo',
			isArray : false
		}

		
	});

	return memoriesResource;
} ]);

