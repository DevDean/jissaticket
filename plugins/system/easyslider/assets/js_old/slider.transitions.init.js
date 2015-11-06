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


	var transitions_list = exports.JSNES_TRANSITIONS_LIST = {};
	var animations = {};

	// Define CSS transitions
	_.each(JSNES_TRANSITIONS, function( transitions ) {
		_.each(transitions, function( transition, name ) {
			_.each(transition, function( keyframes, key ) {
				keyframes.name = [ 'jsn-es-transition-', name, '-', key ].join('');
				$.keyframe.define([ keyframes ]);
				transitions_list[name+'-'+key] = keyframes;
				//log('Define transition ::', keyframes);
			});
		});
	});
	_.each(JSNES_ANIMATIONS, function( animations ) {
		_(animations).each(function( animation, name ) {
			var fadeAnimation = $.extend( true, {
				name: 'jsn-es-anim-fade-' + name,
				'0%': { opacity: 0 },
				'100%': { opacity: 1 }
			}, animation);
			_.isEmpty(animation) || $.keyframe.define([ _.extend( animation, { name: 'jsn-es-anim-' + name }) ]);
			$.keyframe.define([ fadeAnimation ]);
		});
	});

	$.keyframe.define([
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
	]);


} ( this, JSNES_jQuery );