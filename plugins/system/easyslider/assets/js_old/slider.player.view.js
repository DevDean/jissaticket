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

	exports.JSNES_SliderPlayerView = Backbone.View.extend({
		events: {
			'click .next': 'next',
			'click .prev': 'prev',
			'click .goto': function (e) {
				if (this.$el.hasClass('transition-active')) {
					return;
				}

				var index = parseInt($(e.currentTarget).attr('target'));
				this.goto(index);
			},
			'click a[href]': function( e ) {
				var href = $(e.currentTarget).attr('href');
				var match = href.match(/(@)(.*)/);
				if (match[1] == '@') {
					e.preventDefault();
					var index = parseInt(match[2]);
					if (index) {
						this.goto(index-1);
					}
				}
			}
		},
		initialize: function (opts) {
			var autoplayVideo = this.$el.attr('autoplay-video');
			this.subViews = [];
			this.current = -1;
			this.$el.children('.jsn-es-slide').each(function (i, el) {
				this.appendView(new JSNES_SliderSlideView({el: el, index: i}));
				this.$('.buttons').append('<button class="goto" target="' + i + '">' + (i+1) + '</button>');
			}.bind(this));
			this.total = this.$el.children('.jsn-es-slide').length;
			this.loop = this.el.hasAttribute('loop');
			this.on('next', this.next);
			this.defer(function () {
				this.scaleSlider();
			});

			this.transitionView = new JSNES_SliderTransitionView();
			this.transitionView.$el.appendTo(this.el)

			var view = this;
			$(window)
				.resize(function () {
					view.scaleSlider();
				})
				.load(function() {
					view.goto(opts.startFrom || 0);
				});
			//load google font
			var fonts = JSON.parse(this.$el.attr('data-fonts'));
			if(fonts){
				$.each(fonts, function (index, font) {
					$('body').append("<link href='//fonts.googleapis.com/css?family=" + font.replace(/\s+/g, '+') + "' rel='stylesheet' data-noprefix type='text/css'>");
				});
			}
		},
		//set width height responsive
		scaleSlider: function () {
			$parent = this.$el.parent();
			var ratio = $parent.width() / this.$('.jsn-es-background').width();
			if (ratio > 1) ratio = 1;
			var height = this.$('.jsn-es-background').height() * ratio;
			var width = this.$('.jsn-es-background').width() * ratio;
			this.$('.jsn-es-background').css({
				'-webkit-transform': 'scale(' + ratio + ')',
				'-moz-transform': 'scale(' + ratio + ')',
				'transform': 'scale(' + ratio + ')',
				'-webkit-transform-origin': 'left top',
				'-moz-transform-origin': 'left top',
				'transform-origin': 'left top'
			});
			if(this.$el.hasClass('jsn-es-full-width')){
				this.$el.css({height: height + 'px'});
				this.$('.jsn-es-slide').css({height: height + 'px'});
			}
			else {
				this.$el.css({height: height + 'px',width: width + 'px'});
				this.$('.jsn-es-slide').css({height: height + 'px',width: width + 'px'});
			}

		},

		prev: function() {
			if (this.$el.hasClass('transition-active'))
				return;
			this.goto(this.current > 0 ? this.current - 1 : this.subViews.length - 1);
			return this;
		},
		next: function () {
			if (this.$el.hasClass('transition-active'))
				return;
			if(this.current + 1 == this.total && !this.loop)
				return;
			this.goto(this.current < this.subViews.length - 1 ? this.current + 1 : 0);
			return this;
		},
		goto: function (index) {

			var self = this;
			if (index == this.current)
				return this;

			self.$el.addClass('loading');

			var toView = this.subViews[index];
			var fromView = this.subViews[this.current];
			self.current = index;

			toView.load(function () {
				self.$el.removeClass('loading');
				fromView && fromView.stopAllVideo();
				toView.$('.youtube.video-player').JSNES_VideoItem();
				toView.$('[autoplay].youtube.video-player').JSNES_VideoItem('play');
				toView.start( fromView );
			});

			self.$('.buttons-container button:eq(' + index + ')')
				.addClass('active')
				.siblings()
				.removeClass('active');
		}
	});

} ( this, JSNES_jQuery );