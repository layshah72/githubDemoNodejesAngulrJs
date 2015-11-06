
var cropController = require('../controllers/crop-controller.js');
module.exports = function(params) {
	// Get rootApp object

	var rootApp = params.app;
	cropController.setRootAppObj(params.app)
	


	rootApp.route('/api/crop/saveImageData').post(function(request, response) {
			

			cropController.addImage(request.body,function(error, result) {
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

	rootApp.route('/api/crop/getCropData').get(function(request, response) {
			

			cropController.adCrop(request.query.q,function(error, result) {
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