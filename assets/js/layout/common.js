try{

	(function($){

		var $doc = $(document);

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

		// open popup function
		var popup = function(el){
			var $popupId = el.attr('data-id'),
				$popupData = $('#' + $popupId);

			$('body').append('<div class="overlay"></div>');
			$('.popup-open').append($popupData);
			$popupData.show();

			var $popupHeight = ($popupData.height() + 60 ) / 2,
				$popupWidth	= ($popupData.width() + 60) / 2;

			$popupData.css('margin', '-' + $popupHeight + 'px 0 0 -' + $popupWidth +'px');

			$('body').css('overflow', 'hidden');
			
		}

		// popup close function
		var popupClose = function(target){
			target.hide();
			$('.overlay, .popup-open').remove();
			$('body').css('overflow', 'auto');
		}

		// bind functions with events

			//popup open function
			$doc.on('click', '.popup', function(){
				popup($(this));
			})

			// close popup function
			$doc.on('click', '.overlay', function(){
				popupClose($('.popup-data'));
			});


		window.validQty = validQty;
		window.popup = popup;
		window.popupClose = popupClose;

	}(jQuery));

}
catch{

}