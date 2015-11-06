'use strict';

/**
 * Copyright (C) 2015, Ottlo Inc
 * 
 * Description : Shared Constants - messageConstant: success/fail message
 * constants.
 * 
 * @author lay shah
 */

/**
 * Create constants
 */
sharedModule.factory('messageConstant', [ function() {
	var messageConstants = {
		// Partner related messages
        "partnerCreatedSuccessfully": "Partner {0} created successfully.",
        "partnerCreationFailed": "Partner {0} creation failed. Please try again.",
        "noPartnerConfigured" : "So far no partner is configured in the system!!! Please configure partner using \'Create Partner\' link.",
        "partnerFetchingFailed" : "Sorry something went wrong while fetching partners. Please try after some time.",
        
        // DataStream related messages
        "dataStreamCreatedSuccessfully": "DataStream {0} is created successfully.",
        "dataStreamCreationFailed": "DataStream {0} creation is failed.",
        "noDataStreamConfigured": "So far no datastream is configured in the system!!!. Please configure datastream using \'Create DataStream\' link.",
        "dataStreamFetchingFailed": "Sorry something went wrong while fetching datastreams. Please try after some time.",
        
        // CSV upload related messages
        "uploadSuccessfully": "Upload is done successfully!!!"
	};

	return messageConstants;
} ]);