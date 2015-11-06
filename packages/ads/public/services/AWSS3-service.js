adsModule.factory('AWSS3Service', ['$http','amazonCognitoSyncService','AWSS3AuthenticateService','$q', '$sce',function ($http,amazonCognitoSyncService,AWSS3AuthenticateService,$q,$sce) {
    return {

        uploadFileToBucket : function(file, uploadBucket){
    	   var bucket = new AWS.S3({params: {Bucket: uploadBucket}});
 		     AWSS3AuthenticateService.AWSS3Authenticate().then(function(data) {
                // promise fulfilled
                if (data!=null) { 
                   var params = {Key: 'cognito/users/'+data.IdentityId+'/'+file.name, ContentType: file.type, Body: file};
                   

                   bucket.upload(params, function (err, data) {
                        data = err ?  data= err : data= data;
                        console.log(JSON.stringify(data));
                        //$scope.makeEntry($scope.data);
                        return data;
                    });
                } 
            });      
                        
         },  
                      
        
        getFileUrlFromPrivateBucket: function(downloadBucket){
            return $q(function(resolve, reject) {
                var bucket = new AWS.S3({params: {Bucket: downloadBucket}});
                 AWSS3AuthenticateService.AWSS3Authenticate().then(function(data) {
                        // promise fulfilled
                    if (data!=null) { 
                        AWS.config.credentials.get(function(err) {
                            if (!err) {
                                console.log(data.IdentityId);
                                bucket.listObjects({Bucket: downloadBucket, /* required */
                                Marker: 'cognito/users/'+data.IdentityId},
                                function (err, data1) {
                                    console.log(err);

                                 var bucketObjects = data1.Contents;
                                 
                                 
                                 for(var objectIndex in bucketObjects){
                                    var url = bucket.getSignedUrl('getObject',{Bucket:downloadBucket,Key:bucketObjects[objectIndex].Key});
                                    bucketObjects[objectIndex]['url']=url;
                                    bucketObjects[objectIndex]['IdentityId'] = data.IdentityId;
                                     console.log('url is', url);
                                 }
                                   
                                    resolve(bucketObjects);    
                                });
    
                            }
                            else{
                                    reject(err);
                            }

                        });
                    }
                });
            });
        },

        uploadFileToPrivateBucket: function(uploadBucket,files,Prefix){
            return $q(function(resolve, reject) {
                var bucket = new AWS.S3({params: {Bucket: 'private-memories'}});    
                AWSS3AuthenticateService.AWSS3Authenticate().then(function(data) {
                    // promise fulfilled
                    if (data!=null) { 
                        AWS.config.credentials.get(function(err) {
                            if (!err) {
                                console.log(data.IdentityId);
                                
                                var i;
                                for(i=0;i<files.length;i++){
                                    console.log(files[i].type);
                                    var params = {Key: 'cognito/users/' +data.IdentityId+Prefix+'/'+files[i].name, Body: files[i], ContentType: files[i].type};
                                    bucket.upload(params, function (err, data) {
                                        $scope.data = err ? 'ERROR!' :  data;
                                        console.log(JSON.stringify(data));
                                        if(!err){
                                            return data;
                                            resolve(data);
                                        }
                                        else{
                                            return err;
                                            reject(err);
                                        }
                    
                                    });
                                }
                                    
                            }
                            else{
                                    reject(err);
                            }

                        });
                    }
                });
            });
        },

    getFileUrlFromPublicBucket: function(downloadBucket){
    return $q(function(resolve, reject) {
            AWS.config.update({accessKeyId: 'AKIAJLFZ4OIWVUT7W3QQ', secretAccessKey: '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'});
            var bucket = new AWS.S3({params: {Bucket: downloadBucket}});
             
              
        bucket.listObjects({Bucket: downloadBucket, /* required */
        Marker: '/' },
        function (error, data) {
            console.log(error);
            if(!error){
                var bucketObjects = data.Contents;
                for(var objectIndex in bucketObjects){
                    var url = bucket.getSignedUrl('getObject', {Bucket:downloadBucket,Key:bucketObjects[objectIndex].Key});
                    bucketObjects[objectIndex]['IdentityId'] = "";
                    bucketObjects[objectIndex]['url'] = url;
                }
            console.log('url is', bucketObjects);
            resolve(bucketObjects);
            }else{
                reject(error);
        
            }                            
                                
        });

    });                   
                  
    },
    getSpecificFileFromSpecificDirectoryPrefixPublicBucket: function(downloadBucket,fileName,dirPrefix,pageNumber,listLength){
    return $q(function(resolve, reject) {
            AWS.config.update({accessKeyId: 'AKIAJLFZ4OIWVUT7W3QQ', secretAccessKey: '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'});
            var bucket = new AWS.S3({params: {Bucket: downloadBucket}});
             var delimiter;
             
           
             if(fileName=='*'){
                delimiter=null;
             }else{
                delimiter=fileName;
             }
              
        bucket.listObjects({Bucket: downloadBucket, /* required */
        Prefix: dirPrefix, Delimiter:delimiter,EncodingType: 'url'},
        function (error, data) {
            console.log(data);
            var k=0;
            if(!error){
                if(fileName!='*'){
                    var bucketObjects = data.CommonPrefixes;
                }
                else
                {
                    var bucketObjects = data.Contents;   
                }
                var deleteIndex=[];
                console.log("bucket object is"+JSON.stringify(bucketObjects));
                 var objectIndex;
                 var length1=bucketObjects.length;

                 console.log(length1);
                 bucketObjects=bucketObjects.splice((pageNumber-1)*listLength,listLength);
                for( objectIndex in bucketObjects){
                    if(fileName!='*'){
                       
                        var url = bucket.getSignedUrl('getObject', {Bucket:downloadBucket,Key:bucketObjects[objectIndex].Prefix});
                    }
                    else{

                        if(bucketObjects[objectIndex].Key!=dirPrefix){
                            console.log(bucketObjects[objectIndex]);
                            var url = bucket.getSignedUrl('getObject', {Bucket:downloadBucket,Key:bucketObjects[objectIndex].Key});         
                            console.log(url);
                        }
                        else{

                            deleteIndex[k]=objectIndex;
                            k=k+1;
                        }
                    }
                    bucketObjects[objectIndex]['url'] = url;
                    bucketObjects[objectIndex]['content'] = bucketObjects[objectIndex].Key;
                    bucketObjects[objectIndex]['length']=length1;
                    console.log('url is', bucketObjects);
                }
                console.log(k);
                if(fileName=='*' && k!=0)
                {
                    for (var n in deleteIndex)    
                    bucketObjects.splice(n,1);
                }
                console.log('url is', bucketObjects);
                resolve(bucketObjects);
            }else{
                reject(error);
        
            }                            
                                
        });

    });                   
                  
    },
    getSpecificFileFromSpecificDirectoryPrefixPrivateBucket:function(downloadBucket,fileName,dirPrefix){
    return $q(function(resolve, reject) {
                         AWS.config.update({accessKeyId: 'AKIAJLFZ4OIWVUT7W3QQ', secretAccessKey: '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'});
                var bucket = new AWS.S3({params: {Bucket: downloadBucket}});                  
                AWSS3AuthenticateService.AWSS3Authenticate().then(function(data) {
                        // promise fulfilled

                    if (data!=null) {
                        console.log(data);
                        var k=0; 
                        AWS.config.credentials.get(function(err) {
                            if (!err) {
                                console.log(data.IdentityId);

                                var delimiter;
                                if(fileName=='*'){
                                    delimiter=null;
                                }else{
                                    delimiter=fileName;
                                }
              
                                bucket.listObjects({Bucket: downloadBucket, /* required */
                                Prefix: 'cognito/users/'+data.IdentityId+dirPrefix, Delimiter:delimiter},
                                function (error, data) {
                                    console.log(data);
                                    if(!error){
                                        var bucketObjects = data.Contents;
                                        var deleteIndex="";
                                        console.log('here it is', bucketObjects);
                                        for(var objectIndex in bucketObjects){
                                            if(fileName!='*'){
                                                var url = bucket.getSignedUrl('getObject', {Bucket:downloadBucket,Key:bucketObjects[objectIndex].Key+fileName});
                                            }
                                            else{
                                                if(bucketObjects[objectIndex].Key !='cognito/users/'+data.IdentityId+dirPrefix){
                                                    var url = bucket.getSignedUrl('getObject', {Bucket:downloadBucket,Key:bucketObjects[objectIndex].Key});         
                                                }
                                                else{
                                                    deleteIndex[k]=objectIndex;
                                                    k=k+1;
                                                }
                                            }
                                            bucketObjects[objectIndex]['url'] = url;
                                            bucketObjects[objectIndex]['content'] = bucketObjects[objectIndex].Key;
                                            console.log('url is', bucketObjects);
                                        }
                                        console.log(k);
                                                if(fileName=='*' && k!=0)
                                                {
                                                    for (var n in deleteIndex)    
                                                    bucketObjects.splice(n,1);
                                                }
                                        console.log('url is', bucketObjects);
                                        resolve(bucketObjects);
                                    }
                                    else{
                                        console.log(error);
                                        reject(error);
                                    }                            
                                });
                            }else{

                            }
                        });    
                    }
                    else{

                    }
                        
                });   
            });
    }
}


    
}]);        