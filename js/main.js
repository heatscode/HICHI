$(function() {

	// Initialize Isotope AFTER images have been loaded
	var $container = $('.isotope').imagesLoaded(function() {
		$container.isotope({
			itemSelector: '.item',
			layoutMode: 'masonry',
			masonry: {
				columnWidth: 72  // Magic number: 64 + 4*4 (64 = width of smallest square, 4 = smallest margin)
			},
			getSortData: {
				name: '.title',
				symbol: '.symbol',
				number: '.number parseInt',
				category: '[data-category]',
				weight: function( itemElem ) {
					var weight = $( itemElem ).find('.weight').text();
					return parseFloat( weight.replace( /[\(\)]/g, '') );
				}
			}
		});
	});


	$('#filters select').change(function() {
		$container.isotope({filter: $(this).val()});
	});

	$container.on('click', '.expandable', function() {
		var self = $(this);
		self.toggleClass(self.find('#expand').html());
		self.find('#content').toggle();
		$container.isotope('layout');
	});
});