
// get all parent categories for header
exports.getHeaderCategory = function(callback, category) {
	// Catmapping.find({path: {$nin: [null, ""]}}).
	Catmapping.find({path: {$size: 0}}).
	exec(function(err, response){
		if(err){
			sails.log('error');
		}
		else {
			category = response;
			callback(null,category);
		}	
	});
};
