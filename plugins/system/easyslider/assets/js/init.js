JSNES_jQuery( function( $ ) {
	if (!$.fn.tooltip)
		$.fn.tooltip = function() {}
	$( window ).load( function() {
		$( '.jsn-es-slider' ).JSNEasySlider();
	} );
	var a = 0;
	$(window).on('deviceorientation', function(e) {
		//a++ > 10 || console.log(e);
		//var alpha = e.originalEvent.alpha;
		//var beta = e.originalEvent.beta;
		//var gamma = e.originalEvent.gamma;
		//$('.jsn-es-item .item-container').css({
		//	transform: 'rotateY('+ gamma +'deg) rotateX('+ beta +'deg) rotateZ('+ alpha +'deg)'
		//})
	})
} );