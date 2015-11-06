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
introductionModule.factory('introductionResource', [ '$resource', function($resource) {
	var introductionResource = $resource('/api/intoduction/createIntro', {}, {
		// Get all eventValueTypes
		

		createIntro : {
			method : 'POST',
			url : '/api/intoduction/createIntro'
		}
	});

	return introductionResource;
} ]);

