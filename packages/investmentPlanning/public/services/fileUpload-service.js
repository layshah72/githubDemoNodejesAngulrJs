/**
 * Copyright (C) 2015, layshah
 * 
 * Description : Shared Util - appUtil: Shared utility functions for the
 * application.
 * 
 * @author lay shah
 */

adsModule.factory('fileUploadService', ['$http','AWSService','httpFileUploadService', function ($http,AWSService,httpFileUploadService) {
    return{

        uploadFileToBucket : function($scope,file, uploadUrl){
            
            if (file) {
            results.innerHTML = '';
            var data;
            data=AWSService.uploadFileToBucket($scope,file, uploadUrl);
            return data;
            //httpFileUpload.uploadFileToUrl(file,uploadUrl);
            }  
            else {
                results.innerHTML = 'Nothing to upload.';
                
            }   
        },


        uploadFileToREST : function(file, uploadUrl){
            
            if (file) {
            results.innerHTML = '';

            //AWSservice.uploadFileToBucket(file, uploadUrl);
            httpFileUploadService.uploadFileToUrl(file,uploadUrl);
            }  
            else {
                results.innerHTML = 'Nothing to upload.';
            }   

        }    
        
    }
}]);



