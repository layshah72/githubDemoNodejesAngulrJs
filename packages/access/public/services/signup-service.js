accessModule.factory('signupService', ['accessResource',function(accessResource) {
			
	return{
				

		 

		addUser : function(firstName,middelName,lastName,birthDate,gender,city,
	 						state,country,zipCode,email,password,interests) {
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
				zipCode :zipCode,
				email : email,
				password : password,
				interests:interests,
				displayName: firstName
			};
			//var UserLoginParam={

			//}
								
							
									
					
			return accessResource.createUserInfo(UserInfoParam);

					// Create partner by REST call
					
		}
		
	
} 
}]);
