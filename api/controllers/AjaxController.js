/**
 * AjaxController
 *
 * @description :: Server-side logic for managing ajaxes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	login : function(req, res) {
		res.view('header/login')
	},

	signup : function(req, res) {
		res.view('header/login')
	}
};

