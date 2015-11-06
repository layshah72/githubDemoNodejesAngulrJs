goalSettingModule .config([ '$routeProvider', function($routeProvider) {

	$routeProvider.when('/goalSetting', {
		templateUrl : 'rootFunvestApp/goalSeting/public/views/goalSetting.ejs',
		controller : 'loginController'
	});


}]);


goalSettingModule .run([ '$location', '$rootScope', function($location, $rootScope) {
	$rootScope.activePath = null;
	$rootScope.$on('$routeChangeSuccess', function(event, current, previous) {
		$rootScope.title = current.$$route.title;
		$rootScope.activePath = $location.path();
	});
}]);