/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	
	list: function(req, res){
		var responseObj = {
			layout: 'layout',
			user: []
		};

		User.find({}).exec(function(err, user){
			if(err){
				res.send(500, {error: 'Database Error'});
			}
			responseObj.user = user;
			res.view(responseObj);
		})
	},

	add: function(req, res){
		res.view('user/add');
	},

	create: function(req, res){		
		var responseObj = {
			name: req.body.name,
			email: req.body.email
		};
		if(req.param('id') != '' && req.param('id') != null && req.param('id') != undefined){

			var id = req.param('id');
			User.update({id:id}, responseObj)
			.exec(function(err) {
				if(err){
					res.send(500, {error: err.message});
				}
				res.redirect('user/list');
			});	
		}
		else {
			User.create(responseObj)
			.exec(function(err) {
				if(err){
					res.send(500, {error: err.message});
				}
				res.redirect('user/list');
			});	
		}
			
	},

	delete: function(req, res){
		var responseObj = {
			id: req.param('id')
		};
		User.destroy(responseObj)
		.exec(function(err) {
			if(err){
				res.send(500, {error: err.message});
			}
			res.redirect('user/list');
		})
	},

	edit: function(req, res){
		User.findOne({id: req.param('id')})
		.exec(function(err, user){
			if(err){
				res.send(500, {error: err.message});
			}
			res.view('user/create', {user: user});
		})
	}
};