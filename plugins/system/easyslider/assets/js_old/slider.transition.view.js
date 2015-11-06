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

void function( exports, $ ) {

	var transitions_list = JSNES_TRANSITIONS_LIST;

	exports.JSNES_SliderTransitionView = Backbone.View.extend({

		className: 'jsn-es-ts-view',
		defaultOptions: {
			type: 1,  /* 1: basic; 2: complex; 3: cube; */

			// Old effect name for backward support
			effect: 'fade',
			delay: 5000,
			duration: 1000,

			timing: 'ease',

			rows: 1,
			cols: 1,

			delayRandom: false,
			delayY: 50,
			delayX: 50,

			cubeDepth: 'auto',
			cubeAnimation: 'scale-rotate',
			cubeFace: 'left',
			cubeAxis: 'x',
			cubeRotate: 1
		},
		ready: function() {
			this.$el.hide().css('z-index', 100);
		},
		play: function( fromElement, toElement, options, callback ) {
			this.$el.show();

			var options = _({}).extend( this.defaultOptions, options );

			var $el1 = $(fromElement);
			var $el2 = $(toElement);

			var type = parseInt(options.type);

			var rows = options.rows;
			var cols = options.cols;

			if (type==1) {
				rows = 1;
				cols = 1;
			}
			var tilesCount = rows * cols;

			var delayY = options.delayY;
			var delayX = options.delayX;
			var delayRandom = options.delayRandom;

			var duration = options.duration;

			var width = this.$el.width();
			var height = this.$el.height();

			var tileWidth = (width / cols);
			var tileHeight = (height / rows);
			var tileWidthPercent = (100 / cols);
			var tileHeightPercent = (100 / rows);
			var tileDepth = options.cubeDepth;

			var alternateRotation;
			if (options.cubeRotate == 'alternate') {
				options.cubeRotate = 1;
				alternateRotation = true;
			}

			var $wrapper = $('<div>')
				.addClass('jsn-es-ts-wrapper jsn-es-3d');

			//var maxDelay = (Math.abs(delayX * cols) + Math.abs(delayY * rows));
			//duration -= (maxDelay);

			var animationComplete = _.after(tilesCount, function(){
				typeof callback != 'function' || callback();
			});

			_(rows).times(function( row ) {
				_(cols).times(function( col ) {

					// Get tile position based on #col and #row
					var left = tileWidth * col;
					var top = tileHeight * row;
					var leftPercent = tileWidthPercent * col;
					var topPercent = tileHeightPercent * row;

					// Calculate actual delay time for this tile
					if (!delayRandom) {
						var tileDelayX = delayX >= 0 ? (delayX * col) :
						(Math.abs(delayX) * cols) - (Math.abs(delayX) * col);
						var tileDelayY = delayY >= 0 ? (delayY * row) :
						(Math.abs(delayY) * rows) - (Math.abs(delayY) * row);
						var delay = tileDelayX + tileDelayY;
					}
					else {
						var delay = _.random(0, delayX + delayY);
					}

					var $tile = $('<div>').appendTo( $wrapper )
						.addClass('jsn-es-tile')
						.css({
							left: leftPercent + '%',
							top: topPercent + '%',
							width: Math.ceil(tileWidth) + 'px',
							height: Math.ceil(tileHeight) + 'px',
						});

					var $c1 = $el1.clone()
						.css({
							position: 'absolute',
							width: width + 'px',
							left: -left + 'px',
							top: -top + 'px'
						});

					$c1.find('.video-player').remove();

					var $c2 = $el2.clone()
						.css({
							position: 'absolute',
							width: width + 'px',
							left: -left + 'px',
							top: -top + 'px'
						});

					$c2.find('.video-player').remove();


					if (type == 2 || type == 1) {

						var $in = $('<div class="jsn-es-tile-wrapper in">')
							.appendTo($tile)
							.append($c2)
							.css( transitions_list[ options.effect+'-in' ]['0%'] );

						var $out = $('<div class="jsn-es-tile-wrapper out">')
							.appendTo($tile)
							.append($c1)
							.css( transitions_list[ options.effect+'-out' ]['0%'] );

						$tile.addClass('jsn-es-tile-2d');

						$out.playKeyframe({
							name: ['jsn-es-transition-', options.effect, '-out' ].join(''),
							duration: duration + 'ms',
							timingFunction: 'ease',
							delay: delay + 'ms'
						});
						$in.playKeyframe({
							name: ['jsn-es-transition-', options.effect, '-in' ].join(''),
							duration: duration + 'ms',
							timingFunction: 'ease',
							delay: delay + 'ms',
							complete: animationComplete
						});
					}
					if (type == 3) {
						var axis = options.cubeAxis;
						if ( options.cubeFace == 'left' || options.cubeFace == 'right' ) {
							axis = 'y';
							tileDepth = 'width';
						}
						if ( options.cubeFace == 'top' || options.cubeFace == 'bottom' ) {
							axis = 'x';
							tileDepth = 'height';
						}
						if (tileDepth == 'auto' && axis == 'x') {
							tileDepth = 'height';
						}

						switch (tileDepth) {
							case 'auto':
							case 'width':
								tileDepth = tileWidth;
								break;
							case 'height':
								tileDepth = tileHeight;
								break;
						}

						$tile.JSNES_cuboid( tileWidth, tileHeight, tileDepth );

						var $faceFrom = $tile.find('.jsn-es-cuboid-front');
						var $faceTo = $tile.find('.jsn-es-cuboid-' + options.cubeFace);

						$c1.appendTo($faceFrom);
						$c2.appendTo($faceTo);

						var angle;
						var name = options.cubeAnimation;
						var rotation = options.cubeRotate == 'random' ?
							([-1,1][ _.random(0,1) ]) : options.cubeRotate;
						if (alternateRotation)
							rotation = (options.cubeRotate *= -1);
						if (options.cubeFace == 'back' && axis == 'x') {
							$faceTo.css('transform', $faceTo.css('transform') + ' scale(-1)')
						}

						switch (options.cubeFace) {
							case 'left':
								angle = rotation == 1 ? 90 : 270; break;
							case 'right':
								angle = rotation == 1 ? 270 : 90; break;
							case 'top':
								angle = rotation == 1 ? 270 : 90; break;
							case 'bottom':
								angle = rotation == 1 ? 90 : 270; break;
							case 'back':
								angle = 180; break;
						}
						$tile.find('.jsn-es-cuboid').playKeyframe({
							name: name + '-' + axis + '-' + angle + (rotation==1?'':'-o'),
							duration: duration + 'ms',
							timingFunction: 'ease',
							delay: delay + 'ms',
							complete: animationComplete
						});
					}
				});
			});

			// Finally empty DOM and re-insert
			$wrapper
				.appendTo(this.$el.empty());
		}
	});

} ( this, JSNES_jQuery );