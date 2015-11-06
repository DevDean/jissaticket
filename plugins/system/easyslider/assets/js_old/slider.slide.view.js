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

	exports.JSNES_SliderSlideView = Backbone.View.extend({

		events: {
			'jsnes:video:play .video-player': 'pause',
			//'jsnes:video:pause .video-player': 'resume'
		},
		initialize: function (opts) {
			var self = this;
			opts || (opts = {});
			this.timer = [];
			this.timerOut = [];
			var uri = window.location.pathname;
			this.uriPrefix = uri.substr(0, uri.indexOf('/administrator/'));
			this.uriPrefix = this.uriPrefix.length == 1 ?  '' :  this.uriPrefix;


			this.$el.addClass('hidden');
			$(window).on('youtubeready', function() {
				self.$('.youtube.video-player').JSNES_VideoItem();
				self.$('[autoplay].youtube.video-player').JSNES_VideoItem('play');
			});

			var slide = this;
			this.$tmpContainer = $('<div>');
			this.$('.jsn-es-item').each(function() {
				var $item = $(this);
				$item.data('jsn-es-item-html', $item.html());
				$item.html('');
				slide.getItemBuildEffects( $item );
				slide.getItemStyle( $item );
			});
		},

		initItems: function() {
			var self = this;
			this.$('.jsn-es-item').each(function() {
				var $item = $(this).addClass('hidden');
				var isNew = $item.html() == '' ? true : false;
				var $children = isNew ? '' : $item.find('.item-container').children().appendTo(self.$tmpContainer);
				$item.html( $item.data('jsn-es-item-html') );
				isNew || $item.find('.item-container').empty().append($children);
			});
		},
		resumeItems: function() {
			_(this.timer).invoke('start');
			this.$('.item-container').css('animation-play-state','running');
			return this;
		},
		pauseItems: function () {
			_(this.timer).invoke('pause');
			this.$('.item-container').css('animation-play-state','paused');
			return this;
		},
		activateItems: function (transitionDuration) {

			typeof transitionDuration == 'number' || (transitionDuration = 0);
			var slide = this;
			var transition = this.getTransition();

			slide.$('.jsn-es-item').each(function () {
				var $item = $(this);
				var $itemConrtainer = $item.find('.item-container');
				var build = slide.getItemBuildEffects( $item );
				var style = slide.getItemStyle( $item );

				// Set style for this item
				$item.css(_.pick(style, ['height', 'width', 'top', 'left', 'zIndex']));
				// Set style for content container inside item
				$itemConrtainer.css(_.omit(style, ['height', 'width', 'top', 'left', 'zIndex']));

				_(build).each(function (b, key) {
					// When the build in time equals 0 then show all the items.
					if (key == 'in' && b.start == b.end && b.start == 0) {
						$item.removeClass('hidden');
					}
					// If the build out start == build out end == slide transition delay
					// then the item stay on the slide without hiding
					if (key == 'in' || (key == 'out' && (b.start != b.end || b.end < transition.delay))) {
						slide.delay(function() {
							key == 'in' ?
								$item.addClass('item-animating-in'):
								$item.addClass('item-animating-out');
							$item.removeClass('hidden');
							$itemConrtainer.css('transform-origin', b.origin);
							$itemConrtainer.playKeyframe({
								name: b.effect,
								duration: b.end - b.start + 'ms',
								timingFunction: b.timing,
								direction: key == 'in' ? 'normal' : 'reverse'
							});
						}, b.start + transitionDuration, this);
					}
				});

			});
			return this;
		},

		pause: function() {
			log('pause')
			this.slideEndTimer.pause();
			return this;
		},
		reset: function () {
			this.$('.jsn-es-item')
				.removeClass('item-animating-in')
				.removeClass('item-animating-out');
			_(this.timer).invoke('pause');
			while (this.timer.length)
				this.timer.pop();
			return this;
		},
		load: function( callback ) {
			var slide = this;
			var imageCount = 1;
			this.reset().initItems();

			var bgImageURL = this.$el.attr('es-bg-image');
			if (bgImageURL) {
				imageCount++;
				var bgImage = new Image;
				bgImage.onload = function() {
					slide.$el.css('background-image', 'url('+ bgImageURL +')');
					gotoNextSlide();
				}
				bgImage.src = bgImageURL;
			}

			this.$el.find('img').each(function(){
				if (this.src)
					return;
				var img = this;
				var dataSrc = $(this).attr('data-src');
				this.onload = function() {
					gotoNextSlide();
				};
				img.src =  dataSrc;
				imageCount++;
			});
			//log(imageCount)
			var gotoNextSlide = _.after(imageCount, callback);
			gotoNextSlide();
			return this;
		},
		start: function (fromView) {

			var inDuration = 0;
			var outDelay = this.getTransition().delay;

			if (fromView) {
				var transition = fromView.getTransition();
				inDuration = transition.durationTotal || transition.duration;
			}

			this.$el.removeClass('hidden');
			this.$el.css('z-index',2);
			this.activateItems(inDuration);

			if (fromView) {
				this.superView.transitionView.play( fromView.el, this.el, fromView.getTransition());
				this.$el.addClass('hidden');
				fromView.end();
			}

			this.superView.$el.addClass('transition-active');
			// When transition ends
			this.delay(function () {
				this.superView.$el.removeClass('transition-active');
				this.superView.transitionView.$el.hide().empty();
				this.$el.removeClass('hidden');
			}, inDuration, this);

			// When slide ends
			this.slideEndTimer = this.delay(function () {
				this.superView.trigger('next');
			}, inDuration + outDelay, this);
		},
		end: function () {
			this.pauseItems();
			this.$el.addClass('hidden');
		},
		getTransition: function () {
			var complexTransition = this.$el.attr('es-complex-transition');
			if (complexTransition) {
				var data;
				try {
					if (data = JSON.parse(complexTransition)) {
						data.type = parseInt(data.type);
						data.cubeAxis = parseInt(data.cubeAxis) || data.cubeAxis;
						data.cubeDepth = parseInt(data.cubeDepth) || data.cubeDepth;
						var delayX = Math.abs(data.delayX * ((data.cols || 1) - 1));
						var delayY = Math.abs(data.delayY * ((data.rows || 1) - 1));
						data.durationTotal = (delayX + delayY + data.duration);
						return data;
					}
				}catch(e) {}
			}
			var trans = this.$el.attr('es-transition').split(' ');
			return {
				name: trans[0],
				delay: parseInt(trans[1]),
				duration: parseInt(trans[2])
			};
		},
		getItemBuildEffects: function( $item ) {
			var build = $item.data('jsn-es-item-build');
			if (!build) {
				var buildIn = $item.attr('es-build-in').split('|');
				var buildOut = $item.attr('es-build-out').split('|');
				var build = {
					'in': {
						effect: 'jsn-es-anim-' + buildIn[0],
						start: parseInt(buildIn[1]),
						end: parseInt(buildIn[2]),
						origin: buildIn[3],
						timing: buildIn[4]
					},
					'out': {
						effect: 'jsn-es-anim-' + buildOut[0],
						start: parseInt(buildOut[1]),
						end: parseInt(buildOut[2]),
						origin: buildOut[3],
						timing: buildOut[4]
					}
				};
				$item
					.data('jsn-es-item-build', build)
					.removeAttr('es-build-in')
					.removeAttr('es-build-out');
			}
			return build;
		},
		getItemStyle: function( $item ) {
			var style = $item.data('jsn-es-item-style');
			if (!style) {
				var style = JSON.parse($item.attr('data-style'));
				$item
					.data('jsn-es-item-style', style)
					.removeAttr('data-style');
			}
			return style;
		},
		stopAllVideo: function(){
			this.$('.video-player')
				.JSNES_VideoItem('seekTo', 0)
				.JSNES_VideoItem('pause');
		},
		delay: function (cb, delay, context) {
			var timer = new Timer({
				onend: _.bind(cb, context || this)
			});
			this.timer.push(timer.start(delay / 1000));
			return timer;
		},
	});

} ( this, JSNES_jQuery );