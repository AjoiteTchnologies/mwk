/**
 * CartController
 *
 * @description :: Server-side logic for managing carts
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	index : function(req, res){
		var responseObj = {
			layout : 'layout',
			pageType : 'cart',
			data : 'data'
		}

		res.view(responseObj);
	}
};

