sharedModule.factory('indexService', ['indexResource','$cookies', function(indexResource,$cookies) {
		
		var UserInfoParam=null;	
		var category;
		var goal={};
	
		
	return{
				

		 
		 
		saveUserData : function(data) {
			// TODO: Will be replaced by value object creation
	
			UserInfoParam=data;
			return "saved";
					
		},
		getUserData :function(){
			return UserInfoParam;
		},
		login:function(email,password){
			var credentials ={
				username : email,
				password : password
			};
			return indexResource.login(credentials);
		},
		account:function(){
			return indexResource.account();	
		},
		checkLogin:function(){
			return indexResource.checkLogin();	
		},
		logout:function(){
			return indexResource.logout();
		},
		changePassword:function(Email,CPassword){
			var dataToChange={
				email:Email,
				password:CPassword
			};
			return indexResource.changePassword(dataToChange);
		},
		saveCategory :function(cat){
			category=cat;
			$cookies.category=cat;
			console.log(category);
		},
		getCategory:function(){
			return $cookies['category'];
		},
		saveGoal:function(goal1){
			goal=goal1;

			$cookies.goal=JSON.stringify(goal1);
			
			console.log($cookies.goal);
		},
		getGoal:function(){
			return $cookies.goal;
		}
} 
}]);
