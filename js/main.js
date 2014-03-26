$(function() {

	// Inject our publications
	$.each(publications, function(index, pub) {
		var div = $('<div/>').addClass('item publication expandable');
		$('<div/>').attr('id', 'expand').html('xx yy').appendTo(div);
		var labels = $('<div/>').attr('id', 'labels');
		if (pub.isPaper) {
			labels.append('<img src="img/paper.svg" width="28" title="Paper">');
		}
		if (pub.isConference) {
			labels.append('<img src="img/conference.svg" width="28" title="Conference Presentation">');
		}
		div.append(labels);
		$('<h3/>').text(pub.year).appendTo(div);
		$('<p/>').addClass('desc').text(pub.title).appendTo(div);
		var content = $('<div/>').attr('id', 'content');
		$('<strong/>').text(pub.authors.join(', ')).append(' ').appendTo(content);
		$('<i/>').text(pub.source).appendTo(content);
		if ('meta' in pub) {
			content.append(', ').append(pub.meta);
		}
		content.append('.<br>');
		if ('doi' in pub) {
			content.append('doi=<a href="' + pub.doi + '">' + pub.doi.replace('http://dx.doi.org/', '') + '</a>').append('<br>');
		}
		if (pub.isConference) {
			content.append(pub.conference);
		}
		div.append(content).appendTo($('.isotope'));
	});

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