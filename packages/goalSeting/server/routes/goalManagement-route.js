
var goalSettingController = require('../controllers/goalSetting-controller.js');
module.exports = function(params) {
	// Get rootApp object

	var rootApp = params.app;
	goalSettingController.setRootAppObj(params.app);
	rootApp.route('/api/goalSetting/getGoals').get(function(request, response) {
			
		console.log(request.query);
			goalSettingController.getGoalData(request.query.category,function(error, result) {
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