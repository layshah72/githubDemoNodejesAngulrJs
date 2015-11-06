accessModule.factory('amazonCognitoSyncService', ['accessResource','$http','$q',function(accessResource,$http, $q) {
			
	return{
		synchronize : function(identityid, datasetp) {	
		     	//var cognitosync = new AWS.CognitoSync();
		    	
				// //Call to the listRecords function of the Amazon Cognito’s API
					
				// cognitosync.listRecords({
		  //   		DatasetName: datasetp, //Name of the dataset 
		  //   		IdentityId: identityid, //Cognito ID of the user
		  //   		IdentityPoolId: 'us-east-1:998c9ce3-1154-4a29-94a2-276efa151726' //Cognito identity pool ID
				// }, function(err, data) {
	    		
	   //  			if ( !err ) {
			 //        	//Store dataset metadata and SyncSessionToken in the user’s session 
			 //        	//for subsequent calls to the API where it is required.		
			 //        	//Retrieve information on the dataset
			 //        	console.log("coming in list record");
			 //        	var dataRecords = JSON.stringify(data.Records);
						
	   //  			}
	   //  			else{
	   //  				JSON.stringify(err);
	   //  			}
				// });    

		        //sync manager to fet and put data on server.
		        var syncClient = new AWS.CognitoSyncManager(); 
		    	console.log(syncClient);
		    	console.log("coming in list record");
		    syncClient.openOrCreateDataset(datasetp, function(err, dataset) 
		    	{ 
		    		if(!err){
			    		dataset.get('lay', function(err, value) {
		  							console.log(JSON.stringify(value));
						});
						dataset.put("myKey", "I am pranav", function(err, record) {
		 							
		 					if ( !err ) {
			 					dataset.synchronize({

			  					onSuccess: function(dataset, newRecords) {
			     					//...
			     					console.log(newRecords);
			     					dataset.getAllRecords(function(err,data){
			     						console.log(JSON.stringify(data));
			     					});
			  					},

			  					onFailure: function(err) {
			     				//...
			     					console.log(err);
			  					},
			  					onConflict: function(dataset, conflicts, callback) {
	                    			// if there are conflicts during the synchronization
	                    			// we can resolve them in this method
			                    	var resolved = [];
			 
			                    for (var i=0; i < conflicts.length; i++) {
			 
			                        // Take remote version.
			                        resolved.push(conflicts[i].resolveWithRemoteRecord());
			 
			                        // Or... take local version.
			                        resolved.push(conflicts[i].resolveWithLocalRecord());
			 
			 
			                    }
			 
			                    dataset.resolve(resolved, function(err) {
			                        if ( !err ) 
			                            callback(true);
			                    });

			                	},
			 
			                	onDatasetDeleted: function(dataset, datasetName, callback) {
			                    	// Return true to delete the local copy of the dataset.
			                    	return callback(true);
			                	},
			 
			                	onDatasetMerged: function(dataset, datasetNames, callback) {
			                    	// Return false to handle dataset merges outside the synchroniziation callback.
			                    	return callback(false);
			 
			                	}


							});
							}
							else{
								console.log(err);	
							}		
						});	
			    	}
			    	else
			    	{
			    		console.log(err);
			    	}	

					});
			},


            getToken: function() {
                // the $http API is based on the deferred/promise APIs exposed by the $q service
                // so it returns a promise for us by default
                return $http.get('http://localhost:3000/api/access/getDeveloperIdentityToken')
                    .then(function(response) {
                        if (typeof response.data === 'object') {
                            return response.data;
                        } else {
                            // invalid response
                            return $q.reject(response.data);
                        }

                    }, function(response) {
                        // something went wrong
                        return $q.reject(response.data);
                    });
            }

	}	        
	
	
}]);	