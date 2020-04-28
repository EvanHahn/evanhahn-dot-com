function pokeAll() {
	var pokeLinks = Zepto('a.uiIconText').not(function() {
		return Zepto(this).text() != 'Poke Back';
	});
	pokeLinks.trigger('click');
};

setInterval(pokeAll, 5 * 1000);