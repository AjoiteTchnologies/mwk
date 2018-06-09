/**
 * CartController
 *
 * @description :: Server-side logic for managing carts
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	index : function(req, res){
		if(req.body !== '' && req.body !== undefined && req.body !== null){
			var pid = req.body.pid,
				qty = req.body.qty,
				productData = {},
				productDetail = {};

			var responseObj = {
				layout : 'layout',
				pageType : 'cart',
				qty : qty,
				productData : {}
			}

			async.auto({

				getProductData : function(callback){
					Productmapping.find({productId : ['PRD10003', 'PRD10004']}) //['PRD10003', 'PRD10004']
					.exec(function(err, response){
						if(err){
							sails.log('Could not find products!');
						}
						else {
							productData = response;
							callback(null, null);
						}
					});
				},

				getProductDetail : function(callback){
					Productdetail.find({productId : ['PRD10003', 'PRD10004']})
					.exec(function(err, response){
						if(err){
							sails.log('Could not find products!');
						}
						else {
							productDetail = response;
							callback(null, null);
						}
					});
				}

			}, function(err, asyncResults){
				if(!err){

					for(var i = 0; i < productData.length; i++){
						
						for(var i = 0; i < productDetail.length; i++){
							if(productData[i].productId == productDetail[i].productId){
								var result = sails.services.commonservices.merge(productData[i], productDetail[i]);
								responseObj.productData[productData[i].productId] = result;
							}
						}
					}					

					// sails.log(responseObj);
					return res.view(responseObj);
				}
				else {
					sails.log('Could not load page!');
				}
			});
		}
		else{
			return res.view(responseObj);
		}
	}
};

