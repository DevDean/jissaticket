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

void function( exports ) {

	exports.JSNES_ANIMATIONS = {

		'default': {
			'none': {},
		},
		'bounce': {
			'bounce': {
				'0%': {
					transform: 'scale3d(.3, .3, .3)'
				},
				'20%': {
					transform: 'scale3d(1.1, 1.1, 1.1)'
				},
				'40%': {
					transform: 'scale3d(.9, .9, .9)'
				},
				'60%': {
					transform: 'scale3d(1.03, 1.03, 1.03)'
				},
				'80%': {
					transform: 'scale3d(.97, .97, .97)'
				},
				'100%': {
					transform: 'scale3d(1, 1, 1)'
				}
			},
			'bounce-top': {
				'0%': {
					transform: 'translate3d(0, -3000px, 0)'
				},
				'60%': {
					transform: 'translate3d(0, 25px, 0)'
				},
				'75%': {
					transform: 'translate3d(0, -10px, 0)'
				},
				'90%': {
					transform: 'translate3d(0, 5px, 0)'
				},
				'100%': {
					transform: 'none'
				}
			},
			'bounce-bottom': {
				'0%': {
					transform: 'translate3d(0, 3000px, 0)',
				},
				'60%': {
					transform: 'translate3d(0, -20px, 0)',
				},
				'75%': {
					transform: 'translate3d(0, 10px, 0)',
				},
				'90%': {
					transform: 'translate3d(0, -5px, 0)',
				},
				'100%': {
					transform: 'translate3d(0, 0, 0)',
				},
			},
			'bounce-down': {
				'0%': {
					transform: 'translate3d(0, -3000px, 0)'
				},
				'60%': {
					transform: 'translate3d(0, 25px, 0)'
				},
				'75%': {
					transform: 'translate3d(0, -10px, 0)'
				},
				'90%': {
					transform: 'translate3d(0, 5px, 0)'
				},
				'100%': {
					transform: 'none'
				}
			},
			'bounce-up': {
				'0%': {
					transform: 'translate3d(0, 3000px, 0)',
				},
				'60%': {
					transform: 'translate3d(0, -20px, 0)',
				},
				'75%': {
					transform: 'translate3d(0, 10px, 0)',
				},
				'90%': {
					transform: 'translate3d(0, -5px, 0)',
				},
				'100%': {
					transform: 'translate3d(0, 0, 0)',
				},
			},
			'bounce-left': {
				'0%': {
					transform: 'translate3d(-3000px, 0, 0)',
				},
				'60%': {
					transform: 'translate3d(25px, 0, 0)',
				},
				'75%': {
					transform: 'translate3d(-10px, 0, 0)',
				},
				'90%': {
					transform: 'translate3d(5px, 0, 0)',
				},
				'100%': {
					transform: 'none',
				},
			},
			'bounce-right': {
				'0%': {
					transform: 'translate3d(3000px, 0, 0)',
				},
				'60%': {
					transform: 'translate3d(-25px, 0, 0)',
				},
				'75%': {
					transform: 'translate3d(10px, 0, 0)',
				},
				'90%': {
					transform: 'translate3d(-5px, 0, 0)',
				},
				'100%': {
					transform: 'none',
				},
			},
		},
		'slide': {
			'slide-left': {
				'0%': { transform: 'translateX(-100px)' },
				'100%': { transform: 'translateX(0)' }
			},
			'slide-left-big': {
				'0%': { transform: 'translateX(-2000px)' },
				'100%': { transform: 'translateX(0)' }
			},
			'slide-left-small': {
				'0%': { transform: 'translateX(-50px)' },
				'100%': { transform: 'translateX(0)' }
			},

			'slide-right': {
				'0%': { transform: 'translateX(100px)' },
				'100%': { transform: 'translateX(0)' }
			},
			'slide-right-big': {
				'0%': { transform: 'translateX(2000px)' },
				'100%': { transform: 'translateX(0)' }
			},
			'slide-right-small': {
				'0%': { transform: 'translateX(50px)' },
				'100%': { transform: 'translateX(0)' }
			},

			'slide-top': {
				'0%': { transform: 'translateY(-100px)' },
				'100%': { transform: 'translateY(0)' }
			},
			'slide-top-big': {
				'0%': { transform: 'translateY(-2000px)' },
				'100%': { transform: 'translateY(0)' }
			},
			'slide-top-small': {
				'0%': { transform: 'translateY(-50px)' },
				'100%': { transform: 'translateY(0)' }
			},

			'slide-bottom': {
				'0%': { transform: 'translateY(100px)' },
				'100%': { transform: 'translateY(0)' }
			},
			'slide-bottom-big': {
				'0%': { transform: 'translateY(2000px)' },
				'100%': { transform: 'translateY(0)' }
			},
			'slide-bottom-small': {
				'0%': { transform: 'translateY(50px)' },
				'100%': { transform: 'translateY(0)' }
			},
		},
		'flip': {
			'flip-left': {
				'0%': { transform: 'rotateY(-90deg)' },
				'100%': { transform: 'rotateY(0)' }
			},
			'flip-right': {
				'0%': { transform: 'rotateY(90deg)' },
				'100%': { transform: 'rotateY(0)' }
			},
			'flip-top': {
				'0%': { transform: 'rotateX(90deg)' },
				'100%': { transform: 'rotateX(0)' }
			},
			'flip-bottom': {
				'0%': { transform: 'rotateX(-90deg)' },
				'100%': { transform: 'rotateX(0)' }
			},
		},
		'rotate': {
			'rotate-left-180': {
				'0%': { transform: 'rotate(180deg)' },
				'100%': { transform: 'rotate(0)' }
			},
			'rotate-left-90': {
				'0%': { transform: 'rotate(90deg)' },
				'100%': { transform: 'rotate(0)' }
			},
			'rotate-left-45': {
				'0%': { transform: 'rotate(45deg)' },
				'100%': { transform: 'rotate(0)' }
			},
			'rotate-left-30': {
				'0%': { transform: 'rotate(30deg)' },
				'100%': { transform: 'rotate(0)' }
			},
			'rotate-right-180': {
				'0%': { transform: 'rotate(-180deg)' },
				'100%': { transform: 'rotate(0)' }
			},
			'rotate-right-90': {
				'0%': { transform: 'rotate(-90deg)' },
				'100%': { transform: 'rotate(0)' }
			},
			'rotate-right-45': {
				'0%': { transform: 'rotate(-45deg)' },
				'100%': { transform: 'rotate(0)' }
			},
			'rotate-right-30': {
				'0%': { transform: 'rotate(-30deg)' },
				'100%': { transform: 'rotate(0)' }
			},
		},
		'scale': {
			'scale-up': {
				'0%': { transform: 'scale(0)' },
				'100%': { transform: 'scale(1)' }
			},
			'scale-up-X': {
				'0%': { transform: 'scaleX(0)' },
				'100%': { transform: 'scaleX(1)' }
			},
			'scale-up-Y': {
				'0%': { transform: 'scaleY(0)' },
				'100%': { transform: 'scaleY(1)' }
			},
			'scale-down': {
				'0%': { transform: 'scale(2)' },
				'100%': { transform: 'scale(1)' }
			},
			'scale-down-X': {
				'0%': { transform: 'scaleX(2)' },
				'100%': { transform: 'scaleX(1)' }
			},
			'scale-down-Y': {
				'0%': { transform: 'scaleY(2)' },
				'100%': { transform: 'scaleY(1)' }
			},
		},
		'custom': {

		}
	}

	exports.JSNES_TRANSITIONS = {
		"Fade": {
			"fade": {
				in: {
					"0%": {
						'opacity': 0,
						'z-index': 2,
					},
					"100%": {
						'opacity': 1,
						'z-index': 2,
					}
				},
				out: {
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
				in: {
					"0%": {
						'opacity': 0,
						'transform': 'translateY(-50%)'
					},
					"100%": {
						'opacity': 1,
						'transform': 'translateY(0%)'
					}
				},
				out: {}
			},
			"fade-in-bottom": {
				container: {
					overflow: 'hidden',
				},
				in: {
					"0%": {
						'opacity': 0,
						'transform': 'translateY(50%)'
					},
					"100%": {
						'opacity': 1,
						'transform': 'translateY(0%)'
					}
				},
				out: {}
			},
			"fade-in-left": {
				container: {
					overflow: 'hidden',
				},
				in: {
					"0%": {
						'opacity': 0,
						'transform': 'translateX(-50%)'
					},
					"100%": {
						'opacity': 1,
						'transform': 'translateX(0%)'
					}
				},
				out: {}
			},
			"fade-in-right": {
				in: {
					"0%": {
						'opacity': 0,
						'transform': 'translateX(50%)'
					},
					"100%": {
						'opacity': 1,
						'transform': 'translateX(0%)'
					}
				},
				out: {}
			},
			"fade-in-behind": {
				in: {
					"0%": {
						'opacity': 0,
						'transform': 'scale(0.8)'
					},
					"100%": {
						'opacity': 1,
						'transform': 'scale(1)'
					}
				},
				out: {
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
				in: {
					"0%": {
						'opacity': 0,
						'z-index': 2,
						'transform': 'scale(1.5)'
					},
					"100%": {
						'opacity': 1,
						'transform': 'scale(1)'
					}
				},
				out: {
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
				in: {
					"0%": {
						'transform': 'translateX(100%)'
					},
					"100%": {
						'transform': 'translateX(0%)'
					}
				},
				out: {
					"0%": {
						'transform': 'translateX(0%)'
					},
					"100%": {
						'transform': 'translateX(-100%)'
					}
				}
			},
			"slide-right": {
				in: {
					"0%": {
						'transform': 'translateX(-100%)'
					},
					"100%": {
						'transform': 'translateX(0%)'
					}
				},
				out: {
					"0%": {
						'transform': 'translateX(0%)'
					},
					"100%": {
						'transform': 'translateX(100%)'
					}
				}
			},
			"slide-top": {
				in: {
					"0%": {
						'transform': 'translateY(-100%)'
					},
					"100%": {
						'transform': 'translateY(0%)'
					}
				},
				out: {
					"0%": {
						'transform': 'translateY(0%)'
					},
					"100%": {
						'transform': 'translateY(100%)'
					}
				}
			},
			"slide-bottom": {
				in: {
					"0%": {
						'transform': 'translateY(100%)'
					},
					"100%": {
						'transform': 'translateY(0%)'
					}
				},
				out: {
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
				in: {
					"0%": {
						'z-index': 2,
						'transform': 'translateX(-100%)'
					},
					"100%": {
						'transform': 'translateX(0%)'
					}
				},
				out: {
					"0%": {
						'z-index': 1,
					}
				}
			},
			"move-in-right": {
				container: {
					overflow: 'hidden',
				},
				in: {
					"0%": {
						'z-index': 2,
						'transform': 'translateX(100%)'
					},
					"100%": {
						'transform': 'translateX(0%)'
					}
				},
				out: {
					"0%": {
						'z-index': 1,
					}
				}
			},
			"move-in-top": {
				container: {
					overflow: 'hidden',
				},
				in: {
					"0%": {
						'z-index': 2,
						'transform': 'translateY(-100%)'
					},
					"100%": {
						'transform': 'translateY(0%)'
					}
				},
				out: {
					"0%": {
						'z-index': 1,
					}
				}
			},
			"move-in-bottom": {
				container: {
					overflow: 'hidden',
				},
				in: {
					"0%": {
						'z-index': 2,
						'transform': 'translateY(100%)'
					},
					"100%": {
						'transform': 'translateY(0%)'
					}
				},
				out: {
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
				in: {
					"0%": {
						'transform': "translateX(100%)"
					},
					"100%": {
						'transform': "translateX(0)"
					}
				},
				out: {
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
				in: {
					"0%": {
						'transform': "translateX(-100%)"
					},
					"100%": {
						'transform': "translateX(0)"
					}
				},
				out: {
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
				in: {
					"0%": {
						'transform': "translateY(100%)"
					},
					"100%": {
						'transform': "translateY(0)"
					}
				},
				out: {
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
				in: {
					"0%": {
						'transform': "translateY(-100%)"
					},
					"100%": {
						'transform': "translateY(0)"
					}
				},
				out: {
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
				in: {
					'0%': { 'z-index': 1 },
					'100%': { 'z-index': 1 },
				},
				out: {
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
				in: {
					'0%': { 'z-index': 1 },
					'100%': { 'z-index': 1 },
				},
				out: {
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
				in: {
					'0%': { 'z-index': 1 },
					'100%': { 'z-index': 1 },
				},
				out: {
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
				in: {
					'0%': { 'z-index': 1 },
					'100%': { 'z-index': 1 },
				},
				out: {
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

} ( this );