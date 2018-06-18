/* 
	- To apply validation call the "validate" function first in your submit function.
	- Add "required" class in all inputs on which the validation would be applicable.
	- Then add required validation classes such as "mobile, password" etc. as per your 
	  requirement. 
*/

try {
	(function($){
		var $doc = $(document);

		// only numbers
		$doc.on('input', '.number-only', function(){
			$(this).val($(this).val().replace(/[^0-9]/g, ''));
		})

		//validation for mobile
		var validateMobile = function(data){
			var msg;
			if(data.length < 10){
				msg = (10 - parseInt(data.length)) + 'characters are missing.'
				return msg;
			}
			else {
				var pattern = /^\d{10}$/;
				if(!pattern.test(data)){
					msg = 'Please enter a valid mobile no.';
					return msg;
				}
			}
			return true;
		};

		//validation for email
		var validateEmail = function(data){
			var pattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                msg;
            if(!pattern.test(data)){
            	msg = 'Please enter valid email.';
            	return msg;
            }

            return true;
		}

		//validation for password
		var validatePassword = function(data){
			var msg;
			if(data.length < 6){
				msg = "Minimum 6 characters required.";
				return msg;
			}
			return true;
		}

		//validation for no special character
		var validateSpecial = function(data){
			var pattern =  /[^a-zA-Z0-9\-\/]/,
				msg;
			
			if(pattern.test(data)){
				msg = 'No special caharaters are allowed.';
				return msg;
			}

			return true;
		}

		//validation for no space
		var validateSpace = function(data){
			var msg;

			if(data.indexOf(' ') > -1){
				msg = 'No spaces allowed.';
				return msg;
			}

			return true;
		}


		// form validation function
		var validate = function(el){
			var $validatForm = el.closest('form'),
				$validationFields = $validatForm.find($('.required')),
				str = true;

			$('.error-msg').text('');

			$.each($validationFields, function(){
				var $this = $(this),
					$value = $this.val(),
					$error = $this.next($('.error-msg')),
					result;
				if($value === '' && !$this.hasClass('radio')){
					$error.text('This field can not be empty.');
					str = false;
				}
				else {
					if($this.hasClass('mobile')){
						result = validateMobile($value);

						if(result !== true){
							$error.text(result);
							str = false;
						}
					}

					else if($this.hasClass('email')){
						result = validateEmail($value);

						if(result !== true){
							$error.text(result);
							str = false;
						}
					}

					else if($this.hasClass('password')){
						result = validatePassword($value);

						if(result !== true){
							$error.text(result);
							str = false;
						}
					}

					else if($this.hasClass('special')){
						result = validateSpecial($value);

						if(result !== true){
							$error.text(result);
							str = false;
						}
					}

					else if($this.hasClass('space')){
						result = validateSpace($value);

						if(result !== true){
							$error.text(result);
							str = false;
						}
					}
				}
			});
			// console.log(str);
			return str;
		}
	
		window.validate = validate;
	}(jQuery));
}
catch {

}
