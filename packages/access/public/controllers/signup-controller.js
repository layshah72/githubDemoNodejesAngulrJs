

accessModule.controller('signupController', ['$scope','$location', 'signupService',function($scope,$location,signupService){

	 	$scope.CreateUser =function(){
	 		
	 		console.log();
	 		$scope.selectedInterests;
	 		signupService.addUser($scope.firstName,$scope.middelName,$scope.lastName,$scope.birthDate,
	 			$scope.gender,$scope.city,$scope.state,$scope.country,$scope.zipCode,$scope.email,
	 			$scope.password,$scope.selectedInterests);
	 		
	 		$scope.AddselectedInterests = function(interest){
            
                
                    var index = $scope.selectedInterests.indexOf(interest);
                    if ( index >= 0 ) {
                        $scope.selectedInterests.splice( index, 1 );
                        console.log(JSON.stringify($scope.selectedInterests));
                    }   
                    else{
                        $scope.selectedInterests.push( interest );
                        console.log(JSON.stringify($scope.selectedInterests)); 
                    }
                   
        	};
	 		
	 	}
	}]);    