'use strict';

/**
 * Copyright (C) 2015, Clearstream.tv
 * 
 * Description : Shared Util - parsingUtil: For parsing file content.
 * 
 * @author Cybage
 */

/**
 * Create parsingService
 */
sharedModule.factory('parsingUtil', [ function() {

	/**
	 * Prepare JSON array from provided CSV text
	 * 
	 * @param strData
	 * @param strDelimiter
	 */
	function getJSONFromCSV(strData, strDelimiter) {
		return csvToJSON(strData, strDelimiter);
	}

	// Return/Expose created functions. So it will be accessible.
	return {
		getJSONFromCSV : getJSONFromCSV
	};
} ]);

/**
 * **************************************************************************
 * Start Helper functions
 * **************************************************************************
 */

/**
 * Prepare JSON array from provided CSV text
 * 
 * @param strData
 * @param strDelimiter
 */
function csvToJSON(strData, strDelimiter) {
	// Check to see if the delimiter is defined. If not, then default to comma.
	strDelimiter = (strDelimiter || ",");

	// Prepare lineStrArray array by splitting strData using '\n'
	var lineStrArray = strData.split("\n");

	var counter = 0;

	// Iterate through lineStrArray and remove any blank lines
	for (i = 1; i < lineStrArray.length; i++) {
		if (lineStrArray[i].length == 1 || lineStrArray[i].length == 0) {
			lineStrArray.splice(i, 1);
			i = counter;
		} else {
			counter++;
		}
	}

	// Extract header
	var headers = lineStrArray[0].split(strDelimiter);
	for (i = 0; i < headers.length; i++) {
		headers[i] = headers[i].toString().trim();
	}
	headers = headers.toString().split(strDelimiter);

	// Prepare jsonDataArray using lineStrArray and headers
	var jsonDataArray = [];
	for (var i = 1; i < lineStrArray.length; i++) {
		var jsonData = {};

		var currentline = lineStrArray[i].split(strDelimiter);

		for (var j = 0; j < headers.length; j++) {
			if (j == (headers.length - 1)) {
				jsonData[headers[j]] = currentline[j].toString().replace("\r",
						"");
			} else
				jsonData[headers[j]] = currentline[j];
		}

		jsonDataArray.push(jsonData);
	}

	return JSON.parse(JSON.stringify(jsonDataArray));
}

/**
 * **************************************************************************
 * End Helper functions
 * **************************************************************************
 */
