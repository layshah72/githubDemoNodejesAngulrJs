'use strict';

/**
 * Copyright (C) 2015, Clearstream.tv
 * 
 * Description : Shared Filter - messageFilter: It will replace parameters with
 * input params
 * 
 * @author Cybage
 */

/**
 * Create messageFilter
 */
sharedModule.filter('messageFilter', [ function() {
	/**
	 * It will replace {$} parameters by specific values
	 * 
	 * @param message
	 * @param argument
	 * @param pattern
	 */
	var replaceParam = function(message, argument, pattern) {
		return message.replace(pattern, argument);
	};

	/**
	 * It will accept varargs arguments and update meesage by dynamic values
	 * with pattern
	 * 
	 * Ex: message - All the params {0} {1} will be {2} replaced
	 * params - param1 , param2, param3
	 * output - All the params param1 param2 will be param3 replaced
	 */
	return function() {
		var args = arguments[0];

		var message = args[0];

		var i = 0;

		for (i = 0; i < args.length; i++) {
			message = replaceParam(message, args[i + 1], new RegExp('\\{' + i
					+ '\\}', 'g'));
		}

		return message;
	};
} ]);