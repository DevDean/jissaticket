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

	exports.JSNES_ANIMATIONS = {

		'default': {
			'none': {},
		},
		'bounce': {
			'bounce': {
				easing: 'Elastic',
				scale: { x:0.5, y:0.5 }
			},
			'bounce-top': {
				easing: 'Elastic',
				translate: { y:-200 }
			},
			'bounce-bottom': {
				easing: 'Elastic',
				translate: { y:200 }
			},
			'bounce-left': {
				easing: 'Elastic',
				translate: { x:-200 }
			},
			'bounce-right': {
				easing: 'Elastic',
				translate: { x:200 }
			},
		},
		'slide': {
			'slide-left': {
				easing: 'Quad',
				translate: { x:-100 }
			},
			'slide-left-big': {
				translate: { x:-2000 }
			},
			'slide-left-small': {
				translate: { x:-50 }
			},
			'slide-right': {
				translate: { x:100 }
			},
			'slide-right-big': {
				translate: { x:2000 }
			},
			'slide-right-small': {
				translate: { x:50 }
			},
			'slide-top': {
				translate: { y:-100 }
			},
			'slide-top-big': {
				translate: { y:-2000 }
			},
			'slide-top-small': {
				translate: { y:-50 }
			},
			'slide-bottom': {
				translate: { y:100 }
			},
			'slide-bottom-big': {
				translate: { y:2000 }
			},
			'slide-bottom-small': {
				translate: { y:50 }
			},
		},
		'roll': {
			'roll-left': {
				translate: { x:-400 },
				rotate: { z:-360 },
			},
			'roll-right': {
				translate: { x:400 },
				rotate: { z:360 },
			}
		},
		'skew': {
			'skew-left': {
				easing: 'Back',
				translate: { x:-200 },
				skew: { x:30 }
			},
			'skew-right': {
				easing: 'Back',
				translate: { x:200 },
				skew: { x:-30 }
			}
		},
		'flip': {
			'flip-left': {
				rotate: { y:-90 }
			},
			'flip-right': {
				rotate: { y:90 }
			},
			'flip-top': {
				rotate: { x:90 }
			},
			'flip-bottom': {
				rotate: { x:-90 }
			},
		},
		'rotate': {
			'rotate-left-360': {
				rotate: { z:360 }
			},
			'rotate-left-180': {
				rotate: { z:180 }
			},
			'rotate-left-90': {
				rotate: { z:90 }
			},

			'rotate-right-360': {
				rotate: { z:-360 }
			},
			'rotate-right-180': {
				rotate: { z:-180 }
			},
			'rotate-right-90': {
				rotate: { z:-90 }
			},
		},
		'scale': {
			'scale': {
				scale: { x:0, y:0 }
			},
			'scale-X': {
				scale: { x:0, y:1 }
			},
			'scale-Y': {
				scale: { x:1, y:0 }
			},
		}
	}

	exports.JSNES_TRANSITIONS = {
		"Fade": {
			"fade": {
				"in": {
					"0%": {
						'opacity': 0,
						'z-index': 2,
					},
					"100%": {
						'opacity': 1,
						'z-index': 2,
					}
				},
				"out": {
					"0%": {
						'opacity': 1,
						'z-index': 1,
					},
					"100%": {
						'opacity': 1,
						'z-index': 1,
					}
				}
			},
			"fade-in-top": {
				container: {
					overflow: 'hidden',
				},
				"in": {
					"0%": {
						'opacity': 0,
						'z-index': 2,
						'transform': 'translateY(-50%)'
					},
					"100%": {
						'opacity': 1,
						'transform': 'translateY(0%)'
					}
				},
				"out": {
					"0%": {
						'z-index': 1,
					},
					"100%": {
						'z-index': 1,
					}
				}
			},
			"fade-in-bottom": {
				container: {
					overflow: 'hidden',
				},
				"in": {
					"0%": {
						'opacity': 0,
						'z-index': 2,
						'transform': 'translateY(50%)'
					},
					"100%": {
						'opacity': 1,
						'transform': 'translateY(0%)'
					}
				},
				"out": {
					"0%": {
						'z-index': 1,
					},
					"100%": {
						'z-index': 1,
					}
				}
			},
			"fade-in-left": {
				container: {
					overflow: 'hidden',
				},
				"in": {
					"0%": {
						'opacity': 0,
						'z-index': 2,
						'transform': 'translateX(-50%)'
					},
					"100%": {
						'opacity': 1,
						'transform': 'translateX(0%)'
					}
				},
				"out": {
					"0%": {
						'z-index': 1,
					},
					"100%": {
						'z-index': 1,
					}
				}
			},
			"fade-in-right": {
				"in": {
					"0%": {
						'opacity': 0,
						'z-index': 2,
						'transform': 'translateX(50%)'
					},
					"100%": {
						'opacity': 1,
						'transform': 'translateX(0%)'
					}
				},
				"out": {
					"0%": {
						'z-index': 1,
					},
					"100%": {
						'z-index': 1,
					}
				}
			},
			"fade-in-behind": {
				"in": {
					"0%": {
						'opacity': 0,
						'transform': 'scale(0.8)'
					},
					"30%": {
						'opacity': 0,
						'transform': 'scale(0.8)'
					},
					"100%": {
						'opacity': 1,
						'transform': 'scale(1)'
					}
				},
				"out": {
					"0%": {
						'opacity': 1,
						'transform': 'scale(1)'
					},
					"70%": {
						'opacity': 0,
						'transform': 'scale(1.5)'
					},
					"100%": {
						'opacity': 0,
						'transform': 'scale(1.5)'
					}
				}
			},
			"fade-in-front": {
				"in": {
					"0%": {
						'z-index': 2,
						'opacity': 0,
						'transform': 'scale(1.5)'
					},
					"30%": {
						'opacity': 0,
						'transform': 'scale(1.5)'
					},
					"100%": {
						'opacity': 1,
						'transform': 'scale(1)'
					}
				},
				"out": {
					"0%": {
						'opacity': 1,
						'z-index': 1,
						'transform': 'scale(1)'
					},
					"70%": {
						'opacity': 0,
						'transform': 'scale(0.8)'
					},
					"100%": {
						'opacity': 0,
						'transform': 'scale(0.8)'
					}
				},
			},
		},
		"Slide": {
			"slide-left": {
				"in": {
					"0%": {
						'transform': 'translateX(100%)'
					},
					"100%": {
						'transform': 'translateX(0%)'
					}
				},
				"out": {
					"0%": {
						'transform': 'translateX(0%)'
					},
					"100%": {
						'transform': 'translateX(-100%)'
					}
				}
			},
			"slide-right": {
				"in": {
					"0%": {
						'transform': 'translateX(-100%)'
					},
					"100%": {
						'transform': 'translateX(0%)'
					}
				},
				"out": {
					"0%": {
						'transform': 'translateX(0%)'
					},
					"100%": {
						'transform': 'translateX(100%)'
					}
				}
			},
			"slide-top": {
				"in": {
					"0%": {
						'transform': 'translateY(-100%)'
					},
					"100%": {
						'transform': 'translateY(0%)'
					}
				},
				"out": {
					"0%": {
						'transform': 'translateY(0%)'
					},
					"100%": {
						'transform': 'translateY(100%)'
					}
				}
			},
			"slide-bottom": {
				"in": {
					"0%": {
						'transform': 'translateY(100%)'
					},
					"100%": {
						'transform': 'translateY(0%)'
					}
				},
				"out": {
					"0%": {
						'transform': 'translateY(0%)'
					},
					"100%": {
						'transform': 'translateY(-100%)'
					}
				}
			},
		},
		"Move": {
			"move-in-left": {
				container: {
					overflow: 'hidden',
				},
				"in": {
					"0%": {
						'z-index': 2,
						'transform': 'translateX(-100%)'
					},
					"100%": {
						'transform': 'translateX(0%)'
					}
				},
				"out": {
					"0%": {
						'z-index': 1,
					}
				}
			},
			"move-in-right": {
				container: {
					overflow: 'hidden',
				},
				"in": {
					"0%": {
						'z-index': 2,
						'transform': 'translateX(100%)'
					},
					"100%": {
						'transform': 'translateX(0%)'
					}
				},
				"out": {
					"0%": {
						'z-index': 1,
					}
				}
			},
			"move-in-top": {
				container: {
					overflow: 'hidden',
				},
				"in": {
					"0%": {
						'z-index': 2,
						'transform': 'translateY(-100%)'
					},
					"100%": {
						'transform': 'translateY(0%)'
					}
				},
				"out": {
					"0%": {
						'z-index': 1,
					}
				}
			},
			"move-in-bottom": {
				container: {
					overflow: 'hidden',
				},
				"in": {
					"0%": {
						'z-index': 2,
						'transform': 'translateY(100%)'
					},
					"100%": {
						'transform': 'translateY(0%)'
					}
				},
				"out": {
					"0%": {
						'z-index': 1,
					}
				}
			},
		},
		"Push": {
			"push-left": {
				container: {
					'overflow': 'hidden'
				},
				"in": {
					"0%": {
						'transform': "translateX(100%)"
					},
					"100%": {
						'transform': "translateX(0)"
					}
				},
				"out": {
					"0%": {
						'transform': "translateX(0%)"
					},
					"100%": {
						'transform': "translateX(-100%)"
					}
				}
			},
			"push-right": {
				container: {
					'overflow': 'hidden'
				},
				"in": {
					"0%": {
						'transform': "translateX(-100%)"
					},
					"100%": {
						'transform': "translateX(0)"
					}
				},
				"out": {
					"0%": {
						'transform': "translateX(0%)"
					},
					"100%": {
						'transform': "translateX(100%)"
					}
				}
			},
			"push-down": {
				container: {
					'overflow': 'hidden'
				},
				"in": {
					"0%": {
						'transform': "translateY(100%)"
					},
					"100%": {
						'transform': "translateY(0)"
					}
				},
				"out": {
					"0%": {
						'transform': "translateY(0%)"
					},
					"100%": {
						'transform': "translateY(-100%)"
					}
				}
			},
			"push-up": {
				container: {
					'overflow': 'hidden'
				},
				"in": {
					"0%": {
						'transform': "translateY(-100%)"
					},
					"100%": {
						'transform': "translateY(0)"
					}
				},
				"out": {
					"0%": {
						'transform': "translateY(0%)"
					},
					"100%": {
						'transform': "translateY(100%)"
					}
				}
			},
		},
		"Reveal": {
			"reveal-left": {
				container: {
					overflow: 'hidden',
				},
				"in": {
					'0%': { 'z-index': 1 },
					'100%': { 'z-index': 1 },
				},
				"out": {
					"0%": {
						'z-index': 10,
						'transform': 'translateX(0%)'
					},
					"100%": {
						'z-index': 10,
						'transform': 'translateX(-100%)'
					}
				}
			},
			"reveal-right": {
				container: {
					overflow: 'hidden',
				},
				"in": {
					'0%': { 'z-index': 1 },
					'100%': { 'z-index': 1 },
				},
				"out": {
					"0%": {
						'z-index': 10,
						'transform': 'translateX(0%)'
					},
					"100%": {
						'z-index': 10,
						'transform': 'translateX(100%)'
					}
				}
			},
			"reveal-top": {
				container: {
					overflow: 'hidden',
				},
				"in": {
					'0%': { 'z-index': 1 },
					'100%': { 'z-index': 1 },
				},
				"out": {
					"0%": {
						'z-index': 10,
						'transform': 'translateY(0%)'
					},
					"100%": {
						'z-index': 10,
						'transform': 'translateY(-100%)'
					}
				}
			},
			"reveal-bottom": {
				container: {
					overflow: 'hidden',
				},
				"in": {
					'0%': { 'z-index': 1 },
					'100%': { 'z-index': 1 },
				},
				"out": {
					"0%": {
						'z-index': 10,
						'transform': 'translateY(0%)'
					},
					"100%": {
						'z-index': 10,
						'transform': 'translateY(100%)'
					}
				}
			},
		},
	}

	var transitions_list = exports.JSNES_TRANSITIONS_LIST = {};

	// Define CSS transitions
	_.each( JSNES_TRANSITIONS, function( transitions ) {
		_.each( transitions, function( transition, name ) {
			_.each( transition, function( keyframes, key ) {
				keyframes.name = [ 'jsn-es-transition-', name, '-', key ].join( '' );
				$.keyframe.define( [ keyframes ] );
				transitions_list[ name + '-' + key ] = keyframes;
				//console.log('Define transition ::', keyframes);
			} );
		} );
	} );

	$.keyframe.define( [
		{
			name: 'scale-rotate-y-90',
			"0%": { transform: 'scale(1) rotateY(0deg)' },
			"30%": { transform: "scale(0.9) rotateY(0deg)" },
			"70%": { transform: "scale(0.9) rotateY(90deg)" },
			"100%": { transform: "scale(1) rotateY(90deg)" }
		},
		{
			name: 'scale-rotate-y-180',
			"0%": { transform: 'scale(1) rotateY(0deg)' },
			"30%": { transform: "scale(0.9) rotateY(0deg)" },
			"70%": { transform: "scale(0.9) rotateY(180deg)" },
			"100%": { transform: "scale(1) rotateY(180deg)" }
		},
		{
			name: 'scale-rotate-y-270',
			"0%": { transform: 'scale(1) rotateY(0deg)' },
			"30%": { transform: "scale(0.9) rotateY(0deg)" },
			"70%": { transform: "scale(0.9) rotateY(270deg)" },
			"100%": { transform: "scale(1) rotateY(270deg)" }
		},
		{
			name: 'scale-rotate-y-90-o',
			"0%": { transform: 'scale(1) rotateY(0deg)' },
			"30%": { transform: "scale(0.9) rotateY(0deg)" },
			"70%": { transform: "scale(0.9) rotateY(-90deg)" },
			"100%": { transform: "scale(1) rotateY(-90deg)" }
		},
		{
			name: 'scale-rotate-y-180-o',
			"0%": { transform: 'scale(1) rotateY(0deg)' },
			"30%": { transform: "scale(0.9) rotateY(0deg)" },
			"70%": { transform: "scale(0.9) rotateY(-180deg)" },
			"100%": { transform: "scale(1) rotateY(-180deg)" }
		},
		{
			name: 'scale-rotate-y-270-o',
			"0%": { transform: 'scale(1) rotateY(0deg)' },
			"30%": { transform: "scale(0.9) rotateY(0deg)" },
			"70%": { transform: "scale(0.9) rotateY(-270deg)" },
			"100%": { transform: "scale(1) rotateY(-270deg)" }
		},
		{
			name: 'scale-rotate-x-90',
			"0%": { transform: 'scale(1) rotateX(0deg)' },
			"30%": { transform: "scale(0.9) rotateX(0deg)" },
			"70%": { transform: "scale(0.9) rotateX(90deg)" },
			"100%": { transform: "scale(1) rotateX(90deg)" }
		},
		{
			name: 'scale-rotate-x-180',
			"0%": { transform: 'scale(1) rotateX(0deg)' },
			"30%": { transform: "scale(0.9) rotateX(0deg)" },
			"70%": { transform: "scale(0.9) rotateX(180deg)" },
			"100%": { transform: "scale(1) rotateX(180deg)" }
		},
		{
			name: 'scale-rotate-x-270',
			"0%": { transform: 'scale(1) rotateX(0deg)' },
			"30%": { transform: "scale(0.9) rotateX(0deg)" },
			"70%": { transform: "scale(0.9) rotateX(270deg)" },
			"100%": { transform: "scale(1) rotateX(270deg)" }
		},
		{
			name: 'scale-rotate-x-90-o',
			"0%": { transform: 'scale(1) rotateX(0deg)' },
			"30%": { transform: "scale(0.9) rotateX(0deg)" },
			"70%": { transform: "scale(0.9) rotateX(-90deg)" },
			"100%": { transform: "scale(1) rotateX(-90deg)" }
		},
		{
			name: 'scale-rotate-x-180-o',
			"0%": { transform: 'scale(1) rotateX(0deg)' },
			"30%": { transform: "scale(0.9) rotateX(0deg)" },
			"70%": { transform: "scale(0.9) rotateX(-180deg)" },
			"100%": { transform: "scale(1) rotateX(-180deg)" }
		},
		{
			name: 'scale-rotate-x-270-o',
			"0%": { transform: 'scale(1) rotateX(0deg)' },
			"30%": { transform: "scale(0.9) rotateX(0deg)" },
			"70%": { transform: "scale(0.9) rotateX(-270deg)" },
			"100%": { transform: "scale(1) rotateX(-270deg)" }
		}
	] );

}( this, JSNES_jQuery );