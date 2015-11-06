sharedModule.factory('signupService', ['accessResource',function(accessResource) {
			
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
		 
		 

		addUser : function(firstName,middelName,lastName,birthDate,gender,city,
	 						state,country,zipCode,email,password,interests,photo) {
			// TODO: Will be replaced by value object creation
	
			var UserInfoParam={
				first_name:firstName,				
				middel_name : middelName,						
				last_name : lastName,
				birth_date :	birthDate,
				gender : gender,
				city : city,
				state : state,
				country :country,
				zipcode :zipCode,
				email : email,
				password : password,
				interests:interests,
				displayName:firstName+" "+lastName,
				photo:photo
			};					
			return accessResource.createUserInfo(UserInfoParam);
					// Create partner by REST call			
		}
		
	
} 
}]);
