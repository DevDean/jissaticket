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

try {
	if (window.JSNESjQueryBefore && window.JSNESjQueryBefore.fn.jquery) {
		jQuery = JSNESjQueryBefore;
	}
} catch (e) {
	console.log(e);
}
var JSNES_Underscore = _;
var JSNES_Backbone = Backbone.noConflict();