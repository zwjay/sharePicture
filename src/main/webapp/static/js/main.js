
/* --------------------------------------------------
	Initialization
-------------------------------------------------- */

    // Initialize all functions when the document is ready.
	$(document).ready(function(){

		initResize();
		initScroller();
		initAnimation();
		initIsotope();

	});

/* --------------------------------------------------
	Resize
-------------------------------------------------- */

	function initResize () {
		var header = $(".header-text");
		$(window).scroll(function() {
			var scroll = $(window).scrollTop();
			if ($(".index-page").length > 0) {
				if (scroll >= 270) {
					header.addClass("remove");
				} else {
					header.removeClass("remove");
				}
			}else{
				if (scroll >= 120) {
					header.addClass("remove");
				} else {
					header.removeClass("remove");
				}
			}
		});
	}
	
	
/* --------------------------------------------------
	Scroll Nav
-------------------------------------------------- */

	function initScroller () {
		$('#scroll-page-content').localScroll({
           target:'#page-content'
        });
		$('#page-top').localScroll({
           target:'body'
        });
	}


/* --------------------------------------------------
	Animation
-------------------------------------------------- */

	function initAnimation () {
		new WOW().init();
	}

	
/* --------------------------------------------------
	Isotope
-------------------------------------------------- */

	function initIsotope () {
		var initial_items = 8;
		var next_items = 5;
		// init Isotope
		var $isotopeContainer = $('.isotopeContainer').isotope({
		  itemSelector: '.isotopeSelector',
		  layoutMode: 'masonry'
		});
		// filter functions
		var filterFns = {};

		// bind filter button click
		$('.isotopeFilters').on( 'click', 'button', function() {
		  var filterValue = $( this ).attr('data-filter');
		  // use filterFn if matches value
		  filterValue = filterFns[ filterValue ] || filterValue;
		  $isotopeContainer.isotope({ filter: filterValue });
		  updateFilterCounts();
		});
		function updateFilterCounts() {
			// get filtered item elements
			var itemElems = $isotopeContainer.isotope('getFilteredItemElements');
			var count_items = $(itemElems).length;
			if (count_items > initial_items) {
				$('#isotopeShowMore').show();
			}
			else {
				$('#isotopeShowMore').hide();
			}
			if ($('.isotopeSelector').hasClass('visible-xs')) {
				$('.isotopeSelector').removeClass('visible-xs');
			}
			var index = 0;

			$(itemElems).each(function () {
				if (index >= initial_items) {
					$(this).addClass('visible-xs');
				}
				index++;
			});
			$isotopeContainer.isotope('layout');
		}
		
		
		// change active class on buttons
		$('.filter-container').each( function( i, filterContainer ) {
		  var $filterContainer = $( filterContainer );
		  $filterContainer.on( 'click', 'button', function() {
			$filterContainer.find('.active').removeClass('active');
			$( this ).addClass('active');
		  });
		});
		
		// function load more item
		function showNextItems(pagination) {
			var itemsMax = $('.visible-xs').length;
			var itemsCount = 0;
			$('.visible-xs').each(function () {
				if (itemsCount < pagination) {
					$(this).removeClass('visible-xs');
					itemsCount++;
				}
			});
			if (itemsCount >= itemsMax) {
				$('#isotopeShowMore').hide();
			}
			$isotopeContainer.isotope('layout');
		}
		// function that hides items when page is loaded
		function hideItems(pagination) {
			var itemsMax = $('.isotopeSelector').length;
			var itemsCount = 0;
			$('.isotopeSelector').each(function () {
				if (itemsCount >= pagination) {
					$(this).addClass('visible-xs');
				}
				itemsCount++;
			});
			if (itemsCount < itemsMax || initial_items >= itemsMax) {
				$('#isotopeShowMore').hide();
			}
			$isotopeContainer.isotope('layout');
		}
		$('#isotopeShowMore').on('click', function (e) {
			e.preventDefault();
			showNextItems(next_items);
		});
		hideItems(initial_items);
	}
