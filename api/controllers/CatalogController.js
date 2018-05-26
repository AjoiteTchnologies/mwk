/**
 * CatalogController
 *
 * @description :: Server-side logic for managing catalogs
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	index: function(req, res) {
		var catName = req.path,
			catName = catName.split('/'),
			catName =catName[2].replace(/%20/g, ' ');
		
		var responseObj = {
			layout: 'layout',
			pageType: 'catalogCategory',
			headerCategory: {},
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
				facets: {}
			}
		};

		async.series({

			getHeader: function(callback) {
                sails.services.commonservices.getHeaderCategory(function(err, category) {
					if(err){
						sails.log('Could not get header!');
					}	
                    else {
                        responseObj.headerCategory = category;
                        callback(null, null);
                    }
                });
            },

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
				Productmapping.find({catId : { $in : responseObj.catDetail.totalCategories}})
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

			getFilters : function(callback){
				Facets.find({ filterId : responseObj.catDetail.facetId}).
				exec(function(err, facets){
					if(err){
						sails.log('Could not get filters!')
					}
					else {
						responseObj.catDetail.facets = facets;
						callback(null, null);
					}
				});
			}

		}, function(err, asyncResults) {
            if (!err) {
            	// sails.log(responseObj);     
            	return res.view(responseObj);
            } 
            else{
            	sails.log('Could not load page!');
            }
        });
	}
};