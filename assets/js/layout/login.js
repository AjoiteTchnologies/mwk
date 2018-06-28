try {

	(function($){

		var $doc = $(document);
		// login and signup js starts here

		// user signup and login function
		var signuplogin = function(el){
			var $container = el.closest('section'),
				$id = $container.attr('id'),
				$form = $container.find($('form')),
				$url = $form.attr('data-action'),
				$formData = {},
				response;

			if($id == 'login-form') {
				$formData = {
					'email' : $form.find($('input[name=email]')).val(),
					'password' : $form.find($('input[name=password]')).val()
				}
			}
			else {
				var password = $form.find($('input[name=password]')).val(),
					cPassword = $form.find($('input[name=confirmPassword]')).val();
				if(password == cPassword){
					$formData = {
						'fullname' : $form.find($('input[name=fullname]')).val(),
						'email' : $form.find($('input[name=email]')).val(),
						'password' : password,
						'mobile' : $form.find($('input[name=mobile]')).val()
					}
				}
				else {
					$form.find($('input[name=confirmPassword]')).next($('.error-msg')).text('Confirm password does not match the password!')
				}
			}

			if($formData !== ''){
				response = sendAjax($url, 'POST', $formData, function(res){
					if($id == 'login-form'){
						if(res !== 'error'){
							popupClose($('.popup-data'));
							$('.login').hide();
							$('.logout').show();
							$('.logged-user').text('Welcome ' +res[0].username);
						}
					}
					else{
						if(res !== 'error'){
							$('.success-message').text(res).fadeIn().delay(3000).fadeOut();
						}
					}
				});
			}
		}


		$doc.ready(function(){

			//functions to bind with events will come here

				// call signup function
				$doc.on('click', '.signup-login', function(e){					
					e.preventDefault();
					var result = validate($(this));
					if(result == true){
						signuplogin($(this));
					}
				});

		});

	}(jQuery));
}
catch(error) {
	console.log(error);
}