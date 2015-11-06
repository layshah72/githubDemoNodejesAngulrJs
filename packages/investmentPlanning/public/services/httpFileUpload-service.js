/**
 * Copyright (C) 2015, layshah
 * 
 * Description : Shared Util - appUtil: Shared utility functions for the
 * application.
 * 
 * @author lay shah
 */
 adsModule.factory('httpFileUploadService', ['$http', function ($http) {
    

    return{

        uploadFileToUrl : function(file, uploadUrl){


        //***** code to uploadfile via http request ******//     
        var fd = new FormData();
        fd.append('file', file);

        $http.post(uploadUrl, fd, {

            transformRequest: function(fd, headersGetterFunction) {
                return fd; // do nothing! FormData is very good!
            },
            headers: {'Content-Type': undefined}
        })
        .success(function(){
        })
        .error(function(){
        });
        // **** end  ****//   

        }
    }    
}]);        