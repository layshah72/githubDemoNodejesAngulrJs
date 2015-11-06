'use strict';

/**
 * Copyright (C) 2015, Clearstream.tv
 * 
 * Description : Shared Controller - errorController: Managing errors.
 * 
 * @author Cybage
 */

/**
 * Create errorController
 * 
 * @param $scope
 * @param $location
 * @param messageService
 */
sharedModule.controller('errorController', [ '$scope', '$location',
		'messageService', function($scope, $location, messageService) {
			// Messages
			$scope.successMsg = '';
			$scope.errorMsg = '';

			/**
			 * loadMsgs
			 */
			$scope.loadMsgs = function() {
				$scope.setMessages();
			};

			/**
			 * **********************************************************************
			 * Start Helper functions
			 * **********************************************************************
			 */

			// Set all messages into scope from messageService
			$scope.setMessages = function() {
				$scope.successMsg = messageService.successMsg;
				$scope.errorMsg = messageService.errorMsg;

				// clear all messages from messageService
				messageService.successMsg = '';
				messageService.errorMsg = '';
			};

			/**
			 * **********************************************************************
			 * End Helper functions
			 * **********************************************************************
			 */
		} ]);