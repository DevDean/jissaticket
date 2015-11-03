void function( exports, $, _, Backbone, undefined ) {

	//var log = console.log.bind( console );
	var log = _.noop;
	var youtubeReady = false;
	var TRANSITIONS = exports.JSNES_TRANSITIONS_LIST || {};
	var IE9 = function() {
		return navigator.userAgent.match( /MSIE [9][.][0-9]/ ) ? true : false;
	}();
	var IE8 = function() {
		return navigator.userAgent.match( /MSIE [1-8][.][0-9]/ ) ? true : false;
	}();

	/* --- Slider View --- */
	var JSNEasySlider =
		exports.JSNEasySlider = Backbone.View.extend( {
			events: {

				'touchstart': 'onTouchStart',
				'touchmove': 'onTouchMove',
				'touchend': 'onTouchEnd',
				'touchleave': 'onTouchCancel',
				'touchcancel': 'onTouchCancel',

				'touchstart .next': 'onClickNext',
				'touchstart .prev': 'onClickPrev',
				'touchstart .goto': 'onClickBullets',
				'touchstart a[href]': 'onClickLink',

				'mousedown': 'onMouseDown',
				'mousemove': 'onMouseMove',
				'mouseup': 'onMouseUp',
				'mouseleave': 'onMouseLeave',
				'mouseout': 'onMouseLeave',

				'mousedown .next': 'onClickNext',
				'mousedown .prev': 'onClickPrev',
				'mousedown .goto': 'onClickBullets',
				'mousedown a[href]': 'onClickLink',
			},
			constructor: function JSNEasySlider() {
				this.lazyRender = _.throttle( this.render, 100 );
				this.lazyReveal = _.throttle( this.reveal, 100 );
				Backbone.View.apply( this, arguments );
			},
			initialize: function() {
				log( 'Slider :: initialize' );

				this.slides = [];
				this.transitionView = new JSNEasySlider_TransitionView;

				this.fullHeight = this.$el.data( 'full-height' );
				this.fullWidth = this.$el.data( 'full-width' );

				this.width = this.$el.data( 'width' );
				this.height = this.$el.data( 'height' );

				this.containerWidth = this.$el.data( 'container-width' );
				this.containerHeight = this.$el.data( 'container-height' ) || this.height;

				this.tabletMode = this.$el.data( 'tablet-mode' ) || 'false';
				this.tabletUnder = parseInt( this.$el.data( 'tablet-under' ) );
				this.tabletWidth = this.$el.data( 'tablet-width' );
				this.tabletHeight = this.$el.data( 'tablet-height' );

				this.mobileMode = this.$el.data( 'mobile-mode' ) || 'false';
				this.mobileUnder = parseInt( this.$el.data( 'mobile-under' ) );
				this.mobileWidth = this.$el.data( 'mobile-width' );
				this.mobileHeight = this.$el.data( 'mobile-height' );

				this.maxWidth = this.$el.data( 'max-width' );
				this.maxHeight = this.$el.data( 'max-height' );

				this.minWidth = this.$el.data( 'min-width' );
				this.minHeight = this.$el.data( 'min-height' );

				this.transitionView.$el.appendTo( this.el );

				this.$( '.jsn-es-slide' ).each( _.bind( function( i, el ) {
					this.slides.push( new JSNEasySlider_SlideView( { el: el, slider: this, n: i } ) );
					this.$( '.buttons' ).append( '<button class="goto" target="' + i + '">' + (i + 1) + '</button>' );
				}, this ) );
				this.$progress = this.$('.jsn-es-progress');
				this.$progressBar = this.$('.jsn-es-progress-bar');

				$( window ).resize( _.bind( function() {
					this.render();
				}, this ) );
				_.delay( _.bind( this.start, this ), 100 );
			},

			onMouseDown: function( e ) {
				if (this.$el.is('.transition-active'))
					return;
				e.preventDefault();
				this.pointer = { x: e.pageX, y: e.pageY };
				this.pointerDown = true;
				this.pointerDirection = 'none';
				this.pointerTolerance = 0;
			},
			onMouseMove: function( e ) {
				if (!this.pointerDown)
					return;

				var deltaX = this.pointer.deltaX = e.pageX - this.pointer.x;
				var deltaY = this.pointer.deltaY = e.pageY - this.pointer.y;
				this.pointerTolerance = Math.max( Math.abs(deltaX), Math.abs(deltaY) );

				if (Math.abs(deltaX) > Math.abs(deltaY))
					this.pointerDirection = deltaX > 0 ? 'right' : 'left';
				else if (Math.abs(deltaX) < Math.abs(deltaY))
					this.pointerDirection = deltaY > 0 ? 'up' : 'down';
				else
					this.pointerDirection = 'none';
			},
			onMouseUp: function( e ) {
				if (!this.pointerDown)
					return;
				this.pointerDown = false;
				if (this.pointerTolerance < 100)
					return;
				switch (this.pointerDirection) {
					case 'left':
						this.next(); break;
					case 'right':
						this.prev(); break;
				}
			},
			onMouseCancel: function( e ) {
				this.pointerDown = false;
				this.pointerDirection = 'none';
				this.pointerTolerance = 0;
			},

			onTouchStart: function( e ) {
				if (this.$el.is('.transition-active'))
					return;
				e = e.originalEvent;
				e.stopPropagation();
				this.pointer = { x: e.touches[0].pageX, y: e.touches[0].pageY };
				this.pointerDown = true;
				this.pointerDirection = 'none';
				this.pointerTolerance = 0;
			},
			onTouchMove: function( e ) {
				e = e.originalEvent;
				e.stopPropagation();
				if (!this.pointerDown)
					return;

				var deltaX = this.pointer.deltaX = e.touches[0].pageX - this.pointer.x;
				var deltaY = this.pointer.deltaY = e.touches[0].pageY - this.pointer.y;
				this.pointerTolerance = Math.max( Math.abs(deltaX), Math.abs(deltaY) );

				if (Math.abs(deltaX) > Math.abs(deltaY))
					this.pointerDirection = deltaX > 0 ? 'right' : 'left';
				else if (Math.abs(deltaX) < Math.abs(deltaY))
					this.pointerDirection = deltaY > 0 ? 'up' : 'down';
				else
					this.pointerDirection = 'none';

				switch (this.pointerDirection) {
					case 'left':
					case 'right':
						e.preventDefault();
						break;
				}
			},
			onTouchEnd: function( e ) {
				e = e.originalEvent;
				e.stopPropagation();
				if (!this.pointerDown)
					return;
				this.pointerDown = false;
				if (this.pointerTolerance < 100)
					return;
				switch (this.pointerDirection) {
					case 'left':
						this.next(); break;
					case 'right':
						this.prev(); break;
				}
			},
			onTouchCancel: function( e ) {
				e.stopPropagation();
				this.pointerDown = false;
				this.pointerDirection = 'none';
				this.pointerTolerance = 0;
			},

			onClickNext: function( e ) {
				this.next();
			},
			onClickPrev: function( e ) {
				this.prev();
			},
			onClickBullets: function( e ) {
				if ( this.$el.hasClass( 'transition-active' ) ) {
					return;
				}
				var index = parseInt( $( e.currentTarget ).attr( 'target' ) );
				this.goto( index );
			},
			onClickLink: function( e ) {
				var href = $( e.currentTarget ).attr( 'href' );
				var match = href.match( /(@)(.*)/ );
				if ( match && match[ 1 ] == '@' ) {
					e.preventDefault();
					var index = parseInt( match[ 2 ] );
					if ( index ) {
						this.goto( index - 1 );
					}
				}
			},

			scale: function() {
				_( this.slides ).invoke( 'scale' );
				return this;
			},
			resize: function() {
				log( 'Slider :: resize' );
				!this.fullHeight || (this.height = window.innerHeight);
				_( this.slides ).invoke( 'resize' );
				this.lazyReveal && this.lazyReveal();
				return this;
			},
			reveal: function() {
				log( 'Slider :: reveal' );
				var top = this.$el.offset().top;
				if ( this.fullHeight && top > window.scrollY && top < window.scrollY + window.innerHeight / 2 ) {
					window.scrollTo( 0, parseInt( top ) );
				}
			},
			render: function() {
				log( 'Slider :: render' );
				this.$el
					.width( this.width )
					.height( this.getHeight() )
					.css( {
						minWidth: this.minWidth,
						minHeight: this.minHeight,
						maxWidth: this.maxWidth,
						maxHeight: this.maxHeight,
					} );
				if ( this.fullWidth ) {

					this.$el
						.css( {
							width: '100%',
							marginLeft: '0',
							marginRight: '0',
						} );

					var offsetLeft = this.$el.offset().left;
					var offsetRight = window.innerWidth - (this.$el.offset().left + this.$el.parent().width());

					this.$el
						.css( {
							width: window.innerWidth + 'px',
							marginLeft: -offsetLeft + 'px',
							marginRight: -offsetRight + 'px',
						} );
				}

				this.resize();
				this.scale();

				_( this.slides ).invoke( 'render' );

				return this;
			},

			start: function() {
				this.render();
				this.goto( 0 );
			},
			prev: function() {
				if ( this.$el.hasClass( 'transition-active' ) )
					return;
				this.goto( this.current > 0 ? this.current - 1 : this.slides.length - 1 );
				return this;
			},
			next: function() {
				if ( this.$el.hasClass( 'transition-active' ) )
					return;
				if ( this.current + 1 == this.total && !this.loop )
					return;
				this.goto( this.current < this.slides.length - 1 ? this.current + 1 : 0 );
				return this;
			},
			goto: function( index, reverse ) {
				if ( this.$el.is( '.jsn-es-animation-active' ) )
					return;
				if ( index == this.current || index >= this.slides.length )
					return;

				_( this.slides ).invoke( 'freeze' );

				var toSlide = this.slides[ index ];
				var fromSlide = this.getActiveSlide();
				this.current = index;
				this.$el.addClass( 'loading' );
				this.$progress.addClass('hidden');
				toSlide.load( _.bind( function() {

					this.$el.removeClass( 'loading' );
					toSlide.start( fromSlide, reverse );
					this.$( '.buttons-container button:eq(' + index + ')' )
						.addClass( 'active' )
						.siblings()
						.removeClass( 'active' );
				}, this ) );

				return this;
			},

			resetProgress: function() {
				this.$progressBar.width(0);
				return this;
			},
			updateProgress: function( percent ) {
				this.$progressBar.width( percent+'%' );
			},
			getHeight: function() {
				var width = window.innerWidth;

				if ( this.fullHeight )
					return window.innerHeight;

				else if ( this.height )
					return this.height;

				else {

					if ( this.mobileMode == true && width < this.mobileUnder )
						return this.mobileHeight || this.containerHeight;

					if ( this.tabletMode == true && width < this.tabletUnder )
						return this.tabletHeight || this.containerHeight;

					if ( this.containerHeight )
						return this.containerHeight;
				}
			},
			getActiveSlide: function() {
				return this.slides[ this.current ];
			},
		} );

	/* --- Slide View --- */
	var JSNEasySlider_SlideView =
		exports.JSNEasySlider_SlideView = Backbone.View.extend( {
			events: {
				//'mousedown': 'pauseAnimation',
				//'mouseup': 'resumeAnimation'
			},
			constructor: function JSNEasySlider_SlideView() {
				Backbone.View.apply( this, arguments );
			},
			initialize: function( options ) {

				log( 'Slide :: initialize' );

				this.n = options.n;
				this.slider = options.slider;
				this.items = _( [] );
				this.responsive = 'default';
				this.scaleFactor = 1;
				this.activeVideos = 0;

				this.$container = this.$( '.jsn-es-container' )
				this.$image = this.$el.children( 'img' ).remove();
				this.$video = this.$el.children( 'video' );

				this.backgroundColor = this.$el.data( 'bg-color' ) || 'transparent';
				this.backgroundSize = this.$el.data( 'bg-size' ) || 'cover';
				this.backgroundPosition = this.$el.data( 'bg-position' ) || 'center';
				this.backgroundImage = (this.$image.attr( 'src' ) || this.$image.data( 'src' ) || '').replace(/([^:])\/+/g,'$1\/');

				this.containerWidth = this.slider.containerWidth;
				this.containerHeight = this.slider.containerHeight;

				this.transition = new JSNEasySlider_TransitionData( this.$el.data( 'transition' ) ).toJSON();
				this.animation = new JSNEasySlider_Animation( {
					duration: this.transition.delay,

					render: _.bind( function() {
						this.slider.updateProgress( this.animation.lapsed / this.transition.delay * 100 );
						this.items.invoke( 'renderAnimationFrame', this.animation.lapsed );
					}, this ),

					start: _.bind( function(  ) {
						this.slider.$progress.removeClass('hidden');
						this.slider.updateProgress(0);
					}, this ),

					end: _.bind( function( force ) {
						this.slider.updateProgress(100);
						this.slider.$progress.addClass('hidden');
						if (this.paused) {
							return _.delay(_.bind(this.animation.options.end, this, force), 2000);
						}
						this.items.invoke( 'stop' );
						force || this.slider.next();
					}, this ),
				} );

				this.$el
					.removeAttr('data-transition')
					.removeAttr('data-bg-color')
					.removeAttr('data-bg-size')
					.removeAttr('data-bg-position');

				this.$( '.jsn-es-item' ).each( _.bind( function( i, el ) {
					this.items.push( new JSNEasySlider_ItemVIew( { el: el, slide: this } ) );
				}, this ) );

				this.render();
				this.$el.addClass( 'hidden' );
			},

			scale: function() {

				var outerWidth = this.slider.$el.width();
				var canvasWidth = this.$container.width();

				this.scaleFactor = outerWidth / canvasWidth
				this.scaleFactor <= 1 || (this.scaleFactor = 1);

				this.$container.css( {
					transform: 'translate(-50%,-50%) scale(' + this.scaleFactor + ')',
					transformOrigin: 'center'
				} );

				if ( !this.slider.fullHeight ) {
					// Set the slider height to its default height
					// Then get its height in pixel multiply by the scale factor
					this.slider.$el.height( this.slider.getHeight() );
					this.slider.$el.height( this.slider.$el.height() * this.scaleFactor );
				}

				return this;
			},
			resize: function() {

				log( 'Slide :: resize' );

				var sliderWidth = window.innerWidth;

				if ( this.slider.mobileMode == true && sliderWidth < this.slider.mobileUnder ) {
					this.containerWidth = this.slider.mobileWidth;
					this.containerHeight = this.slider.mobileHeight || this.slider.containerHeight;
					this.responsive = 'mobile';
				}

				else if ( this.slider.tabletMode == true && sliderWidth < this.slider.tabletUnder ) {
					this.containerWidth = this.slider.tabletWidth;
					this.containerHeight = this.slider.tabletHeight || this.slider.containerHeight;
					this.responsive = 'tablet';
				}
				else {
					this.containerWidth = this.slider.containerWidth;
					this.containerHeight = this.slider.containerHeight;
					this.responsive = 'default';
				}

				return this.render();
			},
			render: function() {

				log( 'Slide :: render' );

				this.$el.get( 0 ).style.cssText = null;

				this.$el.css( {
					backgroundColor: this.backgroundColor,
					backgroundSize: this.backgroundSize,
					backgroundPosition: this.backgroundPosition,
					backgroundImage: this.backgroundImage ? 'url(' + this.backgroundImage + ')' : '',
				} );

				this.$container
					.width( this.containerWidth )
					.height( this.containerHeight );

				if ( this.$video.length ) {
					var videoRatio = this.$video.width() / this.$video.height();
					var sliderRatio = this.slider.$el.width() / this.slider.$el.height();
					if ( videoRatio > sliderRatio )
						this.$video.css( {
							height: '100%',
							width: 'auto'
						} );
					else
						this.$video.css( {
							width: '100%',
							height: 'auto'
						} );
				}

				this.items.invoke( 'render' );
				return this;
			},

			load: function( callback ) {
				var imageCount = 1;
				var callback = _.once( callback );

				this.$el.find( 'img[data-src]' ).add( this.$image ).each( function() {
					var dataSrc = this.getAttribute( 'data-src' );
					if ( this.src || !dataSrc )
						return;
					this.removeAttribute( 'data-src' );
					this.onload = function() {
						gotoNextSlide();
					};
					this.onerror = function() {
						gotoNextSlide();
					}
					this.src = dataSrc;
					imageCount++;
				} );
				var gotoNextSlide = _.after( imageCount, _.bind( callback, this ) );
				gotoNextSlide();
				return this;
			},
			start: function( fromSlide ) {
				var toSlide = this;
				var transitionView = this.slider.transitionView;
				var transition, duration = 0;

				toSlide.$el
					.removeClass( 'hidden' )
					.addClass( 'active' );
				toSlide.render();

				toSlide.items.invoke( 'start' );

				if ( fromSlide ) {

					transition = fromSlide.transition;
					duration = transition.durationTotal;

					fromSlide.$el
						.removeClass( 'hidden' )
						.removeClass( 'active' );
					fromSlide.render();
					fromSlide.items.invoke( 'stop' );

					transitionView.play( fromSlide.el, toSlide.el, transition );

					this.slider.$el
						.addClass( 'jsn-es-animation-active' );

					_.delay( _.bind( function() {
						this.slider.$el
							.removeClass( 'jsn-es-animation-active' );

						transitionView.$el.addClass( 'hidden' );
						fromSlide.$el.addClass( 'hidden' );
						toSlide.$el.removeClass( 'hidden' );
						toSlide.render();

						this.animation.end();
						this.animation.start();

					}, this ), duration );
				}
				else {
					this.animation.end();
					this.animation.start();
				}

				return this;
			},
			pause: function() {
				this.paused = true;
				console.log( 'slide paused' );
				return this;
			},
			resume: function() {
				console.log( 'slide try to resume' );
				if (this.$('.jsn-es-video-playing').length)
					return console.log('Can not resume. Other videos still playing');
				this.paused = false;
				console.log( 'slide resumed' );
				return this;
			},
			freeze: function() {
				this.animation.pause();
			},
			unfreeze: function() {
				this.animation.resume();
			}
		} );

	/* --- Item View --- */
	var JSNEasySlider_ItemVIew =
		exports.JSNEasySlider_ItemVIew = Backbone.View.extend( {
			events: {},
			constructor: function JSNEasySlider_ItemVIew() {
				this.__render = _.debounce( _.bind( this.__render, this ), 0, true );
				Backbone.View.apply( this, arguments );
			},
			initialize: function( options ) {

				log( 'Item :: initialize' );

				this.timer = [];
				this.slide = options.slide;
				this.type = this.$el.data( 'type' ) || 'html';
				this.index = this.$el.data( 'index' ) || '1';
				this.className = this.$el.attr( 'class' );

				this.origin = _((this.$el.data( 'origin' ) || '0,0').split( ',' )).map( function( value ) {
					return parseFloat( value )
				} );

				this.style = this.$el.data( 'style' ) || {};
				this.styleT = this.$el.data( 'style-t' ) || {};
				this.styleM = this.$el.data( 'style-m' ) || {};

				this.customClass = this.$el.data( 'classname' );

				this.build = {
					'in': new JSNEasySlider_AnimationData( this.$el.data( 'animation-in' ), 'in' ).toJSON(),
					'out': new JSNEasySlider_AnimationData( this.$el.data( 'animation-out' ), 'out' ).toJSON()
				}

				this.$link = this.$el.children( 'a:not(.video-link)' ).remove();

				var $html = this.$el.html();
				this.$content = ( this.$link.length ? this.$link : $( '<div>' ))
					.addClass( 'item-container' )
					.html( '<div class="content-wrap">' + $html + '</div>' );
				this.$animation = $( '<div class="item-animation">' ).append( this.$content );
				this.$el.empty().append( this.$animation );
				this.$el.addClass( 'hidden' );

				if ( this.type == 'video' ) {
					this.provider = this.$el.data( 'provider' );
					this.autoplay = this.$el.data( 'autoplay' );
					this.controls = this.$el.data( 'controls' );
					this.loop = this.$el.data( 'loop' );
					this.quality = this.$el.data( 'quality' ) || 'default';
					this.volume = this.$el.data( 'volume' ) || 100;

					if (this.provider == 'local' || this.provider == 'external' || this.provider == 'extend') {
						this.video = this.$( 'video' ).get( 0 );
						this.video.volume = this.volume;
						this.video.loop = this.loop;
						this.video.controls = this.controls;
					}
					else if (this.provider == 'vimeo') {
						this.$('iframe.vimeo-player').on('change:status', function(e,status){
							console.log('vimeo video change status: ' + status);
						})
					}
				}

				this.initVimeoPlayer();

				_.defer(_.bind(function() {
					if (youtubeReady)
						this.initYoutubePlayer();
					else
						$( window ).on( 'ready:youtube:api', _.bind( this.initYoutubePlayer, this ) );
				}, this));

				//this.$el
				//	.removeAttr('data-type')
				//	.removeAttr('data-index')
				//	.removeAttr('data-classname')
				//	.removeAttr('data-style')
				//	.removeAttr('data-style-t')
				//	.removeAttr('data-style-m')
				//	.removeAttr('data-animation-in')
				//	.removeAttr('data-animation-out');
				//
				//this.$el
				//	.removeAttr('data-provider')
				//	.removeAttr('data-autoplay')
				//	.removeAttr('data-controls')
				//	.removeAttr('data-quality')
				//	.removeAttr('data-volume');
			},
			getStyle: function() {
				switch ( this.slide.responsive ) {
					case 'default':
						return this.style;
					case 'tablet':
						return _( {} ).extend( this.style, this.styleT );
					case 'mobile':
						return _( {} ).extend( this.style, this.styleM );
				}
			},

			render: function() {
				this.__render();
			},
			__render: function() {
				log( 'Item :: render' );
				var style = this.getStyle();
				this.$el
					.addClass( 'jsn-es-item-' + this.type )
					[ style.height ? 'removeClass' : 'addClass' ]( 'auto-height' )

					.css( _( style ).pick( 'top', 'left', 'visibility', 'zIndex' ) );

				this.$content
					.addClass( 'item-container' )
					.removeAttr( 'style' )
					.css( _( style ).omit( 'top', 'left', 'visibility', 'zIndex' ) );
				//.css( 'transform', 'translate(' + (this.origin[ 0 ] * -100) + '%,' + (this.origin[ 1 ] * -100) + '%)' );

				this.$el
					.css( {
						marginLeft: -(this.origin[ 0 ] * this.$content.outerWidth()) + 'px',
						marginTop: -(this.origin[ 1 ] * this.$content.outerHeight()) + 'px',
					} );
			},

			start: function() {
				this.animState = null;
				this.$el.removeClass( 'hidden' );
				this.renderAnimationFrame( 0 );
			},
			stop: function() {
				if ( this.type == 'video' ) {
					this.stopVideo();
				}
				return this;
			},
			onReadyAction: function() {
				if (this.type == 'video' && this.autoplay) {
					console.log('autoplay video');
					this.playVideo();
				}
			},
			renderAnimationFrame: function( time ) {
				var build = this.build;
				if ( time < build['in'].start ) {
					if (this.animState != 1) {
						this.animState = 1;
						this.$animation
							.JSNES_TransformOrigin( build['in'].transform.origin )
							.JSNES_Transform( build['in'].transform );
					}
				}
				else if ( time >= build['in'].start && time <= build['in'].end ) {
					if (this.animState != 2) {
						this.animState = 2;
					}
					this.$animation
						.JSNES_TransformOrigin( build['in'].transform.origin )
						.JSNES_TransformTween( build['in'].transform, {}, time - build['in'].start, build['in'].end - build['in'].start, build['in'].easing );
				}
				else if ( time > build['in'].end && time < build['out'].start ) {
					if (this.animState != 3) {
						this.animState = 3;
						this.$animation
							.JSNES_Transform( {} );
						this.onReadyAction();
					}
				}
				else if ( build['out'].start == build['out'].end ) {
					this.$animation
						.JSNES_Transform( {} );
				}
				else if ( time >= build['out'].start && time <= build['out'].end ) {
					if (this.animState != 4) {
						this.animState = 4;
					}
					this.$animation
						.JSNES_TransformOrigin( build['out'].transform.origin )
						.JSNES_TransformTween( {}, build['out'].transform, time - build['out'].start, build['out'].end - build['out'].start, build['out'].easing );
				}
				else if ( time > build['out'].end ) {
					if (this.animState != 5) {
						this.animState = 5;
						this.stop();
						this.$animation
							.JSNES_TransformOrigin( build['out'].transform.origin )
							.JSNES_Transform( build['out'].transform );
					}
				}
			},

			initYoutubePlayer: function() {

				if ( this.type != 'video' || this.provider != 'youtube' || this.ytPlayerID )
					return;
				var IDRegex = /(?:youtu\.be\/|youtube\.com(?:\/embed\/|\/v\/|\/watch\?v=|\/user\/\S+|\/ytscreeningroom\?v=|\/sandalsResorts#\w\/\w\/.*\/))([^\/&]{10,12})/;

				this.ytPlayerID = _.uniqueId( 'jsn-es-youtube-player-' );
				this.ytVideoURL = this.$( 'a' )
					.before( $( '<div>' ).attr( 'id', this.ytPlayerID ) )
					.remove()
					.attr( 'href' );
				this.ytVideoID = this.ytVideoURL.match( IDRegex );
				if ( !this.ytVideoID )
					return;
				this.ytVideoID = this.ytVideoID[ 1 ];
				this.ytPlayer = new YT.Player( this.ytPlayerID, {
					videoId: this.ytVideoID,
					width: '100%',
					height: '100%',
					playerVars: {
						controls: this.controls ? 1:0,
						disablekb: 1,
						enablejsapi: 1,
						loop: this.loop ? 1:0,
						autoplay: 0,
						modestbranding: 1,
						cc_load_policy: 0,
						iv_load_policy: 3,
						showinfo: 0,
						rel: 1,
						fs: 0
					},
					events: {
						'onReady': _.bind( function() {

							this.ytPlayer.setVolume( this.volume * 100 );

							if ( this.slide.$el.is( '.active' ) && this.animState == 3 && this.autoplay )
								this.playVideo();

						}, this ),
						'onStateChange': _.bind( function() {

							switch ( this.ytPlayer.getPlayerState() ) {
								case YT.PlayerState.PLAYING:
								case YT.PlayerState.BUFFERING:
									this.$el.addClass('jsn-es-video-playing');
									this.slide.pause();
									break;
								case YT.PlayerState.ENDED:
								case YT.PlayerState.PAUSED:
									this.$el.removeClass('jsn-es-video-playing');
									this.slide.resume();
									break;
							}

						}, this )
					}
				} );

				log( 'Init new youtube player ', this.ytPlayerID, this.ytPlayer );
			},
			initVimeoPlayer: function() {

				if ( this.type != 'video' || this.provider != 'vimeo' || this.vimeoDom )
					return;

				if(this.$('.vimeo-player').length > 0) {
					this.vimeoDom = this.$('.vimeo-player')[0];
					this.vimeoPlayer = new JSNEasySlider_vimeoPlayer({
						dom: this.vimeoDom
					});
				}
			},
			seekVideo: function( time ) {
				switch ( this.provider ) {
					case 'youtube':
						this.ytPlayer &&
						this.ytPlayer.seekTo &&
						this.ytPlayer.seekTo( time );
						break;
					case 'vimeo':
						this.vimeoPlayer &&
						this.vimeoPlayer.seekTo &&
						this.vimeoPlayer.seekTo( time );
						break;
					case 'local':
					case 'external':
					case 'extend':
						this.video && (this.video.currentTime = 0);
						break;
				}
			},
			playVideo: function() {
				log( 'play video' );
				this.slide.pause();
				this.seekVideo( 0 );
				switch ( this.provider ) {
					case 'youtube':
						this.ytPlayer &&
						this.ytPlayer.playVideo &&
						this.ytPlayer.playVideo();
						break;
					case 'vimeo':
						this.vimeoPlayer &&
						this.vimeoPlayer.playVideo &&
						this.vimeoPlayer.playVideo();
						break;
					case 'local':
					case 'external':
					case 'extend':
						this.video && this.video.play();
						break;
				}
			},
			stopVideo: function() {
				switch ( this.provider ) {
					case 'youtube':
						this.ytPlayer &&
						this.ytPlayer.stopVideo &&
						this.ytPlayer.stopVideo();
						break;
					case 'vimeo':
						this.vimeoPlayer &&
						this.vimeoPlayer.stopVideo &&
						this.vimeoPlayer.stopVideo();
						break;
					case 'local':
					case 'external':
					case 'extend':
						this.video && this.video.pause();
						break;
				}
				this.$el.removeClass('jsn-es-video-playing');
				this.slide.resume();
			},

			delay: function( cb, delay, context ) {
				var timer = new Timer( {
					onend: _.bind( cb, context || this )
				} );
				this.timer.push( timer.start( delay / 1000 ) );
				return timer;
			},
		} );

	/* --- Transition View --- */
	var JSNEasySlider_TransitionView =
		exports.JSNEasySlider_TransitionView = Backbone.View.extend( {
			initialize: function() {
				this.$el.addClass( 'jsn-es-ts-view hidden' );
			},
			play: function( fromElement, toElement, transition, callback ) {

				var self = this;

				this.$el.empty().removeClass( 'hidden' );

				var options = transition;

				var $el1 = $( fromElement ).removeClass( 'hidden' );
				var $el2 = $( toElement ).removeClass( 'hidden' );

				var type = parseInt( options.type );

				if ( IE8 || IE9 )
					type = 1;

				var rows = options.rows;
				var cols = options.cols;

				var duration = options.duration;

				if ( type == 1 ) {
					rows = 1;
					cols = 1;
					//$el1
					//	.css( TRANSITIONS[ options.effect + '-in' ][ '0%' ] )
					//	.playKeyframe( {
					//		name: [ 'jsn-es-transition-', options.effect, '-out' ].join( '' ),
					//		duration: duration + 'ms',
					//		timingFunction: 'ease'
					//	} );
					//
					//$el2
					//	.css( TRANSITIONS[ options.effect + '-out' ][ '0%' ] )
					//	.playKeyframe( {
					//		name: [ 'jsn-es-transition-', options.effect, '-in' ].join( '' ),
					//		duration: duration + 'ms',
					//		timingFunction: 'ease'
					//	} );
					//return;
				}

				var tilesCount = rows * cols;

				var delayY = options.delayY;
				var delayX = options.delayX;
				var delayRandom = options.delayRandom;

				var width = this.$el.width();
				var height = this.$el.height();

				var tileWidth = (width / cols);
				var tileHeight = (height / rows);
				var tileDepth = options.cubeDepth;

				var alternateRotation;
				if ( options.cubeRotate == 'alternate' ) {
					options.cubeRotate = 1;
					alternateRotation = true;
				}

				var $wrapper = $( '<div>' )
					.addClass( 'jsn-es-ts-wrapper jsn-es-3d' );

				//var maxDelay = (Math.abs(delayX * cols) + Math.abs(delayY * rows));
				//duration -= (maxDelay);

				var animationComplete = _.after( tilesCount, function() {
					typeof callback != 'function' || callback();
					//$el1.removeClass( 'hidden' );
					$el2.removeClass( 'hidden' );
					self.$el.empty().addClass('hidden');
				} );

				_( rows ).times( function( row ) {
					_( cols ).times( function( col ) {

						// Get tile position based on #col and #row
						var left = tileWidth * col;
						var top = tileHeight * row;
						//var leftPercent = tileWidthPercent * col;
						//var topPercent = tileHeightPercent * row;

						// Calculate actual delay time for this tile
						if ( !delayRandom ) {
							var tileDelayX = delayX >= 0 ? (delayX * col) :
							(Math.abs( delayX ) * cols) - (Math.abs( delayX ) * col);
							var tileDelayY = delayY >= 0 ? (delayY * row) :
							(Math.abs( delayY ) * rows) - (Math.abs( delayY ) * row);
							var delay = tileDelayX + tileDelayY;
						}
						else {
							var delay = _.random( 0, delayX + delayY );
						}

						var $tile = $( '<div>' ).appendTo( $wrapper )
							.addClass( 'jsn-es-tile' )
							.css( {
								left: Math.ceil(left) + 'px',
								top: Math.ceil(top) + 'px',
								width: Math.ceil(tileWidth) + 'px',
								height: Math.ceil(tileHeight) + 'px',
							} );

						var $c1 = $($el1.get(0).outerHTML)
							.css( {
								position: 'absolute',
								width: width + 'px',
								left: -left + 'px',
								top: -top + 'px'
							} );

						var $c2 = $($el2.get(0).outerHTML)
							.css( {
								position: 'absolute',
								width: width + 'px',
								left: -left + 'px',
								top: -top + 'px'
							} );

						$c1.add( $c2 )
							.width( width )
							.height( height )
							.find('video,iframe').remove();

						if ( type == 2 || type == 1 ) {

							var $in = $( '<div class="jsn-es-tile-wrapper in">' )
								.appendTo( $tile )
								.append( $c2 )
								.css( TRANSITIONS[ options.effect + '-in' ][ '0%' ] );

							var $out = $( '<div class="jsn-es-tile-wrapper out">' )
								.appendTo( $tile )
								.append( $c1 )
								.css( TRANSITIONS[ options.effect + '-out' ][ '0%' ] );

							$tile.addClass( 'jsn-es-tile-2d' );

							$out.playKeyframe( {
								name: [ 'jsn-es-transition-', options.effect, '-out' ].join( '' ),
								duration: duration + 'ms',
								timingFunction: 'ease',
								delay: delay + 'ms'
							} );
							$in.playKeyframe( {
								name: [ 'jsn-es-transition-', options.effect, '-in' ].join( '' ),
								duration: duration + 'ms',
								timingFunction: 'ease',
								delay: delay + 'ms',
								complete: animationComplete
							} );
						}
						if ( type == 3 ) {
							var axis = options.cubeAxis;
							if ( options.cubeFace == 'left' || options.cubeFace == 'right' ) {
								axis = 'y';
								tileDepth = 'width';
							}
							if ( options.cubeFace == 'top' || options.cubeFace == 'bottom' ) {
								axis = 'x';
								tileDepth = 'height';
							}
							if ( tileDepth == 'auto' && axis == 'x' ) {
								tileDepth = 'height';
							}

							switch ( tileDepth ) {
								case 'auto':
								case 'width':
									tileDepth = tileWidth;
									break;
								case 'height':
									tileDepth = tileHeight;
									break;
							}

							$tile.JSNES_Cuboid( tileWidth, tileHeight, tileDepth );

							var $faceFrom = $tile.find( '.jsn-es-cuboid-front' );
							var $faceTo = $tile.find( '.jsn-es-cuboid-' + options.cubeFace );

							$c1.appendTo( $faceFrom );
							$c2.appendTo( $faceTo );

							var angle;
							var name = options.cubeAnimation;
							var rotation = options.cubeRotate == 'random' ?
								([ -1, 1 ][ _.random( 0, 1 ) ]) : options.cubeRotate;
							if ( alternateRotation )
								rotation = (options.cubeRotate *= -1);
							if ( options.cubeFace == 'back' && axis == 'x' ) {
								$faceTo.css( 'transform', $faceTo.css( 'transform' ) + ' scale(-1)' )
							}

							switch ( options.cubeFace ) {
								case 'left':
									angle = rotation == 1 ? 90 : 270;
									break;
								case 'right':
									angle = rotation == 1 ? 270 : 90;
									break;
								case 'top':
									angle = rotation == 1 ? 270 : 90;
									break;
								case 'bottom':
									angle = rotation == 1 ? 90 : 270;
									break;
								case 'back':
									angle = 180;
									break;
							}
							$tile.find( '.jsn-es-cuboid' ).playKeyframe( {
								name: name + '-' + axis + '-' + angle + (rotation == 1 ? '' : '-o'),
								duration: duration + 'ms',
								timingFunction: 'ease',
								delay: delay + 'ms',
								complete: animationComplete
							} );
						}
					} );
				} );

				$el1.addClass( 'hidden' );
				$el2.addClass( 'hidden' );

				// Finally empty DOM and re-insert
				$wrapper.appendTo( this.el );
			}
		} );

	/* --- Transition Data --- */
	var JSNEasySlider_TransitionData =
		exports.JSNEasySlider_TransitionData = Backbone.Model.extend( {
			defaults: function() {
				return {
					type: 1, /* 1: basic; 2: complex; 3: cube; */

					// Basic transition params
					effect: 'fade-in-front',
					delay: 5000,
					duration: 1000,
					timing: 'ease',

					// Complex transition params
					rows: 1,
					cols: 1,
					delayRandom: false,
					delayY: 50,
					delayX: 50,

					// Cuboid transition params
					cubeDepth: 'auto',
					cubeAnimation: 'scale-rotate',
					cubeFace: 'left',
					cubeAxis: 'y',
					cubeRotate: 1
				}
			},
			initialize: function() {
				this.attributes.durationTotal = this.attributes.duration;
				if ( this.attributes.type != 1 ) {
					var delayX = Math.abs( this.attributes.delayX * ((this.attributes.cols || 1) - 1) );
					var delayY = Math.abs( this.attributes.delayY * ((this.attributes.rows || 1) - 1) );
					this.attributes.durationTotal = (delayX + delayY + this.attributes.duration);
				}
			}
		} );

	/* --- Animation Data --- */
	var JSNEasySlider_AnimationData =
		exports.JSNEasySlider_AnimationData = Backbone.Model.extend( {
			constructor: function( data, type ) {
				this.type = type || 'in';
				Backbone.Model.apply( this, arguments );
			},
			defaults: function() {
				switch ( this.type ) {
					case 'in':
						return {
							start: 0,
							end: 1000,
							easing: 'linear',
							transform: {}
						}
					case 'out':
						return {
							start: 4000,
							end: 5000,
							easing: 'linear',
							transform: {}
						}
				}
			},
			initialize: function() {
				this.set( 'duration', this.get( 'end' ) - this.get( 'start' ), { silent: true } );
			}
		} );

	var JSNEasySlider_Animation =
		exports.JSNEasySlider_Animation = function( options ) {
			this.started = false;
			this.running = false;
			this.paused = false;
			this.ended = false;

			this.startTime = 0;
			this.pauseTime = 0;

			this.frames = 0;
			this.fps = 0;
			this.fpsCounter = 0;
			this.fpsLastTime = 0;

			this.options = _( options || {} ).defaults( {
				duration: 0,
				render: _.noop,
				start: _.noop,
				pause: _.noop,
				resume: _.noop,
				end: _.noop,
			} );
			_.bindAll( this, '_requestFrame', '_cancelFrame', '_renderFrame', 'start', 'pause', 'resume', 'end' );
		}

	exports.JSNES_Class = function(methods) {
		var vimeoClass = function() {
			this.initialize.apply(this, arguments);
		};

		for (var property in methods) {
			vimeoClass.prototype[property] = methods[property];
		}

		if (!vimeoClass.prototype.initialize) vimeoClass.prototype.initialize = function(){};

		return vimeoClass;
	};

	var JSNEasySlider_vimeoPlayer =
		exports.JSNEasySlider_vimeoPlayer = JSNES_Class({
		initialize: function(options) {
			console.log('init vimeo player');

			this.onMessageReceived = this.onMessageReceived.bind(this);
			if(typeof options.dom !== 'undefined') {
				this.player = options.dom;
				this.playerOrigin  = '*';
				if (window.addEventListener) {
					window.addEventListener('message', this.onMessageReceived, false);
				}
				else {
					window.attachEvent('onmessage', this.onMessageReceived, false);
				}
			}
			if(typeof options.playerVars !== 'undefined') {
				this.playerVars = options.playerVars;
			}
			console.log(this);
		},
		post: function (action, value) {
			var data = {
				method: action
			};
			if (value) {
				data.value = value;
			}
			var message = JSON.stringify(data);
			this.player.contentWindow.postMessage(data, this.playerOrigin);
		},
		onMessageReceived: function (event) {
			// Handle messages from the vimeo player only
			if (!(/^https?:\/\/player.vimeo.com/).test(event.origin)) {
				//return false;
			}

			if (this.playerOrigin === '*') {
				this.playerOrigin = event.origin;
			}

			var data = JSON.parse(event.data);
			switch (data.event) {
				case 'ready':
					this.onReady();
					break;

				case 'playProgress':
					this.onPlayProgress(data.data);
					break;

				case 'pause':
					this.onPause();

					break;

				case 'finish':
					this.onFinish();
					break;
				case 'play':
					this.onPlay();
					break;
			}
		},
		onReady: function () {

			this.post('addEventListener', 'play');
			this.post('addEventListener', 'pause');
			this.post('addEventListener', 'finish');
			this.post('addEventListener', 'playProgress');
		},
		playVideo: function(){
			this.post('play');
		},
		pauseVideo: function(){
			this.post('pause');
		},

		seekTo: function(time){
			this.post('seekTo', time);
		},

		onPlay: function () {
			this.status = 'played';
			this.senStatusToDOM();
		},
		onPause: function () {
			this.status = 'paused';
			this.senStatusToDOM();
		},

		onFinish: function () {
			this.status = 'finished';
			this.senStatusToDOM();
		},

		onPlayProgress: function (data) {
			this.status = 'playing';
			//this.senStatusToDOM();
		},

		senStatusToDOM: function(){
			console.log('senStatusToDOM',this.status);
			$(this.player).data({status: this.status});
			$(this.player).trigger('change:status', this.status);
		}
	});

	_.extend( JSNEasySlider_Animation.prototype, {

		_requestFrame: function() {
			if (this.ended)
				return;
			this.frameID = window.requestAnimationFrame( this._renderFrame );
		},
		_cancelFrame: function() {
			window.cancelAnimationFrame( this.frameID );
		},
		_renderFrame: function() {
			var now = _.now();
			this.frames++;
			this.fpsCounter++;
			this.lapsed = now - this.startTime;
			this.fpsCounter < 10 || this._calcFrameRate();
			this.options.render.call( this, this.lapsed );

			if (this.options.duration && this.options.duration < this.lapsed) {
				this._cancelFrame();
				this.started = false;
				this.running = false;
				this.paused = false;
				this.ended = true;
				this._calcFrameRate();
				this.options.end.call( this );
			}
			else this._requestFrame();
		},
		_calcFrameRate: function() {
			this.fpsAvg = Math.round( this.frames / this.lapsed * 1000 );
			this.fps = Math.round( this.fpsCounter / (_.now() - this.fpsLastTime) * 1000 );
			this.fpsCounter = 0;
			this.fpsLastTime = _.now();
			return this.fps;
		},

		start: function() {
			if ( this.started )
				return false;

			this.frames = 0;
			this.fps = 0;

			this.started = true;
			this.running = true;
			this.ended = false;
			this.startTime = this.fpsLastTime = _.now();
			this.options.start.apply( this );

			this._requestFrame();
		},
		end: function() {
			if ( !this.started || this.ended )
				return false;
			this._cancelFrame();
			this.started = false;
			this.running = false;
			this.paused = false;
			this.ended = true;
			this._calcFrameRate();
			this.options.end.call( this, true );
		},
		pause: function() {
			if ( !this.started || !this.running || this.ended )
				return false;
			this._cancelFrame();
			this.running = false;
			this.paused = true;
			this.pauseTime = _.now();
			this._calcFrameRate();
			this.options.pause.apply( this );
		},
		resume: function() {
			if ( !this.started || !this.paused || this.ended )
				return false;
			this._requestFrame();
			this.fpsLastTime = (this.startTime += _.now() - this.pauseTime);
			this.paused = false;
			this.running = true;
			this.options.resume.apply( this );
		}
	} );

	/* --- jQuery Plugins --- */
	$.fn.JSNEasySlider = function( method ) {
		var args = _( arguments ).slice( 1 );
		return this.each( function() {
			var slider = $( this ).data( 'jsn-easyslider-data' );
			if ( !method || typeof method == 'object' ) {
				if ( !slider ) {
					slider = new JSNEasySlider( _.extend( {}, method, { el: this } ) );
				}
				$( this ).data( 'jsn-easyslider-data', slider );
			}
			else if ( slider && typeof method == 'string' ) {
				slider[ method ].apply( slider, args );
			}
		} );
	};
	$.fn.JSNES_Transform = function( transform ) {
		var transform = validateTransformData( transform );
		var transformValue = stringifyTransformData( transform );
		var styles = _( transform ).omit( 'origin', 'translate', 'rotate', 'scale', 'skew' );

		return this.each( function() {
			$( this ).css( styles );
			!IE8 ?
				$( this ).css( 'transform', transformValue ) :
				$( this ).css( {
					top: transform.translate.y + 'px',
					left: transform.translate.x + 'px'
				} );
		} );
	};
	$.fn.JSNES_TransformTween = function( from, to, time, duration, easing ) {
		return this.JSNES_Transform( calcTransformTween( from, to, time / duration, easing ) );
	};
	$.fn.JSNES_TransformOrigin = function( o ) {
		return this.each( function() {
			var origin = _( o || {} ).defaults( { x: 0.5, y: 0.5 } );
			if ( IE9 )
				var value = (origin.x * 100 + '%') + ' ' + (origin.y * 100 + '%');
			else
				var value = (origin.x * 100 + '%') + ' ' + (origin.y * 100 + '%') + ' 0';
			$( this )
				.css( 'transform-origin', value )
				.css( 'perspective-origin', value );
		} );
	};
	$.fn.JSNES_WrapLetters = function( before, after ) {
		return this.each( function() {
			$( this ).html( $( this ).text().replace( /(<[^>]*>)?([^<]*)(<[^>]*>)?/g, function( string, x, text, y ) {
				return _(!text.trim() ? '' : (x || '') + text.trim().split( '' )).map( function( letter ) {
					return before + letter + after;
				} ).join( '' ) + (y || '');
			} ) );
		} );
	};
	$.fn.JSNES_WrapWords = function( before, after ) {
		return this.each( function() {
			$( this ).html( $( this ).text().replace( /(<[^>]*>)?([^<]*)(<[^>]*>)?/g, function( string, x, text, y ) {
				return _(!text.trim() ? '' : (x || '') + text.trim().split( /\s+/ )).map( function( word ) {
					return before + word + after;
				} ).join( ' ' ) + (y || '');
			} ) );
		} );
	};
	$.fn.JSNES_Cuboid = function( width, height, depth ) {
		return this.each( function() {

			depth || (depth = width);

			var halfWidth = width / 2;
			var halfHeight = height / 2;
			var halfDepth = depth / 2;
			var setback = 0;

			var $cuboid = $( '<div class="jsn-es-cuboid">' ).appendTo( this )
				.css( {
					width: width + 'px',
					height: height + 'px'
				} );
			$( this ).css( {
				transform: 'translateZ(' + (-halfDepth) + 'px)'
			} )

			$( '<div class="jsn-es-cuboid-face jsn-es-cuboid-front">' ).appendTo( $cuboid )
				.css( {
					transform: 'translateZ(' + setback + 'px) translateZ(' + (halfDepth) + 'px)',
					width: width + 'px',
					height: height + 'px'
				} );
			$( '<div class="jsn-es-cuboid-face jsn-es-cuboid-back">' ).appendTo( $cuboid )
				.css( {
					transform: 'translateZ(' + setback + 'px) rotateY(180deg) translateZ(' + (halfDepth) + 'px)',
					width: width + 'px',
					height: height + 'px'
				} );
			$( '<div class="jsn-es-cuboid-face jsn-es-cuboid-left">' ).appendTo( $cuboid )
				.css( {
					transform: 'translateZ(' + setback + 'px) rotateY(-90deg) translateZ(' + (halfWidth) + 'px)',
					marginLeft: -halfDepth + 'px',
					width: depth + 'px',
					height: height + 'px'
				} );
			$( '<div class="jsn-es-cuboid-face jsn-es-cuboid-right">' ).appendTo( $cuboid )
				.css( {
					transform: 'translateZ(' + setback + 'px) rotateY(90deg) translateZ(' + (halfWidth) + 'px)',
					marginLeft: -halfDepth + 'px',
					width: depth + 'px',
					height: height + 'px'
				} );
			$( '<div class="jsn-es-cuboid-face jsn-es-cuboid-top">' ).appendTo( $cuboid )
				.css( {
					transform: 'translateZ(' + setback + 'px) rotateX(90deg) translateZ(' + halfHeight + 'px)',
					marginTop: -halfDepth + 'px',
					width: width + 'px',
					height: depth + 'px'
				} );
			$( '<div class="jsn-es-cuboid-face jsn-es-cuboid-bottom">' ).appendTo( $cuboid )
				.css( {
					transform: 'translateZ(' + setback + 'px) rotateX(-90deg) translateZ(' + halfHeight + 'px)',
					marginTop: -halfDepth + 'px',
					width: width + 'px',
					height: depth + 'px'
				} );
		} );
	};

	/* --- Transform Utilities --- */

	function stringifyTransformData( transform ) {
		var tx = validateTransformData( transform );
		var result = [];
		if ( IE9 ) {
			result.push( 'translate(' + tx.translate.x + 'px, ' + tx.translate.y + 'px)' );
			result.push( 'rotate(' + tx.rotate.z + 'deg)' );
			result.push( 'scale(' + tx.scale.x + ', ' + tx.scale.y + ')' );
			result.push( 'skew(' + tx.skew.x + 'deg, ' + tx.skew.y + 'deg)' );
		}
		else {
			result.push( 'translate3d(' + tx.translate.x + 'px, ' + tx.translate.y + 'px, ' + tx.translate.z + 'px)' );
			result.push( 'rotateX(' + tx.rotate.x + 'deg)' );
			result.push( 'rotateY(' + tx.rotate.y + 'deg)' );
			result.push( 'rotateZ(' + tx.rotate.z + 'deg)' );
			result.push( 'scale3d(' + tx.scale.x + ', ' + tx.scale.y + ', ' + tx.scale.z + ')' );
			result.push( 'skew(' + tx.skew.x + 'deg, ' + tx.skew.y + 'deg)' );
		}
		return result.join( ' ' );
	};
	function validateTransformData( transform ) {
		return deepExtend({},{
			opacity: 1,
			origin: { x: 0.5, y: 0.5, z: 0 },
			translate: { x: 0, y: 0, z: 0 },
			rotate: { x: 0, y: 0, z: 0 },
			scale: { x: 1, y: 1, z: 1 },
			skew: { x: 0, y: 0, z: 0 }
		}, transform )
	};
	function calcTransformTween( a, b, percent, easing ) {
		var t = {};
		a = validateTransformData( a );
		b = validateTransformData( b );

		t.opacity = calcValueTween( a.opacity, b.opacity, percent, 'linear' );

		_( [ 'translate', 'rotate', 'scale', 'skew' ] ).each( function( type ) {
			t[ type ] = {};
			_( [ 'x', 'y', 'z' ] ).each( function( axis ) {
				t[ type ][ axis ] = calcValueTween( a[ type ][ axis ], b[ type ][ axis ], percent, easing );
			} );
		} );
		return t;
	};
	function calcValueTween( a, b, p, fn ) {
		var p = _( JSNES_Easing[ fn ] ).isFunction() ? JSNES_Easing[ fn ]( p ) : p;
		return a + (b - a) * p;
	};

	/* --- Easing Functions --- */

	var JSNES_Easing = exports.JSNES_Easing = {
		linear: function( p ) {
			return p;
		}
	};
	var baseEasings = {};

	_.each( [ "Quad", "Cubic", "Quart", "Quint", "Expo" ], function( name, i ) {
		baseEasings[ name ] = function( p ) {
			return Math.pow( p, i + 2 );
		};
	} );
	_.extend( baseEasings, {
		Sine: function( p ) {
			return 1 - Math.cos( p * Math.PI / 2 );
		},
		Circ: function( p ) {
			return 1 - Math.sqrt( 1 - p * p );
		},
		Elastic: function( p ) {
			return p === 0 || p === 1 ? p :
			-Math.pow( 2, 8 * (p - 1) ) * Math.sin( ( (p - 1) * 80 - 7.5 ) * Math.PI / 15 );
		},
		Back: function( p ) {
			return p * p * ( 3 * p - 2 );
		},
		Bounce: function( p ) {
			var pow2,
				bounce = 4;
			while ( p < ( ( pow2 = Math.pow( 2, --bounce ) ) - 1 ) / 11 ) {
			}
			return 1 / Math.pow( 4, 3 - bounce ) - 7.5625 * Math.pow( ( pow2 * 3 - 2 ) / 22 - p, 2 );
		}
	} );
	_.each( baseEasings, function( easeIn, name ) {
		JSNES_Easing[ "easeIn" + name ] = easeIn;
		JSNES_Easing[ "easeOut" + name ] = function( p ) {
			return 1 - easeIn( 1 - p );
		};
		JSNES_Easing[ "easeInOut" + name ] = function( p ) {
			return p < 0.5 ?
			easeIn( p * 2 ) / 2 :
			1 - easeIn( p * -2 + 2 ) / 2;
		};
	} );

	/* --- Load the required Youtube Player API --- */
	$.getScript( 'https://www.youtube.com/player_api' );
	!function checkYoutubeReady() {
		if ( typeof YT == 'undefined' )
			return setTimeout( checkYoutubeReady, 1000 );
		console.log( 'YOUTUBE API READY' )
		youtubeReady = true;
		$( window ).trigger( 'ready:youtube:api' );
	}();

	function deepExtend(obj) {
		_(arguments).chain().slice(1).each(function(props) {
			_(props).each(function( value, key ) {
				if (_.isObject(value)) {
					if (!_.isObject(obj[key]))
						obj[key] = {};
					return deepExtend(obj[key], value)
				}
				obj[key] = value;
			})
		})
		return obj;
	}

}( this, JSNES_jQuery, JSNES_Underscore, JSNES_Backbone );