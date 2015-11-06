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

exports.getGoalData=function(category_id,cb){
        // Get category model
    console.log(category_id);
    var userDetailsModel = rootApp.models.user_details;
    var query = "SELECT * FROM  `category_goal_map` JOIN `goal_detail` WHERE category_id ="+category_id +"&& category_goal_map.goal_id=goal_detail.goal_detail_id";
    
    userDetailsModel.query(query,function(error, result) {
            if (error)
                return  cb(error, result);
                var result1={goalsdata:result}
                return cb(error, result1);
            
    });
    
}  


    
