<?php
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

// No direct access to this file
defined('_JEXEC') or die('Restricted access');

if (empty ($_GET['slider_id'])) {
	//exit;
}
if ($_POST) {
	die();
}
$title = $this->form->getField('slider_title')->value;
//if (empty($title)) $title = 'SLIDER ' . strtoupper($this->objUtils->randSTR(5));
if (empty($title)) $title = 'Untitled Slider';

$this->sliderName = $title;

$doc             	= JFactory::getDocument();
$app 				= JFactory::getApplication();
$templateName 		= $app->getTemplate();
$templateCSSPath 	= JPATH_ROOT . '/administrator/templates/' . $templateName . '/css/template.css';

$tmpl = $app->input->get->get('tmpl');
if (file_exists($templateCSSPath))
{
	if (method_exists($doc, 'addStyleSheetVersion'))
	{
		$doc->addStyleSheetVersion(JURI::root(true) . '/administrator/templates/' . $templateName . '/css/template.css');
	}
	else
	{
		$doc->addStyleSheet(JURI::root(true) . '/administrator/templates/' . $templateName . '/css/template.css');
	}
}

JSNHtmlAsset::addStyle(JSNES_PLG_SYSTEM_ASSETS_URL . 'lib/font-awesome/css/font-awesome.css');
JSNHtmlAsset::addStyle(JSNES_PLG_SYSTEM_ASSETS_URL . 'lib/bootstrap/css/jsn.bootstrap.css');
JSNHtmlAsset::addStyle(JSNES_PLG_SYSTEM_ASSETS_URL . 'lib/select2/select2.min.css');
JSNHtmlAsset::addStyle(JSNES_PLG_SYSTEM_ASSETS_URL . 'css/jsn-es-icons.css');
JSNHtmlAsset::addStyle(JSNES_PLG_SYSTEM_ASSETS_URL . 'css/flex.css');

JSNHtmlAsset::addStyle(JSNES_ASSETS_URL . 'slider/css/theme.dark.css');

JSNHtmlAsset::addStyle(JSNES_ASSETS_URL . 'slider/css/style.base.css');
JSNHtmlAsset::addStyle(JSNES_ASSETS_URL . 'slider/css/style.app.css');
JSNHtmlAsset::addStyle(JSNES_ASSETS_URL . 'slider/css/style.items.css');
JSNHtmlAsset::addStyle(JSNES_ASSETS_URL . 'slider/css/style.inspector.css');
JSNHtmlAsset::addStyle(JSNES_ASSETS_URL . 'slider/css/style.layers.css');
JSNHtmlAsset::addStyle(JSNES_ASSETS_URL . 'slider/css/style.slides.css');
JSNHtmlAsset::addStyle(JSNES_ASSETS_URL . 'slider/css/style.thumbs.css');
JSNHtmlAsset::addStyle(JSNES_ASSETS_URL . 'slider/css/style.toolbar.css');
JSNHtmlAsset::addStyle(JSNES_ASSETS_URL . 'slider/css/style.animation.editor.css');

//3rd party javascript files

JSNHtmlAsset::addScript(JSNES_PLG_SYSTEM_ASSETS_URL . 'js/jsnes_jquery_safe.js');
JSNHtmlAsset::addScript(JSNES_PLG_SYSTEM_ASSETS_URL . 'lib/jquery/jquery.min.js');
JSNHtmlAsset::addScript(JSNES_PLG_SYSTEM_ASSETS_URL . 'lib/underscore/underscore-min.js');
JSNHtmlAsset::addScript(JSNES_PLG_SYSTEM_ASSETS_URL . 'js/jsnes_conflict.js');
JSNHtmlAsset::addScript(JSNES_PLG_SYSTEM_ASSETS_URL . 'lib/backbone/backbone-min.js');

JSNHtmlAsset::addScript(JSNES_PLG_SYSTEM_ASSETS_URL . 'lib/backbone/backbone-nested-models.min.js');
JSNHtmlAsset::addScript(JSNES_PLG_SYSTEM_ASSETS_URL . 'lib/backbone/backbone.undo.js');

JSNHtmlAsset::addScript(JSNES_PLG_SYSTEM_ASSETS_URL . 'lib/jquery-ui/jquery-ui.min.js');
JSNHtmlAsset::addScript(JSNES_PLG_SYSTEM_ASSETS_URL . 'lib/jquery-ui/jquery-ui.touch-punch.js');
JSNHtmlAsset::addScript(JSNES_PLG_SYSTEM_ASSETS_URL . 'lib/jquery-ui/jquery-ui.resizable.snap.ext.js');
JSNHtmlAsset::addScript(JSNES_PLG_SYSTEM_ASSETS_URL . 'lib/prefixfree/prefixfree.min.js');
JSNHtmlAsset::addScript(JSNES_PLG_SYSTEM_ASSETS_URL . 'lib/jquery-keyframes/jquery.keyframes.js');
JSNHtmlAsset::addScript(JSNES_PLG_SYSTEM_ASSETS_URL . 'lib/tinyColorPicker/colors.js');
JSNHtmlAsset::addScript(JSNES_PLG_SYSTEM_ASSETS_URL . 'lib/tinyColorPicker/jqColorPicker.js');

JSNHtmlAsset::addScript(JSNES_PLG_SYSTEM_ASSETS_URL . 'lib/react/react.js');

JSNHtmlAsset::addScript(JSNES_PLG_SYSTEM_ASSETS_URL . 'lib/timer/timer.js');
JSNHtmlAsset::addScript(JSNES_PLG_SYSTEM_ASSETS_URL . 'lib/html2canvas/html2canvas.js');
JSNHtmlAsset::addScript(JSNES_PLG_SYSTEM_ASSETS_URL . 'lib/select2/select2.min.js');

JSNHtmlAsset::addScript(JSNES_PLG_SYSTEM_ASSETS_URL . 'lib/rangy/bundle.js');
JSNHtmlAsset::addScript(JSNES_PLG_SYSTEM_ASSETS_URL . 'lib/mediumjs/medium.min.js');

JSNHtmlAsset::addScript(JSNES_PLG_SYSTEM_ASSETS_URL . 'lib/bootstrap/js/bootstrap.min.js');
JSNHtmlAsset::addScript(JSNES_PLG_SYSTEM_ASSETS_URL . 'lib/bootstrap.growl/jquery.bootstrap-growl.min.js');

JSNHtmlAsset::addScript(JSNES_PLG_SYSTEM_ASSETS_URL . 'js/jsnes_return_jquery.js');
?>


<?php
/* Load Template Files */
echo $this->loadTemplate('slider_layout');
echo $this->loadTemplate('slider_templates');
?>


<script>
	JSNES_CONFIG = {
		URL: {
			BASE					: '<?php echo JURI::base(); ?>',
			SLIDERS_LIST_VIEW		: '<?php echo JURI::base() . 'index.php?option=com_easyslider&view=sliders'; ?>',
			AJAX_CREATE_NEW_SLIDER	: 'index.php?option=com_easyslider&task=slider.createNewSlider',
			AJAX_UPDATE_SLIDER_DATA	: 'index.php?option=com_easyslider&task=slider.updateSliderData',
			AJAX_UPLOAD_IMAGE		: 'index.php?option=com_easyslider&task=slider.ajaxUploadFiles&view=slider',
			API_MEDIA_SELECTOR		: 'index.php?option=com_easyslider&task=selectimages.selectImages&path='
		}
	}
	JSNES_TEXT = {
		"DELETE_ITEM_CONFIRM": 'Are you sure you want to delete this item?',
		"DELETE_SLIDE_CONFIRM": 'Are you sure you want to delete this slide?',
	}
</script>
<script src="<?php echo JSNES_PLG_SYSTEM_ASSETS_URL . 'js/animations.js'; ?>"></script>
<script src="<?php echo JSNES_PLG_SYSTEM_ASSETS_URL . 'js/easyslider.js'; ?>"></script>

<script src="<?php echo JSNES_ASSETS_URL . 'slider/js/addon/view.js'; ?>"></script>
<script src="<?php echo JSNES_ASSETS_URL . 'slider/js/addon/utils.js'; ?>"></script>
<script src="<?php echo JSNES_ASSETS_URL . 'slider/js/addon/inputs.js'; ?>"></script>

<script src="<?php echo JSNES_ASSETS_URL . 'slider/js/model/item.js'; ?>"></script>
<script src="<?php echo JSNES_ASSETS_URL . 'slider/js/model/slide.js'; ?>"></script>
<script src="<?php echo JSNES_ASSETS_URL . 'slider/js/model/slider.js'; ?>"></script>

<script src="<?php echo JSNES_ASSETS_URL . 'slider/js/view/slider.js'; ?>"></script>
<script src="<?php echo JSNES_ASSETS_URL . 'slider/js/view/thumbs.js'; ?>"></script>
<script src="<?php echo JSNES_ASSETS_URL . 'slider/js/view/slides.js'; ?>"></script>
<script src="<?php echo JSNES_ASSETS_URL . 'slider/js/view/layers.js'; ?>"></script>
<script src="<?php echo JSNES_ASSETS_URL . 'slider/js/view/canvas.js'; ?>"></script>
<script src="<?php echo JSNES_ASSETS_URL . 'slider/js/view/inspector.js'; ?>"></script>
<script src="<?php echo JSNES_ASSETS_URL . 'slider/js/view/inspector.slide.js'; ?>"></script>
<script src="<?php echo JSNES_ASSETS_URL . 'slider/js/view/inspector.item.js'; ?>"></script>
<script src="<?php echo JSNES_ASSETS_URL . 'slider/js/view/toolbar.js'; ?>"></script>
<script src="<?php echo JSNES_ASSETS_URL . 'slider/js/view/settings.js'; ?>"></script>
<script src="<?php echo JSNES_ASSETS_URL . 'slider/js/view/animation.selector.js'; ?>"></script>

<?php include_once JPATH_COMPONENT_ADMINISTRATOR . '/views/slider/tmpl/edit_slider_edition.php';?>

<script src="<?php echo JSNES_ASSETS_URL . 'slider/js/init.js'; ?>"></script>