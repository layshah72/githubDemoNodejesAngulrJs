adsModule.factory('adsService', ['adsResource',function(adsResource) {
			
	return{
				

		/**
		 * Create ads
		 * 
		 * @param ad_id
		 * @param ad_content
		 * @param ad_height
		 * @param ad_width
		 * @param ad_name
		 * @param ad_price
		 * @param ad_url
		 * @param buyer_id

				 
		 */
		 allMyProjects:function(user_id){
		 	return adsResource.all(user_id);
		 },
		createProject : function(projectName,description,manager_id,user_id) {
			// TODO: Will be replaced by value object creation
	
			var projectParam={
								
				project_name : projectName,						
				description : description,
				manager_id :	manager_id,
				created_by_id : user_id
				
			};
								
							
									
					
			return adsResource.create(projectParam);

					// Create partner by REST call
					
		}
	}
} 
]);
