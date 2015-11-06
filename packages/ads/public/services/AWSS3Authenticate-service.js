adsModule.factory('AWSS3AuthenticateService', ['$http','amazonCognitoSyncService','$q', function ($http,amazonCognitoSyncService,$q) {
    return {
    		AWSS3Authenticate :function(){
    			return amazonCognitoSyncService.getToken()
                // then() called when son gets back
                .then(function(data) {
                    // promise fulfilled
                     if (data!=null) {
                        console.log(data);
                        var param = {
                                    IdentityPoolId: 'us-east-1:998c9ce3-1154-4a29-94a2-276efa151726', /* required */
                                    RoleArn: 'arn:aws:iam::558231766839:role/developer',
                                    WebIdentityToken: data.Token 
                        };
                

                    	// set the Amazon Cognito region
                    	AWS.config.region = 'us-east-1';

                    	AWS.config.credentials = new AWS.WebIdentityCredentials(param);
                    	AWS.config.credentials.identityId=data.IdentityId;   
                    	return data;
    				}
    				else {
                            // invalid response
                            return $q.reject(data);
                    }
    			}, function(response) {
                        // something went wrong
                        return $q.reject(data);
                    });
				
			}
		}
}]);			