'use strict';

/**
 * Copyright (C) 2015, Funvest
 * 
 * 
 * 
 * 
 * @author lay shah
 */

var rootApp;

/**
 * Set root app object to access app level stored other objects.
 */
exports.setRootAppObj = function(rootAppObj) {
    rootApp = rootAppObj;
}


  
exports.addIntroductionData = function(introData, cb) {
    console.log("[S categoryController - create] : categoryData==>");
    
    // Get category model
    var userDetailsModel = rootApp.models.user_details;
    console.log(introData);
    var query="select category from goal_preference_category_details where age_lower_bound<"+introData.age+" && age_upper_bound>"+introData.age+ "&& maritial_status="+introData.maritial_status+" && children="+introData.have_children;

    userDetailsModel.query(query,function(error, result) {
            if (error)
                return  cb(error, result);
            
            else{
                introData.category_id=result[0].category;
                userDetailsModel.create(introData).exec(function(error1, result1) {
                    if (error1) {

                        return cb(error1, result1);
                    }
                    else{
                    result1={
                            category:result[0].category
                        }
                    return cb(error1, result1);
                    }
                });
            }
            
    });
    // Create new category into DB
    
};

    
