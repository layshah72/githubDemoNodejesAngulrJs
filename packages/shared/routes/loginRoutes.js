sharedModule.config([ '$routeProvider', function($routeProvider) {

      
	
}]);

sharedModule.config(function($sceDelegateProvider) {
  $sceDelegateProvider.resourceUrlWhitelist([
    // Allow same origin resource loads.
    //'self',
    // // Allow loading from our assets domain.  Notice the difference between * and **.
    // 'http://srv*.assets.example.com/**',
    // //allow all
     '**'
  ]);

  
});


sharedModule.run([ '$location', '$rootScope', function($location, $rootScope) {
	$rootScope.activePath = null;
	$rootScope.$on('$routeChangeSuccess', function(event, current, previous) {
		$rootScope.title = current.$$route.title;
		$rootScope.activePath = $location.path();
	});
}]);