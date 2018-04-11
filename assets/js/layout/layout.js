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
		var signuplogin = function(e, el){
			e.preventDefault();
			var $container = el.closest('div'),
				$id = $container.attr('id'),
				$form = $container.find($('form')),
				$url = $form.attr('action'),
				$formData = {};

			if($id == 'login-form') {
				$formData = {
					'email' : $form.find($('input[name=email]')).val()
				}
			}
			else {
				$formData = {
					'fullname' : $form.find($('input[name=fullname]')).val(),
					'email' : $form.find($('input[name=email]')).val(),
					'password' : $form.find($('input[name=password]')).val(),
					'mobile' : $form.find($('input[name=mobile]')).val()
				}
			}
			
			$.ajax({
				url: $url,
				type: 'POST',
				data: $formData,
				success: function(data){
					if(data == 'done'){
						console.log('Successfully Signed Up!');
					}
					else {
						if(data == ''){
							console.log('Email id does not exist!');
						}
						else {							
							var $validUser = userAuth(data, $form),
								$validmsg = $validUser == true ? 'Successfully LoggedIn!' : 'Password does not match!';
							console.log($validmsg);
						}
					}
				},
				failure: function(){
					console.log('fail');
				}
			});
		}

		// login or signup ajax call
		var userAuth = function(obj, el){
			var $pass = el.find('input[name=password]').val(),
				$validUser = false;
			// console.log(obj, el);

			$.each(obj, function(index, value){
				// console.log(value.password);
				if(value.password == $pass){
					$validUser = true;
				}
			});
			return $validUser;
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
				$doc.on('click', '.signup-login', function(e){					
					signuplogin(e, $(this));
				});

		});

	}(jQuery));
}
catch(error) {
	console.log(error);
}