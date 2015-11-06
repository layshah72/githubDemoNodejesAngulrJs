
adsModule.config([ '$routeProvider', function($routeProvider) {
	$routeProvider.when('/ads', {
		templateUrl : 'rootOttloApp/ads/public/views/ads.ejs',
		controller : 'fileUploadController'
	});

	$routeProvider.when('/file', {
		templateUrl : 'rootOttloApp/ads/public/views/FileUpload.ejs',
		controller : 'fileUploadController'
	});

	$routeProvider.when('/chat', {
		templateUrl : 'rootOttloApp/ads/public/views/chat.ejs',
		controller : 'fileUploadController'
	});
	$routeProvider.when('/cloudinary', {
		templateUrl : 'rootOttloApp/ads/public/views/cloudinary.ejs',
		controller : 'fileUploadController'
	});

	
} ]);
adsModule.config(function($sceDelegateProvider) {
  $sceDelegateProvider.resourceUrlWhitelist([
    // Allow same origin resource loads.
    'self',

    //allow all
    '**'
  ]);

  
});


adsModule.run([ '$location', '$rootScope', function($location, $rootScope) {
	$rootScope.activePath = null;
	$rootScope.$on('$routeChangeSuccess', function(event, current, previous) {
		$rootScope.title = current.$$route.title;
		$rootScope.activePath = $location.path();
	});
} ]);


adsModule.filter('csFromJson', function() {
	return function(input) {
		try {
			return angular.fromJson(input).base64;
		} catch (error) {
			return input;
		}
	};
});
