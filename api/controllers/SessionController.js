/**
 * SessionController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
'new': function(req, res){
	req.session.authenticated = true;
	console.log(req.session);
	res.view('session/new');
}  

};

