introductionModule.config([ '$routeProvider', function($routeProvider) {

	$routeProvider.when('/introduction', {
		templateUrl : 'rootFunvestApp/introduction/public/views/introduction.ejs',
		controller : 'loginController'
	});


}]);


introductionModule.run([ '$location', '$rootScope', function($location, $rootScope) {
	$rootScope.activePath = null;
	$rootScope.$on('$routeChangeSuccess', function(event, current, previous) {
		$rootScope.title = current.$$route.title;
		$rootScope.activePath = $location.path();
	});
}]);