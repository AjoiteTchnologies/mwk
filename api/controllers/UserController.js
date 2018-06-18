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

// var BCrypt = require ('bcrypt')

// module.exports = {
//   createHash: function (req, res) {
//       var params = req.params.all ()

//       var salt = BCrypt.genSaltSync (10)
//       var hash = BCrypt.hashSync (params.password, salt)

//       return res.json ({
//           hash: hash
//       })
//   }
// }

 // signup: function(req, res) {
 //    res.view('user/signup');
 // },

 // login: function(req, res) {
 //    res.view('user/login');
 // },

     
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
          } else {
            if(!_.isEmpty(reses)){
              reses.forEach(function(res){
              User.find({$and: [{id: {$in: [res.id]}}, {password: req.param("password")}]}).exec(function(err, response) {
                if(err){
                  console.log('database error');
                } else {
                  if(!_.isEmpty(response)){
                    user.name=response[0].username;
                    user.email =response[0].email;
                    user.mobile=response[0].mobile;
                    console.log(user.email);
                    
                  } else {
                    console.log('Wrong password');
                  }
                }
              });  

              console.log(res.mobile);
            })
            } else {
              console.log('User not found');       
            }
          }
        });
    }
         //   if(err){
              //      res.send(400, { error: "Wrong Password" });
              //   } else {
              //   res.send(404, { error: "User not Found" });
              //   }
              // });
              //loginsuccess = true;
             //req.session.authenticated = true; 
             //req.session.userId = user.id;
             // console.log(user.name);
             // console.log(user.email);
             // console.log(user.mobile);
           // res.redirect('index/index');
            

          //}
          
       

// // User.find({$and: [{username: username}, {password: password}]}).exec(function(err, response) {
//           if(err){
//             res.send(500, {error: 'Database error'});
//           } else {
//             if(!_.isEmpty(response)){
//               user.name=response[0].username;
//               user.email =response[0].email;
//               user.mobile=response[0].mobile;
                           

//               // user.find({password: password}, function(err, success){
//               //   if(err){
//               //      res.send(400, { error: "Wrong Password" });
//               //   } else {
//               //   res.send(404, { error: "User not Found" });
//               //   }
//               // });
//               //loginsuccess = true;
//              //req.session.authenticated = true; 
//              //req.session.userId = user.id;
//              console.log(user.name);
//              console.log(user.email);
//              console.log(user.mobile);
//            // res.redirect('index/index');
//             }

//           }
          
//         });
     
//       }
// };

};
