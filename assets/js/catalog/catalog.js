try{
	(function($){
		var $doc = $(document);
		
		// facet click function
		var facetSelect = function(el){
			if(!el.hasClass('checked')){
				el.addClass('checked');
			}
			else {
				el.removeClass('checked');
			}
		}

		$doc.ready(function(){
			$('.facet-list a').click(function(){
				facetSelect($(this));
			})
		});

	}(jQuery));
}
catch(error) {
	console.log(error);
}