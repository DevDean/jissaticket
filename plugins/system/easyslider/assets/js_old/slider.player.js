/**
 * @version    $Id$
 * @package    JSN_EasySlider
 * @author     JoomlaShine Team <support@joomlashine.com>
 * @copyright  Copyright (C) 2012 JoomlaShine.com. All Rights Reserved.
 * @license    GNU/GPL v2 or later http://www.gnu.org/licenses/gpl-2.0.html
 *
 * Websites: http://www.joomlashine.com
 * Technical Support:  Feedback - http://www.joomlashine.com/contact-us/get-support.html
 */

jQuery(function ( $ ) {

	players = [];
	var $dom = $('.jsn-es-slider');
	if($dom && $dom.length > 0){
		$dom.each(function(i) {
			var start = $(this).attr('start-from') ? parseInt($(this).attr('start-from')) - 1 : 0;
			if($(this).find('.jsn-es-slide').length > 0 ){
				start = $(this).find('.jsn-es-slide').length > start ? start : 0;
				players[i] = new JSNES_SliderPlayerView({ el: this, startFrom: start, isFrontend: true });
			}
			else {
				$dom.append('<p>Not enough data</p>');
			}
		});
	}
	$.getScript('https://www.youtube.com/iframe_api');
	var checkYoutubeReadyInterval = setInterval(function() {
		if (typeof YT !== 'undefined' && YT.Player) {
			$(window).trigger('youtubeready');
			clearInterval(checkYoutubeReadyInterval);
		}
	}, 1000);
});