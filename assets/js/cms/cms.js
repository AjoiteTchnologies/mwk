try{
	(function($){
		var $doc = $(document);

		var createCms =  function(e, el){
			e.preventDefault();
			var $form    = el.closest('form'),			
				$ajaxUrl = $form.attr('action'),
				$formData = {
					'type' : $form.find($('input[type="radio"]:checked')).val(),
					'name' : $form.find($('input[name="name"]')).val(),
					'idUrl' : $form.find($('input[name="identifier"]')).val(),
					'content' : $form.find($('input[name="content"]')).val(),
					'status' : 'inactive' 
				};
			console.log($formData);

			$.ajax({
				url: $ajaxUrl,
				type: 'POST',
				data: $formData,
				success: function(data){
					$('.success-message').text(data).fadeIn().delay(3000).fadeOut();
				},
				failure: function(){
					$('.failure-message').text('Error').fadeIn().delay(3000).fadeOut();
				}
			})
		};

		var deleteCms =  function(el){
			var $formData = {
				'idUrl' : el.attr('data-id'),
			};
			// console.log($formData);

			$.ajax({
				url: '/cms/delete/' + el.attr('data-id'),
				type: 'POST',
				success: function(data){
					console.log();
					$('.success-message').text('Successfully Deleted').fadeIn().delay(3000).fadeOut();
				},
				failure: function(){
					$('.failure-message').text('Error').fadeIn().delay(3000).fadeOut();
				}
			})
		};

		$doc.ready(function(){
			
			// bind functions with events
			$('.create-cms').click(function(e){
				createCms(e, $(this));
			});
			
			$('.delete-cms').click(function(){
				deleteCms($(this));
			})
		});

	}(jQuery));
}
catch {

}