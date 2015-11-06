introductionModule.factory('introductionService', ['introductionResource','$q',function(introductionResource,$q) {
			
	return{
				
		addIntro: function(name,age,income,marrtialStatus,gender,child){
			var introParam={
		 		maritial_status: marrtialStatus,
		 		have_children:child,
		 		age:age,
		 		gender:gender,
		 		annual_income:income

		 	};
		 	return introductionResource.createIntro(introParam);
		 		
		}
		
	}
} 
]);
