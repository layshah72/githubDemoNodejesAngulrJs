/**
 * Copyright (C) 2015, layshah
 * 
 * Description : Shared Util - appUtil: Shared utility functions for the
 * application.
 * 
 * @author lay shah
 */

firstPageModule.config([ '$routeProvider', function($routeProvider) {
	$routeProvider.when('/firstPage', {
		templateUrl : 'rootFunvestApp/firstPage/public/views/firstPage.ejs',
		controller : 'firstPageController'
	});
	
} ]);


firstPageModule.run([ '$location', '$rootScope', function($location, $rootScope) {
	$rootScope.activePath = null;
	$rootScope.$on('$routeChangeSuccess', function(event, current, previous) {
		$rootScope.title = current.$$route.title;
		$rootScope.activePath = $location.path();
	});
} ]);


