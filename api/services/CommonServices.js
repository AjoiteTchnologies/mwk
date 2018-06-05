
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

// get cms data for perticular page
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

//get the breadcrumbs
exports.getBreadCrumb = function(categoryName, category, callback){
	// sails.log(category);
	var breadCrumb = [];
	if(category == ''){
		breadCrumb.push(categoryName);
		callback(null, breadCrumb);
	}
	else {
		Catmapping.find({catId : category})
		.exec(function(err, response){
			if(err){
				sails.log('Could not get breadcrumb!');
			}
			else {
				for(var i = 0; i < response.length; i++){
					breadCrumb.push(response[i].name);
				}
				breadCrumb.push(categoryName);
				// sails.log(breadCrumb);
				callback(null, breadCrumb);
			}
		});
	}	
}
