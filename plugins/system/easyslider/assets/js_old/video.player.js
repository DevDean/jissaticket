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

void function ( $ ) {

	$.fn.JSNES_VideoItem = function( method ) {
		var args = Array.prototype.slice.call(arguments, 1);
		return this.each(function() {
			var $el = $(this);
			var player = $el.data('jsn-es-player-data');
			if (!player) {

				player = {
					ready: false,
					loop: typeof $el.attr('loop') !== 'undefined' ? 1 : 0,
					autoplay: typeof $el.attr('autoplay') !== 'undefined' ? 1 : 0,
					controls: typeof $el.attr('controls') !== 'undefined' ? 1 : 0
				};
				if ( $el.hasClass('local') ) {
					var video = this;
					if(player.controls) {
						$el.attr('controls', 'controls');
					}
					if(player.loop) {
						$el.attr('loop', 'loop');
					}
					if(player.autoplay) {
						$el.attr('autoplay', 'autoplay');
					}
					video.addEventListener('play', function() {
						$el.trigger('videoplay');
					});
					player.play = function () {
						video.play();
					}
					player.pause = function () {
						video.pause();
					}
					player.seekTo = function ( time ) {
						video.currentTime = time;
					}
					player.ready = true;
				}
				else if ( $el.hasClass('youtube') ) {
					log('Init player youtube');
					if (typeof YT == 'undefined')
						return;

					player.id = $el.attr('data-id');
					player.selectorID = $el.attr('id');
					$('<div>').attr('id', player.selectorID).appendTo($el);
					$el.attr('id','');

					var ytPlayer = new YT.Player(player.selectorID, {
						height: '100%',
						width: '100%',
						videoId: player.id,
						playerVars: {
							origin: location.href,
							showinfo: 0,
							autoplay: player.autoplay,
							autohide: 1,
							controls: player.controls,
							modestbranding: 1,
							iv_load_policy: 3,
							cc_load_policy: 0,
							fs: 1,
							rel: 0
						},
						events: {
							'onReady': function () {
								player.ready = true;
							},
							'onStateChange': function( e ) {
								if (e.data == YT.PlayerState.PLAYING) {
									log('player pause')
									$el.trigger('jsnes:video:play');
								}
							}
						},
					});

					player.play = function () {
						player.ready && ytPlayer.playVideo();
						log('play youtube video');
					}
					player.pause = function () {
						player.ready && ytPlayer.pauseVideo();
						log('pause youtube video');
					}
					player.seekTo = function () {
						player.ready && ytPlayer.seekTo();
						log('seek youtube video');
					}
				}

				$el.data('jsn-es-player-data', player);
			}

			void function executeAction() {
				// If player function is called but the video is still not ready
				// then set timeout to call it again until it
				if (!player.ready) {
					setTimeout(executeAction, 1000);
				}
				else {
					switch (method) {
						case 'play':
							player.play.apply(player, args); break;
						case 'pause':
							player.pause.apply(player, args); break;
						case 'seekTo':
							player.seekTo.apply(player, args); break;
						default:
							break;
					}
				}
			}();
		});
	};

}(typeof JSNES_jQuery !== 'undefined' ? JSNES_jQuery : jQuery);