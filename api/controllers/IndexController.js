/**
 * IndexController
 *
 * @description :: Server-side logic for managing indices
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	index: function(req, res){
		var responseObj = {
			layout : 'layout',			
			pageType: 'catalogCategory',
			headerCategory: {}
		};

		async.auto({

			getHeader: function(callback) {
                sails.services.commonservices.getHeaderCategory(function(err, category) {
					if(err){
						sails.log('error');
					}	
                    else {
                        responseObj.headerCategory = category;
                        callback(null, null);
                    }
                });
            },

		},function(err, asyncResults){
			if(!err) {
				// sails.log(responseObj);
				return res.view(responseObj);
			}
			else {
				sails.log('error');
			}
		});
	}
};

