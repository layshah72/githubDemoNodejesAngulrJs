goalSettingModule.controller('goalSettingController', ['$route','$rootScope','$scope','$window','goalSettingService','indexService','$location', function($route,$rootScope,$scope,$window,goalSettingService,indexService,$location){
    
    $rootScope.showNavbarDetail=false;
    $rootScope.showStepBar=true;
    $rootScope.signUpLink=window.location.hash;
$rootScope.signUpValue="Sign Up";
$rootScope.signUpModal="#signUpModal";
var category=indexService.getCategory();
$rootScope.disableIP=true;
    window.scrollTo(0,0); 
    $scope.reload1=function(){
        if($scope.reloadOnce){
            
        }
        else{
            $scope.reloadOnce=false;
        }
    }
    $scope.reload1();
    $scope.makeEntry =function(data){
        adsService.createAd(data,$scope.adsCreativeName,$scope.adsContent);  
    }
    $scope.hover=[];
    $scope.hoverIn=function(i){
        
        $scope.hover[i]=true;
    }
    $scope.hoverOut=function(i){
    
        $scope.hover[i]=false;   
    }
    $scope.displayObject=[];
     
    $scope.getGoalData =function(){
         var myParam = category;
         console.log(myParam);
        var promisegetGoalData = goalSettingService.getGoalData(myParam);
                promisegetGoalData.$promise.then(function(data) {
                    console.log(data.goalsdata);
                   $scope.displayObject=data.goalsdata;
                }, function(reason) {
                    $scope.message = reason;
                });
    } 
    $scope.getGoalData();
     
      
    $scope.uploadFile = function(uploadUrl){
        var file = $scope.myFile;
        console.log($scope.myFile);
        console.log(document.getElementById("files"));
        console.log('file is ' + file);
        //var uploadUrl = 'ottloadcreative';
        $scope.data=fileUploadService.uploadFileToBucket($scope,file, uploadUrl);
        //fileUploadToREST.uploadFileToREST(file,uploadUrl);
        console.log(JSON.stringify($scope.data));
        //adsService.createAd($scope.data,$scope.adsCreativeName);
    };
    $scope.saveGoal=function(goal){
        console.log(goal);
        indexService.saveGoal(goal);
        $location.path('investmentPlanning');
    }

    
    
}]);