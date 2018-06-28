try {

	(function($){

		var $doc= $(document),
			chkData = {};

		// open and close step function
		var stepToggle = function(el){
			el.closest($('.step-body')).addClass('step-close');
			el.closest($('.chk-step')).next($('.chk-step')).find($('.step-body')).removeClass('step-close');
		}

		// checkout login step function
		var chkLogin = function(el, $parent, type){
			if(type == 'chk-guest'){
				var $data = {
					username : $parent.find($('input[name=email]')).val()
				}
				sendAjax('/user/dologin', 'POST', $data, function(res){
					if(res !== ''){
						chkData.type = 'user';
						console.log('There is a user with this mail Id.');
						$parent.find($('.error-msg')).text('There is a user with this mail Id. Please do the login.').delay(3000).fadeOut();
						$parent.find($('input[name=email]')).val('');
						$parent.siblings($('#chk-user')).find($('input[name=email]')).val($data.username);
						$parent.siblings($('#chk-user')).find($('input[name=password]')).focus();
					}
					else{
						chkData.type = 'new';
						chkData.email = $data.username;
						console.log(chkData);
						stepToggle(el);
					}
				});
			}
		}

		// checkout address select step function
		var chkAdrs = function(el){
			chkData.bAddress = {
				'firstName' : el.find($('input[name=firstname]')).val(),
				'lastName' : el.find($('input[name=lastname]')).val(),
				'address' : {
					'adrs1' : el.find($('input[name=address1]')).val(),
					'adrs2' : el.find($('input[name=address2]')).val(),
					'city' : el.find($('input[name=city]')).val(),
					'state' : el.find($('input[name=state]')).val(),
					'country' : el.find($('input[name=country]')).val(),
					'pincode' : el.find($('input[name=pincode]')).val(),
					'mobile' : el.find($('input[name=mobile]')).val()
				}
			}
		}

		// checkout payment step function
		var chkPmnt = function(el){
			if(el.find($('input[type=radio]')).is(':checked')){
				chkData.payment = el.find($('input[type=radio]:checked')).attr('value');
			}
			console.log(chkData);
		}
		
		// step verification function
		var verifyStep = function(el, $parent, $chkStep){
			if($chkStep == 'chk-guest' || $chkStep == 'chk-user'){
				var valid = validate(el);

				if(valid == true){
					chkLogin(el, $parent, $chkStep);
				}
			}
			else if($chkStep == 'chk-adrs'){
				var valid = validate(el);

				if(valid == true){
					chkAdrs($parent);
					stepToggle(el);
				}
			}
			else if($chkStep == 'chk-pmnt'){
				chkPmnt($parent);
			}
		}

		// checkout step submit function
		var chkSubmit = function(el){
			var $parent = el.closest($('.chk-data')),
				$chkStep = $parent.attr('id');
			
			verifyStep(el, $parent, $chkStep);
		}

		// bind function with events here

		$doc.on('click', '.chk-submit', function(e){
			e.preventDefault();
			// var valid = validate($(this));

			// if(valid == true){
				chkSubmit($(this));
			// }
		});

	}(jQuery));

}
catch {

}