

sharedModule.controller('loginController', ['$scope','$location', function($scope,$location){

	$scope.FBInit =function(appId){
	        window.fbAsyncInit = function() {
	            FB.init({
	                appId      : appId,
	                xfbml      : true,
	                version    : 'v2.3'
	            });
	        };

	        (function(d, s, id){
	            var js, fjs = d.getElementsByTagName(s)[0];
	            if (d.getElementById(id)) {return;}
	            js = d.createElement(s); js.id = id;
	            js.src = "//connect.facebook.net/en_US/sdk.js";
	            fjs.parentNode.insertBefore(js, fjs);
	        }(document, 'script', 'facebook-jssdk'));

	        console.log("facebook is initialized");
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
	            
	            $scope.testAWSCognitoAPI();

	            //$scope.testAWSDeveloperIdentityAPI();
	        });
	        
	    }

	    

var Identittid;
	    $scope.testAWSDeveloperIdentityAPI=function(){

	    	
	        var params = {
	                 AccountId: "558231766839",
	                RoleArn: 'arn:aws:iam::558231766839:role/developer',          
	                IdentityPoolId: "us-east-1:998c9ce3-1154-4a29-94a2-276efa151726",
	                 
	                Logins: {
	                    'graph.facebook.com' : $scope.FB_access_token
	                }
	            };
	         //passport.authenticate('local', { successRedirect: '/',
               //                    failureRedirect: '/#/login',
                 //                  failureFlash: true });
	            

	            // set the Amazon Cognito region
	            AWS.config.region = 'us-east-1';
	            // initialize the Credentials object with our parameters

	            //AWS.config.credentials = new AWS.CognitoIdentityCredentials(params);
	                  
	            // We can set the get method of the Credentials object to retrieve
	            // the unique identifier for the end user (identityId) once the provider
	            // has refreshed itself
	            
				    AWS.config.update({accessKeyId: 'AKIAJZX4GTF46ZKGQR3A', secretAccessKey: 'fsCC9e3JZoni4ceCX/zZSgSnS3qz6PwnbYeEf5Gx'});
      // Configure your region
    AWS.config.region = 'us-east-1';
      
	            
	            var cognitoidentity = new AWS.CognitoIdentity();
	            var param={
	                IdentityPoolId: 'us-east-1:998c9ce3-1154-4a29-94a2-276efa151726', /* required */

	                Logins: { /* required */
	                    'lala': '224348',
	                    
	                    /* anotherKey: ... */
	                },

	                TokenDuration: 30
	            };

	            cognitoidentity.getOpenIdTokenForDeveloperIdentity(param, function(err, data) {
	                if (err) console.log(err, err.stack); // an error occurred
	                else    { 
	                        console.log(data);
	                        Identittid=data.IdentityId;
	                        console.log(Identittid);
	                        $scope.listMyDataset();
	                         $scope.synchronize();
	                         }     

	                   //    $scope.testDeveloperClientSync();   // successful response
	               });


	               	   				
	             

	    }
	    
	$scope.synchronize =function(){
	    
		
	    var dataset;
	 	
	             
	    var cognitosync;
		
	    var dataset;
	 	AWS.config.update({accessKeyId: 'AKIAJZX4GTF46ZKGQR3A', secretAccessKey: 'fsCC9e3JZoni4ceCX/zZSgSnS3qz6PwnbYeEf5Gx'});
      	// Configure your region
    	AWS.config.region = 'us-east-1';
      
	            
	    cognitosync = new AWS.CognitoSync();
	    console.log(Identittid);
		//Call to the listRecords function of the Amazon Cognito’s API
		cognitosync.listRecords({
    		DatasetName: "developeridentity224348", //Name of the dataset 
    		IdentityId: Identittid, //Cognito ID of the user
    		IdentityPoolId: 'us-east-1:998c9ce3-1154-4a29-94a2-276efa151726' //Cognito identity pool ID
		}, function(err, data) {
    		if ( !err ) {
	        	//Store dataset metadata and SyncSessionToken in the user’s session 
	        	//for subsequent calls to the API where it is required.		
	        	//Retrieve information on the dataset
	        	var dataRecords = JSON.stringify(data.Records);
				
    		}
    		else{
    			JSON.stringify(err);
    		}
		});
	    
	    var syncClient = new AWS.CognitoSyncManager(); 
	    dataset= syncClient.openOrCreateDataset("developeridentity224348", function(err, dataset) 
	    { 
	    	if(!err){
		    	dataset.synchronize({

	  				onSuccess: function(dataset, newRecords) {
	     				//...
	     				console.log(newRecords);
	     				console.log(window.localStorage);
					window.localStorage.clear();
	  				},

	  				onFailure: function(err) {
	     				//...
	  				},


				});
			}
			else{
				console.log(err);
			}	 
		});
	    
	
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


	    $scope.testAWSCognitoAPI=function() {       
	        
	        //amazon
	        
	        var params = {
	                AccountId: "558231766839",
	                RoleArn: 'arn:aws:iam::558231766839:role/developer',          
	                IdentityPoolId: "us-east-1:998c9ce3-1154-4a29-94a2-276efa151726",
	                 
	                Logins: {
	                    'graph.facebook.com' : $scope.FB_access_token,

	                }
	            };
	            

	            // set the Amazon Cognito region
	            AWS.config.region = 'us-east-1';
	            // initialize the Credentials object with our parameters
	            AWS.config.credentials = new AWS.CognitoIdentityCredentials(params);
	            var cognitoSyncClients = new AWS.CognitoSync();
	              
	            // We can set the get method of the Credentials object to retrieve
	            // the unique identifier for the end user (identityId) once the provider
	            // has refreshed itself
	            
	            
	            var cognitoidentity = new AWS.CognitoIdentity();
	           

	            AWS.config.credentials.get(function(err) {
	                if (!err) {
	                    console.log("Cognito Identity Id: " + AWS.config.credentials.identityId);
	                    // Other service clients will automatically use the Cognito Credentials provider
	                    // configured in the JavaScript SDK.
	                    var cognitoSyncClient = new AWS.CognitoSync();
	                    cognitoSyncClient.listDatasets({
	                        IdentityId: AWS.config.credentials.identityId,
	                        IdentityPoolId: "us-east-1:998c9ce3-1154-4a29-94a2-276efa151726"
	                    }, 
	                    function(err, data) {
	                        if ( !err ) {
	                            console.log(JSON.stringify(data));
	                            console.log(window.localStorage);
	                            window.localStorage.clear();
	                        }
	                    });
	                
	                }


	            });
	        var syncClient = new AWS.CognitoSyncManager(); 
	    	
	    	var dataset= syncClient.openOrCreateDataset("layshah", function(err, dataset) 
	    	{ 
	    		dataset.synchronize({

  					onSuccess: function(dataset, newRecords) {
     					//...
     					console.log(newRecords);
  					},

  					onFailure: function(err) {
     				//...
  					},


				}); 
			});

	    }        
	}]);    