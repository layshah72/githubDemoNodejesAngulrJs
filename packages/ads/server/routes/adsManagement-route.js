var shelljs=require('shelljs/global');
var adsController = require('../controllers/ads-controller.js');
module.exports = function(params) {
	// Get rootApp object

	var rootApp = params.app;
	adsController.setRootAppObj(params.app)
	rootApp.route('/api/ads/getAd').get(function(request, response) {
			// Sync call to exec()
			var version = exec('ottlo_device', {silent:true}).output;
			console.log(version);
			// adsController.getAd(request.user_id,function(error, result) {
			// 	if (error) {
			// 		console.log("[S categoryRoute - categories] : error==>");
			// 		console.log(error);

			// 		// TODO: Iterate error and return proper JSON Error message in
			// 		// response
			// 		return response.status(400).json(error);
			// 	}

			// 	// console.log("[S categoryRoute - categories] : result==>");
			// 	// console.log(result);

			// 	return response.json(result);

			
			// });
	});

	rootApp.route('/api/ads/getFile').get(function(request, response) {
			

			adsController.getFile(function(error, result) {
				

				return response.json(result);

			
			});
	});	

	rootApp.route('/api/ads/createAd').post(function(request, response) {
			

			adsController.createAd(request.body,function(error, result) {
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
	rootApp.route('/api/ads/unzipAddToS3').get(function(request, response) {
			

			adsController.unzipToS3(function(error, result) {
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

	rootApp.route('/api/ads/excelUtility').get(function(request,response){
		adsController.readexcel(function(error,result){
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
}