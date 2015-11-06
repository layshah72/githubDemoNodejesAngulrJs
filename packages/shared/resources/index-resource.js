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
 //resorce provides http request possible to send in constructive way will go in back end from here
sharedModule.factory('indexResource', [ '$resource', function($resource) {
	
	var indexResource = $resource('/login', {}, {
		login : {
			method : 'POST',
			url : '/login',
			isArray:false	
		},
		account:{
			method : 'GET',
			url : '/account',
			isArray:false	
		},
		checkLogin:{
			method : 'GET',
			url : '/loggedin',
			isArray:false	
		},
		logout:{
			method : 'GET',
			url : '/logout'
		},
		FBlogin:{
			method : 'GET',
			url : '/auth/facebook',
			stripTrailingSlashes :false	
		},
		changePassword:{
			method : 'GET',
			url : '/api/access/changePassword',
			isArray:true
				
		}
		
	});

	return indexResource;
} ]);

