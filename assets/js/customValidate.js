$(document).ready(function (){
	$('#signup').validate({
		rules: {
			username: {
				required: true
			},
			email: {
				type: 'email',
				required: true
				
			},
			password: {
				required: true,
				minlength: 6
			},
			confirmPassword: {
				minlength: 6,
				required: true,
				equalTo: "#signupPassword"
			}
		},
		success: function(){
			element
			.text('ok').addClasss('valid')
		}
	});
});