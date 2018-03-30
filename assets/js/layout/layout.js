try {

	(function($){

		var $doc = $(document);
		// login and signup js starts here

		// login / signup popup function
		var popupLoginSignup = function(el){
			var $href = el.attr('data-href');

			$('.login-signup-form').each(function(){
				var $this = $(this),
					$id = $this.attr('id');

				if($id == $href && !$this.is(':visible')){
					$('.login-signup-form').hide();
					$this.show();
					$('.overlay').show();
				}

			});
		}

		// popup close function
		var popupClose = function(target){
			target.hide();
			$('.overlay').hide();
		}

		// new user signup function
		var signup = function(){
			$.ajax({
				url: '',
				type: 'POST',
				data: $('#signup-form').serialize(),
				success: function(data){
					console.log(data);
				}
			});
		}

		$doc.ready(function(){

			//functions to call on page load will come here 


			//functions to bind with events will come here

				// open login / signup popup function
				$doc.on('click', '.login-signup-link', function(){
					popupLoginSignup($(this));
				});

				// close popup function
				$doc.on('click', '.overlay', function(){
					popupClose($('.login-signup-form'));
				});

				// call signup function
				$doc.on('click', '#signup-btn', function(e){
					// e.preventDefault();
					signup();
				});

		});

	}(jQuery));
}
catch(error) {
	console.log(error);
}