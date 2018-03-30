/**
 * CartController
 *
 * @description :: Server-side logic for managing carts
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	
	index: function(req, res){
		var id = req.param('id');
		Catalog.findOne({id : id}).exec(function(err, list){
			if(err){
				res.send(500, 'Something went Wrong!')
			}
			else{
				res.view('cart/index', {list : list});
			}
		});
	}
};

