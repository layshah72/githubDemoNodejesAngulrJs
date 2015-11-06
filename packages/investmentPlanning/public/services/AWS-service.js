/**
 * Copyright (C) 2015, layshah
 * 
 * Description : Shared Util - appUtil: Shared utility functions for the
 * application.
 * 
 * @author lay shah
 */
adsModule.factory('AWSService', ['$http','ottloService', function ($http,ottloService) {
    return {

        uploadFileToBucket : function($scope,file, uploadBucket){
    	   var bucket = new AWS.S3({params: {Bucket: uploadBucket}});
 		   var i;
           var current_gameId;
           var promiseGetUniqueId = ottloService.getUniqueId(uploadBucket);
                promiseGetUniqueId.then(function(uniqueId) {
                console.log('unique gameId is'+ uniqueId);
                    for(i=0;i<file.length;i++){
                        var params = {Key: "gameId-56789/"+file[i].name, Body: file[i]};
                        bucket.upload(params, function (err, data) {
                            $scope.data = err ? 'ERROR!' : $scope.data= data;
                            console.log(JSON.stringify($scope.data));
                            if(!err){
                                $scope.makeEntry($scope.data);
                                return $scope.data;
                            }
                            else{
                                return err;
                            }
                    
                        });
                    }
                
                }, function(reason) {
                     $scope.message = reason;
                });
           
        }
    }
}]);        