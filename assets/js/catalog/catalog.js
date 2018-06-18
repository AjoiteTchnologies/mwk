try{
	(function($){
		var $doc = $(document);
		
		// facet click function
		var facetSelect = function(el){
			var $url = '/ajax/catFilter',
				$sort = $('.sort-options').attr('data-query').split('|'),
				$data = {
					'filterValue' : el.text(),
					'filterName' : el.closest($('.facet-list')).siblings($('.facet-name')).text(),
					'catName' : $('.cat-heading').find('h2').attr('data-name'),
					'sortName' : $sort[0],
					'sortOrder' : $sort[1]
				};
			// console.log($sort);

			var response = sendAjax($url, 'POST', $data, function(res){
				if(res !== ''){
					$('.catalog-body').html('');
					$('.catalog-body').html(res);
					
					if(!el.hasClass('checked')){
						el.addClass('checked');
					}
					else {
						el.removeClass('checked');
					}
				}
			});
			
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

		// sort option click function
		var sortCat = function(el){

			var $atr = el.attr('data-query').split('|'),
				$data = {
					'ids' : ($('.product-catalog').attr('data-ids')).split(','),
					'totalProducts' : $('.pages').attr('data-total'),
					'pageSize' : $('.pages').attr('data-size')
				},
				$url = '/ajax/catsort/?name=' + $atr[0] + '&order=' + $atr[1];
				
			var response = sendAjax($url, 'POST', $data, function(res){
				if(res !== ''){
					$('.product-list-box').html('');
					$('.product-list-box').html(res);				
					if(!el.hasClass('selected')){
						$('.options-list a').removeClass('selected');
						el.addClass('selected');
						$('.sort-options').text(el.text()).attr('data-query', el.attr('data-query'));
					}
					console.log(res);
				}
			});
			// console.log(response);
		}

		//pagination click function
		var pagination = function(el){
			var $currentPage = el.attr('data-pageno'),
				$atr = $('.sort-options').attr('data-query'),
				$data = {
					'ids' :  ($('.product-catalog').attr('data-ids')).split(','),
					'totalProducts' : $('.pages').attr('data-total'),
					'pageSize' : $('.pages').attr('data-size')
				};
			if($atr !== '' && $atr !== null && $atr !== undefined ){
				$atr = $atr.split('|');
				$url = '/ajax/pagination/?name=' + $atr[0] + '&order=' + $atr[1] + '&pageNo=' + $currentPage;
			}
			else{
				$url = '/ajax/pagination/?pageNo=' + $currentPage;
			}
						
			// console.log($data);
			
			var response = sendAjax($url, 'POST', $data, function(res){
				console.log(el);
				if(res !== ''){
					$('.product-list-box').html('');
					$('.product-list-box').html(res);
					$('.pages span').removeClass('active');
					$('.pages span:eq(' + (parseInt($currentPage) - 1) + ')').addClass('active');
				}
			})
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

			// pagination function call
			$doc.on('click', '.pages span', function(){
				pagination($(this));
			});

		});

	}(jQuery));
}
catch(error) {
	console.log(error);
}