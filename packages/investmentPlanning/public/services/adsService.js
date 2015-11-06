/**
 * Copyright (C) 2015, layshah
 * 
 * Description : Shared Util - appUtil: Shared utility functions for the
 * application.
 * 
 * @author lay shah
 */
adsModule.factory('adsService', ['adsResource',function(adsResource) {
			
	return{
				

		/**
		 * Create ads
		 * 
		 * @param ad_id
		 * @param ad_content
		 * @param ad_height
		 * @param ad_width
		 * @param ad_name
		 * @param ad_price
		 * @param ad_url
		 * @param buyer_id

				 
		 */
		createAd : function(data,adsCreativeName,adsContent) {
			// TODO: Will be replaced by value object creation
	
			var adsParam={
							
				ad_content : adsContent,						
				ad_height : '10',
				ad_width :	'10',
				ad_name : adsCreativeName,
				ad_price : '10',
				ad_url : data.Location,
				buyer_id :1
			};
								
							
									
					
			return adsResource.create(adsParam);

					// Create partner by REST call
					
		}
	}
} 
]);
