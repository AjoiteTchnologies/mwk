/**
 * AjaxController
 *
 * @description :: Server-side logic for managing ajaxes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var CatalogController = require('./CatalogController');

module.exports = {
	
	catsort : function(req, res){
		var ids = req.body.ids,
			order = req.param('order'),
			name = req.param('name'),
			totalProducts = req.body.totalProducts,
			pageSize = req.body.pageSize,
			param;

		var responseObj = {
			layout: 'layout-ajax',
			pageType: 'ajax',
			catDetail : {
				totalProducts : totalProducts,
				pageSize : pageSize,
				productList : {}
			}
		};
		if(req.param('name') == 'price'){
			name = name + '.discounted';
		}		
		param = name + ' ' + order;
		// sails.log(param);

		Productmapping.find({catId : {$in : ids}}).sort(param).limit(pageSize)
		.exec(function(err, response){
			if(err){
				sails.log('Could not sort the results!');
			}
			else {
				responseObj.catDetail.productList = response;
				// sails.log(responseObj.catDetails);
				return res.view(responseObj);
			}
		});
	},

	pagination : function(req, res){
		var ids = req.body.ids,
			order = req.param('order'),
			name = req.param('name'),
			totalProducts = req.body.totalProducts,
			pageSize = req.body.pageSize,
			pageRequest = req.param('pageNo'),
			skipNo = (parseInt(pageRequest) -1) * pageSize;		

		var responseObj = {
			layout : 'layout-ajax',
			pageType : 'ajax',
			catDetail : {
				totalProducts : totalProducts,
				pageSize : pageSize,
				pageRequest : pageRequest,
				productList : {}
			}
		}

		if(name !== '' && name !== null && name !== undefined && name == 'price' && order !== '' && order !== null && order !== undefined ){
			if(sortName == 'price') {
				name = name + '.discounted';
			}			
			param = name + ' ' + order;
			// sails.log(order + 'param1');
		}
		else{
			param = 'price.disconted asc';
			// sails.log(param + 'param2');
		}



		Productmapping.find({catId : { $in : ids}}).sort(param).limit(pageSize).skip(skipNo)
		.exec(function(err, response){
			if(err){
				sails.log('Could not get products!')
			}
			else {
				// sails.log(response);
				responseObj.catDetail.productList = response;				
				return res.view('ajax/catsort',responseObj);
			}
		});
	},

	catFilter: function(req, res) {
		var catName = req.body.catName,
			filterName = req.body.filterName,
			filterValue = req.body.filterValue,
			sortName = req.body.sortName,
			sortOrder = req.body.sortOrder;

		var responseObj = {
			layout: 'layout-ajax',
			pageType: 'categoryWithFilter',
			breadCrumb: [],
			catDetail: {
				name: catName,
				catId: '',
				catTree: {},
				catData: {},
				isActive: '',
				path: {},
				totalCategories : [],
				productList: [],
				productCount: '',
				facetId: '',
				facets: {},
				totalProducts: '',
				pageSize: 10
			}
		};

		if(sortName !== '' && sortName !== null && sortName !== undefined && sortOrder !== '' && sortOrder !== null && sortOrder !== undefined ){
			if(sortName == 'price') {
				sortName = sortName + '.discounted';
			}			
			param = sortName + ' ' + sortOrder;
			// sails.log(order + 'param1');
		}
		else{
			param = 'price.disconted asc';
			// sails.log(param + 'param2');
		}

		async.series({

			getCategoryDetail : function(callback){
				Catmapping.findOne({name: catName})
				.exec(function(err, catDetail){
					if(err){
						res.send('Could not get category details!');
					}
					else {
						responseObj.catDetail.catId = catDetail.catId;
						responseObj.catDetail.isActive = catDetail.isActive;
						responseObj.catDetail.path = catDetail.path;
						// sails.log(responseObj.catDetail.path);
						callback(null, null);
					}
				});
			},

			getCategoryData : function(callback){
				Catdetails.find({catId : responseObj.catDetail.catId})
				.exec(function(err, catData){
					if(err){
						sails.log('Could not get categorydata!')
					}
					else {
						responseObj.catDetail.catData = catData;
						_.each(catData, function(item, index){
							responseObj.catDetail.facetId = item.filterId;
						});

						callback(null, null);
					}
				});
			},

			getCategoryTree : function(callback){
				if(responseObj.catDetail.path == ''){
					responseObj.catDetail.catTree.l1 = responseObj.catDetail.catId;
				}
				else {
					responseObj.catDetail.catTree.l1 = responseObj.catDetail.path;
				}
				// sails.log(responseObj.catDetail.catTree.l1)	;					
				Catmapping.find({path: {$in : [responseObj.catDetail.catTree.l1]}}, {_id : 0})
				.exec(function(err, catTree){
					if(err){
						res.send('Could not get category tree!');
					}
					else {
						if(catTree.length > 0){
							responseObj.catDetail.catTree.l2 = catTree;	
							callback(null, null);
						}
						else {			
							callback(null, null);
						}
					}
					// sails.log(responseObj.catDetail.catTree);
				});
			},

			getCategoriesForProduct : function(callback){
				callback(null, null);
				// sails.log(responseObj.catDetail.catTree);
				_.each(responseObj.catDetail.catTree, function(category, index){
					if(typeof category == 'string'){
						responseObj.catDetail.totalCategories.push(category);
					}
					else{
						_.each(category, function(cat, index){	
							responseObj.catDetail.totalCategories.push(cat.catId);
						});
						// sails.log(totalCategories);
					}
				});
			},

			getProducts : function(callback){
				// sails.log(responseObj.catDetail.totalCategories);
				Productmapping.find({catId : { $in : responseObj.catDetail.totalCategories} }).sort(param).limit(responseObj.catDetail.pageSize)
				.exec(function(err, products){
					if(err){
						sails.log('Could not get products!')
					}
					else {
						responseObj.catDetail.productList = products;
						responseObj.catDetail.productCount = products.length;
						// sails.log(products);
						callback(null, null);
					}
				});
			},

			getProductCount : function(callback){
				// sails.log(responseObj.catDetail.totalCategories);
				Productmapping.count({catId : { $in : responseObj.catDetail.totalCategories}})
				.exec(function(err, products){
					if(err){
						sails.log('Could not get products!')
					}
					else {
						responseObj.catDetail.totalProducts = products;
						// sails.log(products);
						callback(null, null);
					}
				});
			},

			getFilters : function(callback){
				Facets.find({ filterId : responseObj.catDetail.facetId})
				.exec(function(err, facets){
					if(err){
						sails.log('Could not get filters!')
					}
					else {
						responseObj.catDetail.facets = facets;
						sails.log(facets);
						callback(null, null);
					}
				});
			},

			getBreadCrumbs : function(callback){
				// responseObj.catDetail.path = ['CAT102','CAT110'];
				if(responseObj.catDetail.path == ''){
					responseObj.breadCrumb.push(responseObj.catDetail.name);
					callback(null, null);
				}
				else {
					// sails.log(responseObj.catDetail.path);
					Catmapping.find({catId : responseObj.catDetail.path})
					.exec(function(err, response){
						if(err){
							sails.log('Could not get breadcrumb!');
						}
						else {
							for(var i = 0; i < response.length; i++){
								responseObj.breadCrumb.push(response[i].name);
							}
							responseObj.breadCrumb.push(responseObj.catDetail.name);
							// sails.log(responseObj.breadCrumb);
							callback(null, null);
						}
					});
				}				
			}

		}, function(err, asyncResults) {
            if (!err) {
            	// sails.log(responseObj.catDetail.productList);     
            	return res.view(responseObj);
            } 
            else{
            	sails.log('Could not load page!');
            }
        });

	}
};