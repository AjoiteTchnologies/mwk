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

    dologin: function (req, res) {
        var user = {};

        User.find({username: req.param("username")}).exec(function(err, reses) {
            if(err){
                console.log('database error');
                res.send('');
            } 
            else {
                if(!_.isEmpty(reses)){
                    reses.forEach(function(user){
                        sails.log(user.id);
                        User.find({$and: [{id: {$in: [user.id]}}, {password: req.param("password")}]})
                        .exec(function(err, response) {
                            if(err){
                                console.log('database error1');
                                res.send('');
                            } 
                            else {
                                if(!_.isEmpty(response)){
                                    user.name=response[0].username;
                                    user.email =response[0].email;
                                    user.mobile=response[0].mobile;
                                    console.log(user.email);
                                    res.send(user.email);
                                } 
                                else {
                                    console.log('Wrong password');
                                    res.send('');
                                }
                            }
                        });
                        console.log(user.mobile);
                        res.send(user.mobile);
                    })
                } 
                else {
                    console.log('User not found');
                    res.send('');       
                }
            }
        });
    }
};
