try {
	(function($){
		var $doc = $(document);

		// store product info in local storage if user is not logged in
		var cartLocalStorage = function (e, el) {
			e.preventDefault();
			// localStorage.removeItem('cart');
			var $pId = $('.product-id').attr('value'),
				$qty = $('.qty').val(),
				$obj = {},
				$arr = [],
				$key = JSON.parse(localStorage.getItem('cart')),
				$counter = false;

			$obj = {
				'id' : $pId,
				'qty' : $qty
			};

			if($key){
				$.each($key, function(index, value){
					if(value.id == $pId) {
						$qty = parseInt($qty) + parseInt(value.qty);
						value.qty = $qty;
						$key[index] = {'id' : value.id, 'qty' : value.qty};
						$counter = true;
					}						
				});

				if($counter == true) {
					localStorage.setItem('cart', JSON.stringify($key));
					console.log(typeof($key));
				}
				else {
					$key.push($obj);
					localStorage.setItem('cart', JSON.stringify($key));
					console.log(typeof($key));			
				}
			}
			else {
				$arr.push($obj);
				localStorage.setItem('cart', JSON.stringify($arr));
				var abc = localStorage.getItem('cart');
				console.log($key);
			}
			cartLocalView();
		};

		// cart view from local storage
		var cartLocalView = function(){
			if(localStorage){
				var $pIds = JSON.parse(localStorage.getItem('cart')),
					$idObj = {},
					$key = 'product';

				// console.log(typeof($pIds[1]), $pIds.length);
				for(var i=0; i<$pIds.length; i++){					
					$idObj['product'+i] = $pIds[i];
				}

				$('.cart-storage').attr('value', JSON.stringify($idObj));		
				// console.log($idObj);
			}
		};

		// update cart total
		var cartTotal = function(){
			var $grandTotal = 0;
			$('.cart-products').each(function(){
				var $this = $(this),
					$prdPrice = $this.find($('.prd-price')).text(),
					$prdPrice = parseInt($prdPrice.replace('₹', '')),
					$prdQty = parseInt($this.find($('.cart-qty')).val()),
					$total = $prdPrice * $prdQty;

				$grandTotal = $grandTotal + $total;
				$this.find($('.prd-total')).text('₹ ' + $total);
			});
			$('.grand-total').text('₹ ' + $grandTotal);
		}

		// edit quantity function
		var qtyEdit = function(el){
			var $action = el.text(),
				$qtyBox = el.siblings($('input'));

			if($action == 'Edit'){
				$qtyBox.removeAttr('disabled');
				el.text('Save');
			}
			else if($action == 'Save'){
				var $qty = parseInt($qtyBox.val()),
					$moq = parseInt($qtyBox.attr('data-moq')),
					$stock = parseInt($qtyBox.attr('data-stock')),
					$sample = $qtyBox.attr('data-sample').toLowerCase();

				var $valid = validQty($qty, $moq, $stock, $sample);
				if($valid == true){
					$qtyBox.attr('disabled', 'disabled');
					$qtyBox.attr('value', $qtyBox.val());
					el.text('Edit');
					cartTotal();
				}
			}
		}

		$doc.ready(function(){
			// Binding the functions with elements
			$doc.on('click', '.cart-add', function(e){
				var $this = $(this);
				cartLocalStorage(e, $this);
				$this.closest('form').submit();
			});

			$doc.on('click', '.cart-qchange', function(){
				qtyEdit($(this));
			})

			//functions to call on page load will come here 
			cartTotal();
		});

		window.cartLocalStorage = cartLocalStorage;
		window.cartLocalView = cartLocalView;

	}(jQuery));
}

catch (error) {
	console.log(error);
}