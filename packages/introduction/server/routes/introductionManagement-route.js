
var introductionController = require('../controllers/introduction-controller.js');
module.exports = function(params) {
	// Get rootApp object

	var rootApp = params.app;
	introductionController.setRootAppObj(params.app);
	rootApp.route('/api/intoduction/createIntro').post(function(request, response) {
			

			introductionController.addIntroductionData(request.body,function(error, result) {
				if (error) {
					console.log("[S categoryRoute - categories] : error==>");
					console.log(error);

					// TODO: Iterate error and return proper JSON Error message in
					// response
					return response.status(400).json(error);
				}

				// console.log("[S categoryRoute - categories] : result==>");
				// console.log(result);
				
				return response.status(200).json(result);

			
			});
	});

	
	
}