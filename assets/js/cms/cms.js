try{
	(function($){
		var $doc = $(document);

		var pageTypeShowHide = function(el){
			var val = el.val();

			if(val == 'block'){
				$('.block-page').slideDown();
				$('.block-page select').addClass('required');
			}
			else{
				$('.block-page').slideUp();
				$('.block-page select').removeClass('required');
			}
		}

		var createCms =  function(el){
			var $form    = el.closest('form'),			
				$ajaxUrl = $form.attr('action'),
				$pageType = $form.find($('input[type="radio"]:checked')).val(),
				$idUrl = $form.find($('input[name="identifier"]')).val();

			if($pageType == 'page'){
				if($idUrl.indexOf('/cms/page/') !== -1){
					$idUrl = $idUrl;
				}
				else{
					$idUrl = '/cms/page/' + $idUrl;
				}				
				$formData = {
					'type' : $pageType,
					'name' : $form.find($('input[name="name"]')).val(),
					'idUrl' : $idUrl,
					'content' : $form.find($('textarea')).val(),
					'status' : 'inactive' 
				};
			}
			else {
				$idUrl = $idUrl;
				$formData = {
					'type' : $pageType,
					'name' : $form.find($('input[name="name"]')).val(),
					'page' : $form.find($('select')).val(),
					'idUrl' : $idUrl,
					'content' : $form.find($('textarea')).val(),
					'status' : 'inactive' 
				};
			}

			// console.log('added');
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
			var idUrl = el.attr('data-id');

			$.ajax({
				url: '/cms/delete/' + idUrl,
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

			//create cms function
			$('.create-cms').click(function(e){				
				e.preventDefault();
				var $this = $(this);
				var valid = validate($this);
				if(valid == true){
					createCms($this);
				}
			});
			

			//delete cms function
			$('.delete-cms').click(function(){
				deleteCms($(this));
			});


			// show hide page type function
			$('.cms-pagetype').click(function(){
				pageTypeShowHide($(this));
			})
		});

	}(jQuery));
}
catch {

}