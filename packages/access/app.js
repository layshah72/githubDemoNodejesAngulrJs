'use strict';

/**
 * Copyright (C) 2015, Clearstream.tv
 * 
 * Description : Access - app.js: Defining module level app.
 * 
 * @author Cybage
 */

var accessModule = angular.module('accessModule', ['sharedModule', 'naif.base64']);

/**
 * isAuthenticated function: It will check user is authenticated or not by
 * making a backend call.
 */
accessModule.isAuthenticated = function($http, $q) {
    // Initialize a new promise
    var deferred = $q.defer();

    // Make an AJAX call to check if the user is logged in
    $http.get('/loggedin').success(function( /*data, status, headers, config*/ ) {
        // this callback will be called asynchronously
        // when the response is available
    }).
    error(function( /*data, status, headers, config*/ ) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
    });

    return deferred.promise;
};

/**
 * requestResponseInterceptor : To intercept request & response for checking user is authenticated
 * or not. If not then it would be redirected to login page
 */
accessModule.factory('requestResponseInterceptor', [
    '$injector',
    '$q',
    '$window',
    function($injector, $q, $window) {
        var requestResponseInterceptor = {
            request: function(config) {
                console.log("yes it")
                if (config.url.indexOf('rootOttloApp') > -1 || config.url.indexOf('api') > -1 || config.url.indexOf('signUp') > -1) {
                    // Invoke isAuthenticated method
                    accessModule
                        .isAuthenticated($injector.get('$http'), $q);
                }

                return config;
            },
            response: function(response) {
                return response;
            },
            responseError: function(response) {
                // If response status is 401 or 0 then redirect to login page
                if (response.status === 401 || response.status === 0) {
                    $window.location.href = '/#/signUp';
                    $window.location.reload();
                }

                return $q.reject(response);
            }
        };

        return requestResponseInterceptor;
    }
]);

/**
 * Config: configure $httpProvider with interceptors
 */
accessModule.config(['$httpProvider', function($httpProvider) {
    // Adding requestResponseInterceptor
  //  $httpProvider.interceptors.push('requestResponseInterceptor');
}]);