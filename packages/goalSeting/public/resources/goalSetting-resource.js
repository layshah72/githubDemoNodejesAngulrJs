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
adsModule.factory('goalSettingResource', [ '$resource', function($resource) {
	var goalSettingResource = $resource('/api/goalSetting/getGoals', {}, {
		// Get all eventValueTypes
		getGoals : {
			method : 'GET',
			url : '/api/goalSetting/getGoals',
			isArray : false
		}
	});

	return goalSettingResource;
} ]);

