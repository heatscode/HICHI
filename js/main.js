$(function() {

	// Initialize Isotope AFTER images have been loaded
	var $container = $('.isotope').imagesLoaded(function() {
		$container.isotope({
			itemSelector: '.item',
			layoutMode: 'masonry',
			masonry: {
				columnWidth: 72  // Magic number: 64 + 4*4 (64 = width of smallest square, 4 = smallest margin)
			}
		});
	});

	// Handle expandable tiles
	$container.on('click', '.expandable', function() {
		var self = $(this);
		self.toggleClass(self.find('#expand').html());
		self.find('#content').toggle();
		$container.isotope('layout');
	});

	// Filters
	$('ul.menu > li > a').on('click', function(e) {
		var self = $(this);
		e.preventDefault();
		$('ul.menu').find('a.active').removeClass('active');
		self.addClass('active');
		$container.isotope({filter: self.attr('data-filter')});
	});
});