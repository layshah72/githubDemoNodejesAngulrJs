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

/**
 * Set root app object to access app level stored other objects.
 */
exports.setRootAppObj = function(rootAppObj) {
    rootApp = rootAppObj;
}

exports.adCrop=function(){
    var userInfoModel = rootApp.models.user_info;
        userInfoModel.query(query,function(error, result) {
            if (error)
                return  cb(error, result);
            return cb(error, result);
        });
}

exports.addImage=function(data,cb){
    var userInfoModel = rootApp.models.user_info;
    console.log(data);
    userInfoModel.update({ user_info_id:data.user_info_id }, {photo: data.photo}).exec(function(error,result){
        if(error)
            return cb(error,result);
        return cb(error,result);
    });
}

exports.getAd = function( cb) {
    
    
    var adsModel = rootApp.models.ads;
        adsModel.find().exec(function(error, result) {
            if (error)
                return  cb(error, result);
            return cb(error, result);
        });
};


  
exports.createAd = function(adData, cb) {
    console.log("[S categoryController - create] : categoryData==>");
    
    // Get category model
    var adsModel = rootApp.models.ads;
    
    // Create new category into DB
    adsModel.create(adData).exec(function(error, result) {
        if (error) {
            return cb(error, result);
        }
        return cb(error, result);
    });
};

exports.readexcel =function(cb){
    

    workbook = XLSX.readFile('E:\\test.xlsx');
    console.log(workbook);
    
    var sheet_name_list = workbook.SheetNames;
    sheet_name_list.forEach(function(y) {
    var worksheet = workbook.Sheets[y];
    for (z in worksheet) {
        if(z[0] === '!') continue;
        console.log(y + "!" + z + "=" + JSON.stringify(worksheet[z].v));
    }
    return cb(workbook);
});
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
    
