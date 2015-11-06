'use strict';
/**
 * Copyright (C) 2015, Ottlo pvt. ltd.
 * 
 * Description : crop Controller - cropController: Managing cropping(photos)
 * 
 * @author Lay shah
 */

/**
 * Create cropController
 * 
 * @param $scope
 */
cropModule.factory('cropResource', [ '$resource', function($resource) {
	var cropResource = $resource('/api/crop/saveImageData', {}, {
		// Get all eventValueTypes
		saveImageData : {
			method : 'POST',
			url : '/api/crop/saveImageData',
			isArray : true
		}

		
	});

	return cropResource;
} ]);

