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

		// sorting drop down function
		var sortList = function(el){
			var sortOptions = el.find($('.options-list'));
			if(sortOptions.is(':visible')){
				sortOptions.slideUp();
			}
			else {
				sortOptions.slideDown();
			}
		}

		// close sorting list
		// var closeSort =  function(){
		// 	$('.options-list').slideUp();
		// }

		// sort option click function
		var sortCat = function(el){
			if(!el.hasClass('selected')){
				$('.options-list a').removeClass('selected');
				el.addClass('selected');
				$('.sort-options').text(el.text());
			}
		}

		$doc.ready(function(){

			// below are the binding of functions with events

			// facet click function
			$('.facet-list a').click(function(){
				facetSelect($(this));
			});

			// sorting dropdown function
			$doc.on('click', '.cat-sorting', function(){
				sortList($(this));
			});

			// sort option selection function
			$doc.on('click', '.options-list a', function(e){
				sortCat($(this));
			});

			//close sorting list on click on anywhere but list
			// $doc.on('click', function(){
			// 	closeSort();
			// });
		});

	}(jQuery));
}
catch(error) {
	console.log(error);
}