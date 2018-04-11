/**
 * AjaxController
 *
 * @description :: Server-side logic for managing ajaxes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	login : function(req, res) {
		var email = req.body.email;
		// sails.log(email);

		User.find({email: email})
		.exec(function(err, user){
			if(err) {
				res.send(500, 'Something went wrong!');
			}
			else {
				// sails.log(user);
				res.send(user);
			}
		});
	},

	signup : function(req, res) {
		var abc = req.body;
		// sails.log(abc);

		User.create(abc)
		.exec(function(err, user){
			if(err) {
				res.send(500, 'Something went wrong!');
			}
			else {
				// sails.log(user);
				res.send('done');
			}
		});
	},

	header : function(req, res) {
		res.view('header/login');
	}
};