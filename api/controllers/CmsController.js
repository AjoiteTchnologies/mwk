/**
 * CmsController
 *
 * @description :: Server-side logic for managing cms
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	index: function(req, res){
		var responseObj = {
			layout : 'layout'
		};
		res.view(responseObj);
	},

	view: function(req, res){
		var responseObj = {
			layout : 'layout'
		};
		Cms.find()
		.exec(function(err, response){
			if(err){
				sails.log('Could not load the Cms!!')
			}
			else {
				responseObj.response = response;
				res.view('cms/view', responseObj);
			}
		});
	},

	add: function(req, res){		
		var id = req.param('id');
		var responseObj = {
			layout : 'layout'
		};

		if(id == ''){
			res.view('cms/add', responseObj);
		}
		else {
			Cms.find({idUrl : id})
			.exec(function(err, response){
				if(err){
					sails.log('Cms does not exist!!');
				}
				else{
					responseObj.cms = response;
					res.view('cms/add', responseObj);
				}
			})
		}
	},

	create: function(req, res){
		var data = req.body,
			id = req.param('id');
		sails.log(data);

		if(id != '' && id != null && id != undefined){
			sails.log('update');
			sails.log(id);
			Cms.update({idUrl : id},data)
			.exec(function(err, response){
				if(err){
					sails.log('Could not update cms!!');
				}
				else {
					res.send('CMS successfully Updated!!');
				}
			});
		}

		else{
			sails.log('new data')
			Cms.create(data)
			.exec(function(err, response){
				if(err){
					sails.log('Could not create cms!!');
				}
				else {
					sails.log(response);
					res.send('CMS successfully Created!!');
				}
			});
		}
	},

	delete: function(req, res){
		var id = req.param('id');
		sails.log(id);

		Cms.destroy({idUrl : id})
		.exec(function(err, response){
			if(err){
				sails.log('Could not delete CMS');
			}
			else {
				res.redirect('cms/view');
			}
		});
	}

};

