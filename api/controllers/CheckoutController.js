/**
 * CheckoutController
 *
 * @description :: Server-side logic for managing checkouts
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	index: function(req, res){
		var responseObj = {
			layout: 'layout',
			pageType: 'checkout'
		}

		res.view(responseObj);
	}
};

