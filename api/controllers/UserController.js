/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

    list: function(req, res){
    	sails.log('user');
    	User.find().exec(function(err, user){
    		if(err){
    			res.send(500, {error: 'Database error'});
    		}
    		res.view('user/list', {user:user});
    	});

    }, 
     
    create: function (req, res) {
        var data = req.body;
        // sails.log(data);
        User.findOrCreate({email : req.body.email}, {data})
        .exec(function(err, user){
        	if(err){
        		res.send(500, {error: 'Database error'});
        	}
        	else if(user){
                res.send('User with this email is already existed.');
            }
            else {
                res.send('User successfully created.');
            }
        });
    },

    find : function(req, res){
        var email = req.body.email;

        User.find({email : email})
        .exec(function(err, user){
            if(err){
                sails.log('error');
                res.send('User not found.');
            }
            else{
                sails.log(req.session.id);
                res.send(user);
            }
        });
    }

};
