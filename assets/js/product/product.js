try {
	(function($){
		var $doc = $(document);

		// buy now function
		var buyNow = function(el){
			var $qtyBox = $('.cart-qty'),
				$qty = parseInt($qtyBox.val()),
				$moq = parseInt($qtyBox.attr('data-moq')),
				$stock = parseInt($qtyBox.attr('data-stock')),
				$sample = $qtyBox.attr('data-sample').toLowerCase();

			var $valid = validQty($qty, $moq, $stock, $sample);
			if($valid == true){
				el.closest($('form')).submit();
			}
		}

		$doc.ready(function(){
			
			// buy now click event
			$doc.on('click', '.buy-now', function(e){
				e.preventDefault();
				buyNow($(this));
			});
						
		});

	}(jQuery));
}
catch {

}