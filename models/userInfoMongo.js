/**
 * New node file
 */

var mongoose= require('mongoose');
var autoIncrement = require('mongoose-auto-increment');

var userInfoSchema = new mongoose.Schema({
  	user_info_id: String,
  	first_name : String,
	middel_name :String,
	last_name :String,
	birth_date : String,
	gender: String,
	city :String,
	state :String,
	country :String,
	zipcode :Number,
	email :String,
	password :String,
	interests: String,
	identity_id:String,
	displayName:String,
	photo: String		
  		//upvotes: {type: Number, default: 0},
  		//comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }]
});

// PostSchema.methods.upvote = function(cb) {
// 	 this.update({$set: {upvotes: this.upvotes+=1}}, { w: 1 }, cb);
// };


userInfoSchema.methods.createUser=function(userInfoMongo ,cb){

		  userInfoMongo.save(function(err, res){
		    if(err)
		    	return     cb(err, res);

		    
			    return  cb(err, res);
			  
		  });
};
userInfoSchema.methods.getUsers=function(userInfoMongo,cb){

		   userInfoMongo.find( function(err, users) {
        	if (err) {
            	return next(err);
        	}
        	else {
            	return  cb(err, users);
        	}
    	});
};
userInfoSchema.plugin(autoIncrement.plugin, { model: 'userInfoMongo', field: 'user_info_id' });	
var userInfoMongo= mongoose.model('userInfoMongo', userInfoSchema);

module.exports.userInfoMongo = mongoose.model('userInfoMongo');