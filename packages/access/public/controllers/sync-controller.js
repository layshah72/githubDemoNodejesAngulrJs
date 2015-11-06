accessModule.controller('syncController', ['$scope', '$rootScope' , '$http', 'facebookService','amazonCognitoSyncService',function($scope, $rootScope, $http, facebookService,amazonCognitoSyncService){
	  	$scope.FBInit =function(appId){
			facebookService.FBInit(appId);
		}

		$scope.getAccount = function() {    
		console.log('get to account');
	    // Make an AJAX call to check if the user is logged in
	    $http.get('/account').success(function(data){
	    	$rootScope.session = {}
			$rootScope.session.user = data;
	        return data;
	    }).error(function(){
	        alert("error");
	    });    
	}

	  	$scope.TestSyncUsingFBAccount=function() {       
	       
	         console.log('Welcome!  Fetching your information.... ');
	        
	        FB.getLoginStatus(function(response) {

	        });

	        FB.api('/me', function(response) {
	            console.log('Successful login for: ' + response.name);
	            $scope.FB_access_token=FB.getAuthResponse().accessToken;
	            document.getElementById('status').innerHTML =
	            'Thanks for logging in, ' + response.name + '!';
	            
	            facebookService.FBsyncAmazonBucket($scope.FB_access_token);

	            //$scope.testAWSDeveloperIdentityAPI();
	        });
	   	}

	   	$scope.TestSyncUsingDeveloperAccount=function(){
	   		  	
	        //var cognitoidentity = new AWS.CognitoIdentity({accessKeyId: 'AKIAJZX4GTF46ZKGQR3A',region:'us-east-1' , secretAccessKey: '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'});    

			var params = {
					  IdentityPoolId: 'us-east-1:998c9ce3-1154-4a29-94a2-276efa151726', /* required */
					  Logins: { /* required */
					    'lala': 'OTTLO_PRNV'
					    /* anotherKey: ... */
					  }
			};

			AWS.config.credentials = new AWS.CognitoIdentityCredentials(params);
	            var cognitoSyncClients = new AWS.CognitoSync();
	              
	            // We can set the get method of the Credentials object to retrieve
	            // the unique identifier for the end user (identityId) once the provider
	            // has refreshed itself
	            
	            
	           // var cognitoidentity = new AWS.CognitoIdentity();
	           	var identityid;

	            AWS.config.credentials.get(function(err) {
	                if (!err) {
	                    console.log("Cognito Identity Id: " + AWS.config.credentials.identityId);
	                    // Other service clients will automatically use the Cognito Credentials provider
	                    // configured in the JavaScript SDK.
	                    var cognitoSyncClient = new AWS.CognitoSync();
	                    identityid=AWS.config.credentials.identityId;
	                    amazonCognitoSyncService.synchronize(identityid,"layshah");
	                    cognitoSyncClient.listDatasets({
	                        IdentityId: AWS.config.credentials.identityId,
	                        IdentityPoolId: "us-east-1:998c9ce3-1154-4a29-94a2-276efa151726"
	                    }, 
	                    function(err, data) {
	                        if ( !err ) {
	                            console.log(JSON.stringify(data));
	                            
	                            window.localStorage.clear();
	                        }
	                    });
	                
	                }


	            });

			/*cognitoidentity.getOpenIdTokenForDeveloperIdentity(params, function(err, data) {
				  if (err){
				  	console.log(err, err.stack); // an error occurred
				  } 
				  else{
				  	console.log(data);


				  	//amazonCognitoSyncService.synchronize(data.IdentityId,"developeridentity224348");
				  }  
			});*/
	   	}
	     		

}]);    