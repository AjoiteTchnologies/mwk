try {
	(function($){

		var $doc = $(document);

		var sendAjax = function($url, $reqType, $data, callback){

			$.ajax({
				url : $url,
				type : $reqType,
				data : $data,
				success : function(data){
					if(typeof callback == 'function'){
						callback(data);
					}
				},
				failure : function(){
					if(typeof callback == 'function'){
						callback('error');
					}
				}
			});
		}

	window.sendAjax = sendAjax;

	}(jQuery))
}
catch{

}