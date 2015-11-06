/**
 * Copyright (C) 2015, layshah
 * 
 * Description : Shared Util - appUtil: Shared utility functions for the
 * application.
 * 
 * @author lay shah
 */
adsModule.factory('ottloService', ['adsResource','$q',function(adsResource,$q) {
			
	return{
				

		
		getUniqueId : function(uploadBucket) {
			// TODO: Will be replaced by value object creation
			return $q(function(resolve, reject) {
				var uniqueIdParam={
							
					uploadBucket : uploadBucket,						
				
				};
								
							
									
					console.log(adsResource.getUniqueId(uniqueIdParam));
				 resolve(adsResource.getUniqueId(uniqueIdParam));

					// Create partner by REST call
					
		});
	}
} 
}]);
