/**
 * CartController
 *
 * @description :: Server-side logic for managing carts
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	index: function(req, res){
		var query = JSON.parse(req.body.localdata), // still have to figure out where the id's are coming from like body or param
			ids = [];
		// sails.log(typeof(JSON.parse(query)));

		_.each(query, function(key, value){
			// sails.log(key.id, key.qty);
			ids.push(key.id);
		});

		sails.log(ids);
		
		// Catalog.find({id : { $in: ['5ab8a8535f4a145e09950d3f', '5ab8a62c1b6d3ec0287dae54', '5ab8a5e7284962201b679970']}}).exec(function(err, list){
		Catalog.find({id : { $in: ids}}).exec(function(err, list){
			// sails.log(query,list);
			if(err){
				res.send(500, 'Something went wrong!');
			}
			else{
				res.view('cart/index', {list : list});
			}
		});
	}

};