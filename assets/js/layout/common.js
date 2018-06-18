try{

	(function($){

		// quantity validation function
		var validQty = function($qty, $moq, $stock, $sample){
			var $error = $('.error-msg');
			$error.text('');
			if($sample == 'yes'){
				if($qty !== 1){
					if($qty == 0){
						$('.error-msg').text('Please select quantity.');
						return false;
					}
					else if($moq > $qty){
						$('.error-msg').text('minimum order quantity is ' +  $moq);
						return false;
					}
					else if($qty > $stock){
						$('.error-msg').text('Available stock is ' +  $stock);
						return false;
					}
					else{
						return true;
					}
				}
			}
			else if($sample == 'no'){
				if($qty == 0){
						$('.error-msg').text('Please select quantity.');
						return false;
					}
					else if($moq > $qty){
						$('.error-msg').text('minimum order quantity is ' +  $moq);
						return false;
					}
					else if($qty > $stock){
						$('.error-msg').text('Available stock is ' +  $stock);
						return false;
					}
					else{
						return true;
					}
			}
			else{
				return true;
			}
		}

		window.validQty = validQty;

	}(jQuery));

}
catch{

}