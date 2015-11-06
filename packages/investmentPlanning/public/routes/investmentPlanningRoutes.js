investmentPlanningModule.config([ '$routeProvider', function($routeProvider) {

	$routeProvider.when('/investmentPlanning', {
		templateUrl : 'rootFunvestApp/investmentPlanning/public/views/investmentPlanning.ejs',
		controller : 'loginController'
	});


}]);


investmentPlanningModule.run([ '$location', '$rootScope', function($location, $rootScope) {
	$rootScope.activePath = null;
	$rootScope.$on('$routeChangeSuccess', function(event, current, previous) {
		$rootScope.title = current.$$route.title;
		$rootScope.activePath = $location.path();
	});
}]);