/**
 * Copyright (C) 2015, layshah
 * 
 * Description : Shared Util - appUtil: Shared utility functions for the
 * application.
 * 
 * @author lay shah
 */
introductionModule.controller('introductionPageController', ['$rootScope','$scope','introductionService','indexService','$location', function($rootScope,$scope,introductionService,indexService,$location){
    
   

window.scrollTo(0,0); 
$rootScope.showNavbarDetail=false;
$rootScope.showStepBar=false;
$rootScope.signUpLink="#/introduction";
$rootScope.signUpValue="Sign Up";
$rootScope.signUpModal="#signUpModal";
$rootScope.isDisabedIP=true;
    $scope.child=function(){
        if($scope.married=="Married"){
            $scope.childQue=true;
           
        }
        else{
            $scope.childQue=false;  
            
        }
    }
    
    $scope.saveIntroduction=function(){
        if($scope.child=="Yes"){
            $scope.child=1;
        }
        else{
            $scope.child=0;
        }

        if($scope.married=="Married"){
           
            $scope.married=1;
        }
        else{
           
            $scope.married=0; 
        }
        if($scope.married!=null && $scope.name!=null && $scope.age!=null){
        var promiseEnterUserDetails = introductionService.addIntro($scope.name,parseInt($scope.age),parseInt($scope.income),$scope.married,'male',$scope.child);
                promiseEnterUserDetails.$promise.then(function(data) {
                    console.log(data.category);
                    $location.path('goalSetting');
                    
                     indexService.saveCategory(data.category);
                    location.reload(true);
                 }, function(reason) {
                    $scope.message = reason;
                });
        }        
        
    }

    
    
}]);