/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  
index: function(req, res){
	res.view();
	sails.log('user');
	},

list: function(req, res){
	sails.log('user');
	User.find().exec(function(err, user){
		if(err){
			res.send(500, {error: 'Database error'});
		}
		res.view('user/list', {user:user});
	});

}, 
 
 signup: function(req, res) {
    res.view('user/signup');
 },

createuser: function (req, res) {
        var username = req.body.username;
        var password = req.body.password;
        var email = req.body.email;
        var mobile = req.body.mobile;

        User.create({username:username, password:password, email:email, mobile:mobile}).exec(function(err){
        	if(err){
        		res.send(500, {error: 'Database error'});
        	}

        	res.redirect('user/list');
        	
        });
    }
};
