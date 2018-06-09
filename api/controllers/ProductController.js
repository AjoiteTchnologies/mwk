/**
 * ProductController
 *
 * @description :: Server-side logic for managing products
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	// index: function(req, res){
	// 	var responseObj = {
	// 		layout : 'layout',
	// 		id : req.param('id')
	// 	};
	// 	Catalog.findOne({id : responseObj.id}).exec(function(err, list){
	// 		if(err){
	// 			res.send(500, 'Something went wrong!')
	// 		}
	// 		else {
	// 			res.view('product/index', {list : list});
	// 		}
	// 	})
	// }

	index: function(req, res){
		var prdId = req.param('id');

		responseObj = {
			layout: 'layout',
			pageType: 'product',
			headerCategory: {},
			breadCrumb: [],
			productInfo: {
				productId: prdId,
				productData: {},
				productDetail: {},
				productAttr: {}
			}
		}

		async.series({
			
			getProductData : function(callback){
				Productmapping.find({productId: prdId})
				.exec(function(err, product){
					if(err){
						sails.log('error');
					}	
					else {
						responseObj.productInfo.productData = product;
						callback(null, null);
					}
				});
			},

			getProductDetail : function(callback){
				Productdetail.find({productId: prdId})
				.exec(function(err, product){
					if(err){
						sails.log('error');
					}	
					else {
						responseObj.productInfo.productDetail = product;
						callback(null, null);
					}
				});
			},

			getHeader: function(callback) {
                sails.services.commonservices.getHeaderCategory(function(err, category) {
					if(err){
						sails.log('error');
					}	
                    else {
                        responseObj.headerCategory = category;
                        callback(null, null);
                    }
                });
            },

            getBreadCrumbs : function(callback){
            	Catmapping.find({catId : responseObj.productInfo.productData[0].catId})
            	.exec(function(err, category){
            		if(err){
            			sails.log('Could not fetch category!');
            		}
            		else{
						sails.services.commonservices.getBreadCrumb(category[0].name, category[0].path, function(err, breadCrumb){
							if(err){
								sails.log('error');
							}	
		                    else {
		                    	breadCrumb.push(responseObj.productInfo.productData[0].name);
		                        responseObj.breadCrumb = breadCrumb;
		                        callback(null, null);
		                    }
						});
            		}
            	});
			},

			getProductAttr : function(callback){
				Productattr.find({productId : prdId})
				.exec(function(err, prdAttr) {
					if(err){
						sails.log('Could not get attributes!')
					}
					else {
						// sails.log(prdAttr);
						responseObj.productInfo.productAttr = prdAttr[0].attr;
						callback(null, null);
					}
				})
			}

		}, function(err, asyncResults) {
            if (!err) {
            	// sails.log(responseObj.productInfo.productId);      
            	return res.view(responseObj);
            } 
            else{
            	sails.log('error');
            }
        });
		
	}
	
};

