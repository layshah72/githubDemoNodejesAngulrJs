accessModule.config([ '$routeProvider', function($routeProvider) {

	$routeProvider.when('/login', {
		templateUrl : 'rootFunvestApp/access/public/views/login.ejs',
		controller : 'loginController'
	});

	$routeProvider.when('/signUp', {
		templateUrl : 'rootFunvestApp/access/public/views/signup.ejs',
		controller : 'signupController'
	});
	$routeProvider.when('/sync', {
		templateUrl : 'rootFunvestApp/access/public/views/sync.ejs',
		controller : 'syncController'
	});

}]);
accessModule.config(function($sceDelegateProvider) {
  $sceDelegateProvider.resourceUrlWhitelist([
    // Allow same origin resource loads.
    //'self',
    // // Allow loading from our assets domain.  Notice the difference between * and **.
    // 'http://srv*.assets.example.com/**',
    // //allow all
    	'**'
  ]);

  
});

accessModule.run([ '$location', '$rootScope', function($location, $rootScope) {
	$rootScope.activePath = null;
	$rootScope.$on('$routeChangeSuccess', function(event, current, previous) {
		$rootScope.title = current.$$route.title;
		$rootScope.activePath = $location.path();
	});
}]);