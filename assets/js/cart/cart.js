try {
	(function($){

		// store product info in local storage if user is not logged in
		var cartLocalStorage = function (e, el) {
			e.preventDefault();
			var $form = el.closest($('form')),
				$span = $form.find($('span')),
				i = 0,
				$values = [];
			$span.each(function(){
				var $this = $(this),
					obj = {};
					obj.name = $this.attr('data-value');
					obj.value = $this.text();
				$values[i] = obj;
				i++;
			});

			// console.log($values);

			// if(localStorage){
			// 	localStorage.setItem($values.name, $values.value);
			// }
		};

		// cart view from local storage
		var cartLocalView = function(){
			// console.log('111');
			if(localStorage){
				// console.log(localStorage.getItem('id', 'price'));	
			}
		};
		
		$(document).ready(function(){
			// Binding the functions with elements
			$(document).on('click', '.cart-add', function(e){
				var $this = $(this);
				cartLocalStorage(e, $this);
				$this.closest($('form')).submit();
			});



			//functions to call on page load will come here 
			cartLocalView();
		});

		window.cartLocalStorage = cartLocalStorage;
		window.cartLocalView = cartLocalView;

	}(jQuery));
}

catch (error) {
	console.log(error);
}