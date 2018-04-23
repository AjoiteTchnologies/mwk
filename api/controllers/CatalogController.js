/**
 * CatalogController
 *
 * @description :: Server-side logic for managing catalogs
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	index: function(req, res){
		var responseObj = {
			layout : 'layout',
			list : [],
			isLoggedIn : req.cookies.isLoggedin
		};

		sails.log(responseObj.isLoggedIn);
		Catalog.find({})
		.exec(function(err, list){
			if(err){
				res.send(500, 'Something went wrong!!')
			}
			else {
				responseObj.list = list;
				res.view(responseObj);
			}
		});
		// res.view(responseObj);
	},

	add: function(req, res){
		res.view('catalog/add')
	},

	create: function(req, res){
		var responseObj = {
			layout : 'layout',
			productid : req.body.productid,
			productname : req.body.productname,
			price : req.body.price
		};
		Catalog.create(responseObj).exec(function(err){
			if(err){
				res.send(500, 'Something went wrong!!')
			}
			else {
				res.redirect('catalog');
			}
		})
	}
};