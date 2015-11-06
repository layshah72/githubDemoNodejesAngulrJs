'use strict';

/**
 * Copyright (C) 2015, Clearstream.tv
 * 
 * Description : Shared Util - appUtil: Shared utility functions for the
 * application.
 * 
 * @author Cybage
 */

/**
 * Create appUtil
 */
sharedModule.factory('appUtil', [ function() {
	/**
	 * Check object is undefined or null
	 * 
	 * @param object
	 */
	function isEmpty(object) {
		console.log("[appUtil - isEmpty] : object ==>" + object)
		return (typeof object === "undefined" || object === null);
	}

	// Return/Expose created functions. So it will be accessible.
	return {
		isEmpty : isEmpty
	};
} ]);