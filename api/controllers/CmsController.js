/**
 * CmsController
 *
 * @description :: Server-side logic for managing cms
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	index: function(req, res){
		var responseObj = {
			layout : 'layout'
		};
		res.view(responseObj);
	}
};

