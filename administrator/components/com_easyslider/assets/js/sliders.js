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

(function ( $ ) {

	$.JSNESSliders = function(options) {
		this.options  			= $.extend({}, options);
		this.initialize = function ()
		{
			var self = this;
			$('#slider_id').change(
				function(event)
				{
					event.preventDefault();
					var sliderID = parseInt($('option:selected', $('#slider_id')).val());
					if (sliderID)
					{
						$('#jsn-link-edit-slider').removeClass("disabled").attr({href: 'index.php?option=com_easyslider&view=slider&layout=edit&slider_id=' + sliderID, target: '_blank'});
						$('#btn_insert_button').prop('disabled', false);
					}
					else
					{
						$('#jsn-link-edit-slider').addClass("disabled").attr({href: 'javascript:void(0)'}).removeAttr('target');
						$('#btn_insert_button').prop('disabled', true);
					}
				}
			);
		};
	};

	$(window).load(function () {

		var convertedSliders = {};

		_.each(window.JSNES_SlidersData, function ( olddata, key ) {
			var data;
			try {
				data = JSON.parse(olddata);
			}
			catch ( e ) {
				data = {};
			}
			var converted = JSNES_SliderData.validate(data);
			if ( JSON.stringify(converted) !== olddata ) {
				convertedSliders[ key ] = (new JSNES_SliderData(converted)).toJSON();
			}
		});

		if ( _.keys(convertedSliders).length ) {
			var item = {};
			var dataForm = [];
			item.name = 'converted_data';
			item.value = JSON.stringify(convertedSliders);
			dataForm.push(item);
			
			$.ajax({
				url: 'index.php?option=com_easyslider&task=sliders.convertSliderData',
				type: 'POST',
				dataType: 'json',
				data: dataForm,
				error: function () {
					console.log('error');
				},
				complete: slidersReady
			});
		}
		else slidersReady();

		function slidersReady() {
			$("#jsn-page-list").removeClass("jsn-easyslider-hide");
		}
	});
})(jQuery);
