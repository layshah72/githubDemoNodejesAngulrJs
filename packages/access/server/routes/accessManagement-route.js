
var accessController = require('../controllers/access-controller.js');
var AWS = require('aws-sdk'); 
// var mongoose = require('mongoose');

// var userInfoMongo = mongoose.model('userInfoMongo');

module.exports = function(params) {
	// Get rootApp object

	var rootApp = params.app;
	accessController.setRootAppObj(params.app);


	rootApp.route('/api/access/createUserInfo').post(function(request, response) {


			accessController.createUserInfo(request.body,function(error, result) {
				if (error) {
					console.log("[S categoryRoute - categories] : error==>");
					console.log(error);

					// TODO: Iterate error and return proper JSON Error message in
					// response
					return response.status(400).json(error);
				}

				// console.log("[S categoryRoute - categories] : result==>");
				 console.log(result);

				return response.json(result);

			
			});
	});
	// //mongo test getusers route
	// rootApp.route('/api/access/getUserInfo').get(function(request, response) {
	// 	var userInfoMongoM = new userInfoMongo();
	
	// 	userInfoMongoM.getUsers(userInfoMongo,function(error, result){
	//     	if (error) { return response.status(400).json(error); }

	//    		return response.json(result);
	//   	});

	// });
	// 		//mongo test getusers route ends
	// rootApp.route('/api/access/getDeveloperIdentityToken').get(function(request, response) {
			

	// 		accessController.getDeveloperIdentityToken(request.user,function(error, result) {
	// 			if (error) {
	// 				console.log("[S categoryRoute - categories] : error==>");
	// 				console.log(error);

	// 				// TODO: Iterate error and return proper JSON Error message in
	// 				// response
	// 				return response.status(400).json(error);
	// 			}

	// 			// console.log("[S categoryRoute - categories] : result==>");
	// 			// console.log(result);

	// 			return response.json(result);

			
	// 		});
	// });
	rootApp.get('/api/access/changePassword', function(req, res) {
       		accessController.changePassword(req.query,function(error, result) {
				if (error) {
					console.log("[S categoryRoute - categories] : error==>");
					console.log(error);

					// TODO: Iterate error and return proper JSON Error message in
					// response
					return res.status(400).json(error);
				}

				// console.log("[S categoryRoute - categories] : result==>");
				// console.log(result);

				return res.json(result);

			
			}); 
    });
	rootApp.route('/api/Buyer/getMyAd').get(function(request, response) {
			

			memoriesController.getAdd(request.query.q,function(error, result) {
				if (error) {
					console.log("[S categoryRoute - categories] : error==>");
					console.log(error);

					// TODO: Iterate error and return proper JSON Error message in
					// response
					return response.status(400).json(error);
				}

				// console.log("[S categoryRoute - categories] : result==>");
				// console.log(result);

				return response.json(result);

			
			});
	});

	rootApp.route('/api/memories/getAllmemory').get(function(request, response) {
			

			memoriesController.getMemories(request.query.memory_index_id,function(error, result) {
				if (error) {

					console.log("[S categoryRoute - categories] : error==>");
					console.log(error);

					// TODO: Iterate error and return proper JSON Error message in
					// response
					return response.status(400).json(error);
				}

				// console.log("[S categoryRoute - categories] : result==>");
				// console.log(result);
				console.log(request.query.memory_index_id);
				return response.json(result);

			
			});
	});

	
}