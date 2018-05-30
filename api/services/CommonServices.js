
// get all parent categories for header
exports.getHeaderCategory = function(callback) {
	// Catmapping.find({path: {$nin: [null, ""]}}).
	Catmapping.find({path: {$size: 0}}).
	exec(function(err, response){
		if(err){
			sails.log('error');
		}
		else {
			callback(null,response);
		}	
	});
};

// get all parent categories for header
exports.getCmsData = function(pageType, callback) {
	// sails.log(pageType);
	
	Cms.find({page : pageType}).
	exec(function(err, response){
		if(err){
			sails.log('error');
		}
		else {
			// sails.log(response);
			callback(null, response);
		}	
	});
};
