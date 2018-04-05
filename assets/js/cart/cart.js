try {
	(function($){

		// store product info in local storage if user is not logged in
		var cartLocalStorage = function (e, el) {
			e.preventDefault();
			// localStorage.removeItem('cart');
			var $pId = $('.product-id').text(),
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
					// console.log($key);
				}
				else {
					$key.push($obj);
					localStorage.setItem('cart', JSON.stringify($key));
					// console.log($key);			
				}
			}
			else {
				$arr.push($obj);
				localStorage.setItem('cart', JSON.stringify($arr));
				var abc = localStorage.getItem('cart');
				// console.log($key);
			}
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
				// console.log($idObj);

				$.ajax({
					'url' : '/cart',
					'method' : 'POST',
					'data' : $idObj,
					'success' : function(response) {
						console.log(response);
					},
					'failure' : function(error){
						console.log(error);
					}
				});
			}
		};
		
		$(document).ready(function(){
			// Binding the functions with elements
			$(document).on('click', '.cart-add', function(e){
				var $this = $(this);
				cartLocalStorage(e, $this);
				$this.closest('form').submit();
				cartLocalView();
			});

			//functions to call on page load will come here 
			
		});

		window.cartLocalStorage = cartLocalStorage;
		window.cartLocalView = cartLocalView;

	}(jQuery));
}

catch (error) {
	console.log(error);
}