'use strict';

/**
 * Copyright (C) 2015, Clearstream.tv
 * 
 * Description : Shared Service - messageService: For managing success/fail
 * messages.
 * 
 * @author Cybage
 */

/**
 * Create messageService
 */
sharedModule.factory('messageService', [ '$filter', function($filter) {
	this.successMsg = '';
	this.errorMsg = '';

	/**
	 * Set success message
	 */
	function saveSuccessMsg() {
		var message = $filter('messageFilter')(arguments);
		console.log("[messageService - saveSuccessMsg] : msg==>" + message);
		this.successMsg = message;
	}

	/**
	 * Set error message
	 */
	function saveErrorMsg() {
		var message = $filter('messageFilter')(arguments);
		console.log("[messageService - saveErrorMsg] : msg==>" + message);
		this.errorMsg = message;
	}

	// Return/Expose created functions. So it will be accessible.
	return {
		saveSuccessMsg : saveSuccessMsg,
		saveErrorMsg : saveErrorMsg
	};
} ]);