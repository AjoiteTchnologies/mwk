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
			productInfo: {
				productId: prdId,
				productData: {},
				productDetail: {}
			}
		}

		async.auto({
			
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

		}, function(err, asyncResults) {
            if (!err) {
            	// sails.log(responseObj);      
            	return res.view(responseObj);
            } 
            else{
            	sails.log('error');
            }
        });
		
	}
	
};

