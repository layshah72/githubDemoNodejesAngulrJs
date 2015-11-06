

accessModule.controller('loginController', ['$scope','$location','facebookService','amazonCognitoSyncService', function($scope,$location,facebookService,amazonCognitoSyncService){
		$scope.FBInit =function(appId){
			facebookService.FBInit(appId); 
		}

	    $scope.checkLoginState= function () {
	        // This function is called when someone finishes with the Login
	        // Button.  See the onlogin handler attached to it in the sample
	        // code below.
	        FB.getLoginStatus(function(response) {
	            $scope.statusChangeCallback(response);
	        });
	    }

	     // This is called with the results from from FB.getLoginStatus().
	    $scope.statusChangeCallback = function (response) {
	        console.log('statusChangeCallback');
	        console.log(response);
	        // The response object is returned with a status field that lets the
	        // app know the current login status of the person.
	        // Full docs on the response object can be found in the documentation
	        // for FB.getLoginStatus().
	        if (response.status === 'connected') {
	          // Logged into your app and Facebook.
	          $scope.testFBAPI();
	        } else if (response.status === 'not_authorized') {
	          // The person is logged into Facebook, but not your app.
	          document.getElementById('status').innerHTML = 'Please log ' +
	            'into this app.';
	        } else {
	          // The person is not logged into Facebook, so we're not sure if
	          // they are logged into this app or not.
	          document.getElementById('status').innerHTML = 'Please log ' +
	            'into Facebook.';
	        }
	    }

	    $scope.testFBAPI =function(){
	        
	        console.log('Welcome!  Fetching your information.... ');
	        FB.api('/me', function(response) {
	            console.log('Successful login for: ' + response.name);
	            $scope.FB_access_token=FB.getAuthResponse().accessToken;
	            document.getElementById('status').innerHTML =
	            'Thanks for logging in, ' + response.name + '!';
	            
	            facebookService.FBsyncAmazonBucket($scope.FB_access_token);

	            //$scope.testAWSDeveloperIdentityAPI();
	        });
	        
	    }

		    

	
	    $scope.testAWSDeveloperIdentityAPI=function(){

            	amazonCognitoSyncService.getToken()
                // then() called when son gets back
                .then(function(data) {
                    // promise fulfilled
                    if (data!=null) {
                    	console.log(data);
                        var params = {
	              					IdentityPoolId: 'us-east-1:998c9ce3-1154-4a29-94a2-276efa151726', /* required */
	                				RoleArn: 'arn:aws:iam::558231766839:role/developer',
  									WebIdentityToken: data.Token 
	            		};
	            

	           		// set the Amazon Cognito region
	            	AWS.config.region = 'us-east-1';
	            	// initialize the Credentials object with our parameters
	            	AWS.config.credentials = new AWS.WebIdentityCredentials(params);
	            	var cognitoSyncClients = new AWS.CognitoSync();
	            	AWS.config.credentials.identityId=data.IdentityId;  
	            	// We can set the get method of the Credentials object to retrieve
	            	// the unique identifier for the end user (identityId) once the provider
	            	// has refreshed itself
	            
	            
	            	var cognitoidentity = new AWS.CognitoIdentity();
	           		var identityid;
 					AWS.config.credentials.get(function(err) {
	 					if(!err){
		                    	// Other service clients will automatically use the Cognito Credentials provider
		                    	// configured in the JavaScript SDK.
		                 		//  var cognitoSyncClient = new AWS.CognitoSync();
		                   		// identityid=AWS.config.credentials.identityId;
		                    	amazonCognitoSyncService.synchronize(data.IdentityId,"layshah");
		                }
		                else
		                {
		                   		console.log(err);
		                }

	     			});   
                } 
                else{
                    console.log("error");
                }
            }, function(error) {
                // promise rejected, could log the error with: console.log('error', error);
                   	console.log(error);
                }
                );
        

	               	   				
	             

	    }
	    
	
	
    

	    $scope.listMyDataset= function(){
	                var cognitoSyncClient = new AWS.CognitoSync();

	                console.log(Identittid);


	                cognitoSyncClient.listDatasets({
	                        IdentityId: Identittid,
	                        IdentityPoolId: "us-east-1:998c9ce3-1154-4a29-94a2-276efa151726"
	                    }, 
	                    function(err, data) {
	                        if ( !err ) {
	                            console.log(JSON.stringify(data));

	                            $location.path('/#');
	                        }
	                        else{
	                            console.log(err);   
	                        }
	                });


	    }


	    
	}]);    