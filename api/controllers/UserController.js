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

    find: function (req, res) {
      var data = [];

      User.find({email: req.body.email}).exec(function(err, user) {
        if(err){
          sails.log('database error');
        } else {
            if(_.isEmpty(user)){
              res.send('Email Id not registered');
              console.log("Email Id not registered");
             } else {
              for(var i=0; i<user.length; i++) {
                data.push(user[i].id);
              }
              User.find({$and: [{id: {$in: data}}, {password: req.body.password}]}).exec(function(err, response) {
                if(err){
                  console.log('database error');
                } else {
                  if(!_.isEmpty(response)){
                    console.log(response);
                    req.session.isLoggedIn = true;
                    req.session.userId = response[0].id;
                    req.session.userName = response[0].username;
                    res.send(response);
                  } else {
                    res.send('Wrong Password');
                    console.log("wrong pass");
                  }
                }
              });  
            }
        }
      });
    },

    logout: function(req, res){
      if(req.session.isLoggedIn == true){
        res.send('done');
        sails.log('done')
      }
    }
