adsModule.controller('fileUploadController', ['$scope','fileUploadService', 'adsService', function($scope,fileUploadService, adsService){
    
   

    $scope.makeEntry =function(data){
        adsService.createAd(data,$scope.adsCreativeName);  
    }


    $scope.uploadFile = function(uploadUrl){
        var file = $scope.myFile;
        console.log('file is ' + JSON.stringify(file));
        //var uploadUrl = 'ottloadcreative';
        $scope.data=fileUploadService.uploadFileToBucket(file, uploadUrl);
        //$scope.data=AWSS3Service.getFileUrlFromPrivateBucket(uploadUrl);
        //fileUploadToREST.uploadFileToREST(file,uploadUrl);
        console.log(JSON.stringify($scope.data));
        //adsService.createAd($scope.data,$scope.adsCreativeName);
    };

    
    
}]);