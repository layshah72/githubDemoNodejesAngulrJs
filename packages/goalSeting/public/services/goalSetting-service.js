goalSettingModule.factory('goalSettingService', ['goalSettingResource','$q',function(goalSettingResource,$q) {
			
	return{
				
		getGoalData: function(category){
			var categoyParam={
		 		category: category
		 	};
		 	return goalSettingResource.getGoals(categoyParam);
		 		
		}
		
	}
} 
]);
