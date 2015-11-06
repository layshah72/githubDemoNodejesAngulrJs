cropModule.config([ '$routeProvider', function($routeProvider) {

	$routeProvider.when('/crop', {
		templateUrl : 'rootOttloApp/crop/public/views/crop.ejs',
		controller : 'cropController'
	});
	$routeProvider.when('/crop2', {
		templateUrl : 'rootOttloApp/crop/public/views/crop2.ejs',
		controller : 'crop2Controller'
	});
	$routeProvider.when('/crop3', {
		templateUrl : 'rootOttloApp/crop/public/views/crop3.ejs',
		controller : 'crop3Controller'
	});
}]);

cropModule.run([ '$location', '$rootScope', function($location, $rootScope) {
	$rootScope.activePath = null;
	$rootScope.$on('$routeChangeSuccess', function(event, current, previous) {
		$rootScope.title = current.$$route.title;
		$rootScope.activePath = $location.path();
	});
}]);