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

	list: function(req, res){
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
				res.view('cms/list', responseObj);
			}
		});
	},

	add: function(req, res){		
		var id = req.param('id');
		var responseObj = {
			layout : 'layout'
		};
		sails.log(id);

		if(id == '' && id == null && id == undefined){
			res.view('cms/add', responseObj);
		}
		else {
			Cms.find({name : id})
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

		if(id != '' && id != null && id != undefined){
			// sails.log('update');
			// sails.log(id);
			Cms.update({name : id},data)
			.exec(function(err, response){
				if(err){
					sails.log('Could not update cms!!');
				}
				else {
					res.redirect('cms/add');
				}
			});
		}

		else{
			// sails.log('new data')
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
		// sails.log(id);

		Cms.destroy({name : id})
		.exec(function(err, response){
			if(err){
				sails.log('Could not delete CMS');
			}
			else {
				res.redirect('cms/list');
			}
		});
	},

	view: function(req, res){
		var pageId = '/cms/page/' + req.param('pageId');
		var responseObj = {
			layout : 'layout',
			pageType : 'cms'
		};

		Cms.findOne({idUrl : pageId})
		.exec(function(err, response){
			if(err){
				sails.log('CMS page not found!!');
			}
			else {
				sails.log(response);
				responseObj.response = response;				
				res.view('cms/view', responseObj);
			}
		});
	}

};

