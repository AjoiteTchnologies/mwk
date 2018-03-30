/**
 * ProductController
 *
 * @description :: Server-side logic for managing products
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	index: function(req, res){
		var responseObj = {
			layout : 'layout',
			id : req.param('id')
		};
		Catalog.findOne({id : responseObj.id}).exec(function(err, list){
			if(err){
				res.send(500, 'Something went wrong!')
			}
			else {
				res.view('product/index', {list : list});
			}
		})
	}
	
};

