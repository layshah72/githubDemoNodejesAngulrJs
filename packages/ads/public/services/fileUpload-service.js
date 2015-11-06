

adsModule.factory('fileUploadService', ['$http','AWSS3Service','httpFileUploadService', function ($http,AWSS3Service,httpFileUploadService) {
    return{

        uploadFileToBucket : function(file, uploadUrl){
            
            if (file) {
            results.innerHTML = '';
            var data;
            data=AWSS3Service.uploadFileToBucket(file,uploadUrl);
            //data=AWSS3Service.getFileUrlFromPrivateBucket(uploadUrl);
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



