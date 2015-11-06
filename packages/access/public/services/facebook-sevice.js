accessModule.factory('facebookService', ['accessResource','amazonCognitoSyncService',function(accessResource,amazonCognitoSyncService) {
			
	return{
				

		
		 
		 

		FBInit : function(appId){
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
	    },

	    FBsyncAmazonBucket : function(FB_access_token) {       
	        
	        //amazon
	        
	        var params = {
	                AccountId: "558231766839",
	                RoleArn: 'arn:aws:iam::558231766839:role/developer',          
	                IdentityPoolId: "us-east-1:998c9ce3-1154-4a29-94a2-276efa151726",
	                 
	                Logins: {
	                    'graph.facebook.com' : FB_access_token,

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


	    }
	            	
			
								
							
									
					
			
	}
} 
]);
