void function() {
	var lastTime = 0;
	var vendors = [ 'ms', 'moz', 'webkit', 'o' ];
	for ( var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x ) {
		window.requestAnimationFrame = window[ vendors[ x ] + 'RequestAnimationFrame' ];
		window.cancelAnimationFrame = window[ vendors[ x ] + 'CancelAnimationFrame' ]
			|| window[ vendors[ x ] + 'CancelRequestAnimationFrame' ];
	}

	if ( !window.requestAnimationFrame )
		window.requestAnimationFrame = function( callback, element ) {
			var currTime = new Date().getTime();
			var timeToCall = Math.max( 0, 16 - (currTime - lastTime) );
			var id = window.setTimeout( function() {
					callback( currTime + timeToCall );
				},
				timeToCall );
			lastTime = currTime + timeToCall;
			return id;
		};

	if ( !window.cancelAnimationFrame )
		window.cancelAnimationFrame = function( id ) {
			clearTimeout( id );
		};
}();

void function( exports, $, _, Backbone ) {

	_.mixin( {
		joinPath: function() {
			return _( arguments ).join( '/' ).replace(/([^:])\/+/g,'$1\/');
		},
		deepExtend: function deepExtend( obj ) {
			return $.extend.apply( $, _( arguments ).splice( 0, 0, true ) );
		}
	} );

	_.templateSettings = {
		evaluate: /\{\{([\s\S]+?)\}\}/g,
		interpolate: /\{\{#([\s\S]+?)\}\}/g
	};

	Backbone.$ = $;

	var Model = Backbone.Model;
	var Collection = Backbone.Collection;

	//exports.log = console.log.bind( console );
	exports.log = _.noop;

	Backbone.Model = Model.extend( {
		constructor: function() {
			Model.apply( this, arguments );
			this.on( 'change', function() {
				this.parent && this.parent.trigger.apply( this.parent, _( arguments ).splice( 0, 0, 'change' ) );
			} );
		}
	} );
	Backbone.Collection = Collection.extend( {
		constructor: function() {
			Collection.apply( this, arguments );
		}
	} );

	var BackboneGet = Backbone.Model.prototype.get;
	var BackboneSet = Backbone.Model.prototype.set;
	var arrayRegex = /^([a-zA-Z0-9_$]*)\[(\w)\]$/;

	_( Backbone.Model.prototype ).extend( {
		get: function( key ) {
			if ( key.indexOf( '.' ) > -1 || key.indexOf( '[' ) > -1 ) {
				var result = this;
				var keys = key.split( '.' );
				while ( keys.length ) {
					var currentKey = keys.shift(), arrayIndex = null;
					//if key is string[number]
					if ( currentKey.match( arrayRegex ) ) {
						var matchKey = currentKey.match( arrayRegex );
						currentKey = matchKey[ 1 ];
						arrayIndex = matchKey[ 2 ];
					}
					if ( !result )
						return result;
					result = result.get( currentKey );
					if ( arrayIndex != null ) {
						result = lastModel = lastModel.at( arrayIndex );
					}
				}
				return result;
			}
			else return BackboneGet.apply( this, arguments );
		},
		set: function( key, value ) {
			if ( typeof key == 'string' && key.indexOf( '.' ) > -1 ) {
				var keys = key.split( '.' ),
					obj = result = {};
				while ( keys.length ) {
					var k = keys.shift();
					keys.length ? obj = obj[ k ] = {} : obj[ k ] = value;
				}
				return this.set( result );
			}
			else
				return BackboneSet.apply( this, arguments )
		}
	} );

	_( Backbone.Collection.prototype ).extend( {
		comparator: function( model ) {
			return model.get( 'index' );
		}
	} );

	var BackboneView = Backbone.OriginalView = Backbone.View;

	Backbone.View = BackboneView.extend( {
		constructor: function() {
			this.subViews = [];
			BackboneView.apply( this, arguments );
			!this.el.parentNode || this.ready();
		}
	} );

	_( Backbone.View.prototype ).extend( {
		/*
		 * Called once when dom is mounted
		 * */
		ready: function() {
			return this;
		},
		freeze: function() {
			this._frozen = true;
			this.trigger( 'freeze' );
			return this;
		},
		unfreeze: function() {
			this._frozen = false;
			this.trigger( 'unfreeze' );
			return this;
		},
		preventDefault: function( e ) {
			e.preventDefault();
			return false;
		},
		defer: function( fn, context ) {
			_.defer( _.bind( fn, context || this ) );
			return this;
		},
		delay: function( fn, delay, context ) {
			_.delay( _.bind( fn, context || this ), delay );
			return this;
		},
		render: function() {
			this.trigger( 'before:render' );
			this.trigger( 'render' );
			return this;
		},
		hasView: function( view ) {
			return this.subViews && this.subViews.indexOf( view ) > -1;
		},
		attachView: function( view, selector ) {
			view.trigger( 'before:mount' );
			this.hasView( view ) || this.subViews.push( view );
			view.setElement( this.$( selector ) );
			view.superView = this;
			view.trigger( 'mount' );
			view.ready();
			return view;
		},
		appendView: function( view, selector ) {
			view.trigger( 'before:mount' );
			this.hasView( view ) || this.subViews.push( view );
			view.superView = this;
			view.$el.appendTo( selector ? this.$( selector ) : this.el );
			view.trigger( 'mount' );
			view.ready();
			return view;
		},
		prependView: function( view, selector ) {
			view.trigger( 'before:mount' );
			this.hasView( view ) || this.subViews.push( view );
			view.superView = this;
			view.$el.prependTo( selector ? this.$( selector ) : this.el );
			view.trigger( 'mount' );
			view.ready();
			return view;
		},
		remove: _.compose(
			function() {
				this.trigger( 'before:remove' );
				return this;
			},
			Backbone.View.prototype.remove,
			function() {
				this.superView &&
				this.superView.subViews &&
				_( this.superView.subViews ).each( function( subView, index ) {
					if ( subView && subView.cid == this.cid )
						this.superView.subViews.splice( index, 1 );
				}, this );
				this.trigger( 'remove' );
				return this;
			}
		),
		empty: function() {
			if ( this.subViews )
				while ( this.subViews.length )
					this.subViews[ 0 ].remove();
			return this;
		},
		wipe: function() {
			for ( var key in this )
				delete this[ key ];
			return this;
		}
	} );

	Backbone.ItemView = Backbone.View.extend( {
		template: false,
		constructor: function( options ) {
			_( this ).extend( _.pick( options, 'template' ) );
			if ( this.template ) switch ( typeof this.template ) {
				case 'string':
					this.template = _.template( this.template.match( '<' ) ? this.template : ($( this.template ).html() || '') );
					break;
			}
			Backbone.View.apply( this, arguments );
			this.model || (this.model = new Backbone.Model);
			this.$el.attr( 'model-cid', this.model.cid );
			this.listenTo( this.model, 'remove', this.remove );
		},
		initialize: function() {
			this.render();
		},
		render: function( model ) {
			this.trigger( 'before:render', model );
			if ( this.template ) {
				var model = model || this.model;
				var data = model.toJSON ? model.toJSON() : model || {};
				try {
					this.$el.html( this.template( data ) );
				}
				catch ( e ) {
					log( 'render error', model instanceof Backbone.Model, model );
				}
			}
			this.trigger( 'render', model );
			return this;
		}

	} );

	Backbone.CollectionView = Backbone.View.extend( {
		itemView: Backbone.ItemView,
		constructor: function( options ) {
			this.queueItems = [];
			this.addQueueItems = _.debounce( this.addQueueItems );
			this.sort = _.debounce( this.sort );
			Backbone.View.apply( this, arguments );
			this.collection || (this.collection = new Backbone.Collection);
			this.listenTo( this.collection, 'add', this.add );
			this.listenTo( this.collection, 'reset', this.reset );
			this.listenTo( this.collection, 'sort', this.sort );
			this.on( 'mount', this.reset );
		},
		freeze: function() {
			_( this.subViews ).invoke( 'freeze' );
			this.trigger( 'freeze' );
			return this;
		},
		unfreeze: function() {
			_( this.subViews ).invoke( 'unfreeze' );
			this.trigger( 'unfreeze' );
			return this;
		},
		add: function( model ) {
			this.queueItems.push( model );
			this.addQueueItems();
		},
		addQueueItems: function() {
			log( 'Collection :: add', this.queueItems.length, 'items' );
			while ( this.queueItems.length ) {
				var view = this.appendView( new this.itemView( { model: this.queueItems.shift() } ) );
				this.trigger( 'add', view );
			}
			this.trigger( 'add:multiple' );
		},
		sort: function() {
			this.trigger( 'before:sort' );
			this.collection.each( function( model ) {
				this.$el.children( '*[model-cid=' + model.cid + ']' ).appendTo( this.el );
			}, this );
			this.trigger( 'sort' );
		},
		reset: function() {
			this.empty();
			this.collection.each( this.add, this );
			return this;
		}
	} );

}( this, JSNES_jQuery, JSNES_Underscore, JSNES_Backbone );