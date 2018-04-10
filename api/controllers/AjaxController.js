/**
 * AjaxController
 *
 * @description :: Server-side logic for managing ajaxes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	login : function(req, res) {
		var abc = req.body,
			email = '',
			pass = '';

		_.each(abc, function(key, value){
			if(value == 'email') {
				email = key;
			}
			else {
				pass = key
			}
		})
		sails.log(email, pass);

		User.find({password : 'Richa@123'})
		.exec(function(err, user){
			if(err) {
				res.send(500, 'Something went wrong!');
			}
			else {
				sails.log(user);
				res.send(user);
			}
		});
	},

	signup : function(req, res) {
		var abc = req.body;
		// sails.log(abc);

		User.create({abc})
		.exec(function(err, user){
			if(err) {
				res.send(500, 'Something went wrong!');
			}
			else {
				sails.log(user);
				res.send(user);
			}
		});
	},

	header : function(req, res) {
		res.view('header/login');
	}
};