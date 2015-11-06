'use strict';

/**
 * Copyright (C) 2015, Clearstream.tv
 * 
 * Description : Server Controller - category-controller: Category functionality
 * related business logic, DB operations.
 * 
 * @author Cybage
 */

var rootApp;
var AWS = require('aws-sdk'); 
var crypto = require('crypto');
// var mongoose = require('mongoose');
// var userInfoMongo = mongoose.model('userInfoMongo');


/**
 * Set root app object to access app level stored other objects.
 */
exports.setRootAppObj = function(rootAppObj) {
    rootApp = rootAppObj;
}

exports.getAdd = function( query,cb) {
    
    
    var adsModel = rootApp.models.memories;
        adsModel.query(query,function(error, result) {
            if (error)
                return  cb(error, result);
            return cb(error, result);
        });
};
exports.getDeveloperIdentityToken =function(user,cb){
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
        IdentityPoolId: 'us-east-1:998c9ce3-1154-4a29-94a2-276efa151726',
        DeveloperUserIdentifier: 'lala',
    });
    AWS.config.region = 'us-east-1';
    console.log(user);                
    var cognitoidentity = new AWS.CognitoIdentity();                            
    AWS.config.credentials.get(function(err) {
        if (!err) {

            console.log("Cognito Identity Id: " + user.identityId);
            var param={
                IdentityPoolId: 'us-east-1:998c9ce3-1154-4a29-94a2-276efa151726', /* required */
                                
                Logins: { /* required */
                    'lala': escape(user.displayName),//get first name from passport
                        
                    /* anotherKey: ... */
                },
               // IdentityId: user.identityId,//get Identity id from passport
                TokenDuration: 30
            };

            cognitoidentity.getOpenIdTokenForDeveloperIdentity(param, function(err, data) {
                if (err) {
                    console.log(err, err.stack); // an error occurred
                    return cb(err,data);
                }
                else    { 

                    console.log(data);
                    return cb(err, data);
                }
            });   
        }
    });
                
};


exports.changePassword=function(changePasswordData, cb){
    var userInfoModel = rootApp.models.user_info;
       
            var user_info;
            console.log(changePasswordData);
            var hash = crypto.createHash('md5').update(changePasswordData.password).digest("hex");
           
            userInfoModel.update({ email:changePasswordData.email }, {password: hash}).exec(function(error,result){
                if(error){
                    console.log(error);
                    return cb(error,result);
                    }
                return cb(error,result);
            });
    //mongo command
    // var conditions = { email: changePasswordData.email }
    // , update = { password:hash}
    // , options = {  };
    //     userInfoMongo.update(conditions, update, options, callback);
    // function callback (err, numAffected) {
    //     return cb(err,numAffected);
    // }
    //mongo command ends
    

}

  
exports.createUserInfo = function(userInfoData, cb) {
    console.log("[S categoryController - create] : categoryData==>");
    
    // Get category model
    var userInfoModel = rootApp.models.user_info;
      AWS.config.region = 'us-east-1';
                // initialize the Credentials object with our parameters

                //AWS.config.credentials = new AWS.CognitoIdentityCredentials(params);
                      
                // We can set the get method of the Credentials object to retrieve
                // the unique identifier for the end user (identityId) once the provider
                // has refreshed itself
                AWS.config.credentials = new AWS.CognitoIdentityCredentials({
                    IdentityPoolId: 'us-east-1:998c9ce3-1154-4a29-94a2-276efa151726',
                    DeveloperUserIdentifier: 'lala',
                });
                AWS.config.region = 'us-east-1';
                    
                var cognitoidentity = new AWS.CognitoIdentity();

                
                        //        Identittid=data.IdentityId;
                          //      console.log(Identittid);
                            //      $scope.listMyDataset();
                                
                                AWS.config.credentials.get(function(err) {
                                    if (!err) {

                                        console.log("Cognito Identity Id: " + AWS.config.credentials.identityId);
                                        var param={
                    IdentityPoolId: 'us-east-1:998c9ce3-1154-4a29-94a2-276efa151726', /* required */
                                
                    Logins: { /* required */
                        'lala': userInfoData.first_name,
                        
                        /* anotherKey: ... */
                    },
                    IdentityId: AWS.config.credentials.identityId,
                    TokenDuration: 300
                };

                cognitoidentity.getOpenIdTokenForDeveloperIdentity(param, function(err, data) {
                    if (err) console.log(err, err.stack); // an error occurred
                    else    { 

                               console.log(data);
                                    AWS.config.credentials.identityId=data.IdentityId;
                                        userInfoData.identity_id=data.IdentityId;
                                        //$scope.synchronize(data);
                                         // Create new category into DB
                var hash = crypto.createHash('md5').update(userInfoData.password).digest("hex");
                 console.log(hash);
                 userInfoData.password=hash;
                 console.log(userInfoData.zipcode);
                 userInfoData.zipcode=parseInt(userInfoData.zipcode); 
                    //sql command 
                    userInfoModel.create(userInfoData).exec(function(error, result) {
                                if (error) {
                                    return cb(error, result);
                                }
                                    return cb(error, result);
                                });
                    //sql command ends

                    // //mongo command
                    // var userInfoMongoM = new userInfoMongo(userInfoData);
    
                    // userInfoMongoM.createUser(userInfoMongoM,function(error, result){
                    // if (error) { return cb(error,result); }

                    //     return cb(error,result);
                    // });   
                    // //mongo command ends
                                                        }
                              });   
                                }
                             });

                            //  }     

                        //  $scope.testDeveloperClientSync();   // successful response
                  // });


                                    
                 

        
        
      
   
};

     
    

//     app.post('/addAd', function(req, res) {
//         var adName = req.query.adName;
//         app.models.ads.create(req.query, function(err, model) {
//             if (err)
//                 return res.status(500).json({
//                     err: err
//                 });
//             res.json(model);
//         })
//     });


//     ///post file


//     app.post('/upload', function (req, res) {
//         setTimeout(
//             function () {
//                 res.setHeader('Content-Type', 'text/html');
//                 if (req.fd.file.length == 0 || req.fd.file.size == 0)
//                     res.send({ msg: 'No file uploaded at ' + new Date().toString() });
//                 else {
//                         var file = req.files.file;
//                         fs.unlink(file.path, function (err) {
//                         if (err)
//                             throw err;
//                         else
//                             //res.end("Hello");
//                             res.send({ msg: '<b>"' + file.name + '"</b> uploaded to the server at ' + new Date().toString() });
//                         });
//                     }
//             },
//             (req.param('delay', 'yes') == 'yes') ? 2000 : -1
//         );
//     });   



//     app.post('/file-upload',function(req,res){
//     console.log('FIRST TEST: ' + JSON.stringify(req.files));
//     console.log('second TEST: ' +req.files.theFile.name);
//     fs.readFile(req.files.theFile.path, function (err, data) {
//         var newPath = "/home/path/to/your/directory/"+req.files.theFile.name;
//         fs.writeFile(newPath, data, function (err) {
//           res.send("hi");  
//         });
//     });
// });
    
