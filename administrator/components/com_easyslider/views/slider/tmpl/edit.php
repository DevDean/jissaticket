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
// No direct access
defined('_JEXEC') or die;
// Display messages
if (JFactory::getApplication()->input->getInt('ajax') != 1)
{
	echo $this->msgs;
}

$tab = 'design';
?>
<div class="jsn-page-settings jsn-bootstrap3 jsn-slider">
<form name="adminForm" id="adminForm" action="" method="post">

	<?php echo JSNFormHelper::render($this->form); ?>
	<?php echo $this->loadTemplate('slider'); ?>

	<div id="jsn-modal"></div>
	<input type="hidden" name="slider_id" value="<?php echo isset($this->slider->slider_id) ? $this->slider->slider_id : ''; ?>" />
	<input type="hidden" name="redirect_url" id="redirectUrl" value="" />
	<?php
	if (JSNVersion::isJoomlaCompatible('2.5') AND !JSNVersion::isJoomlaCompatible('3.0'))
	{
	?>
	<input type="hidden" name="redirect_url_form" id="redirectUrlForm" value="" />
	<input type="hidden" name="open_article" id="open-article" value="" />
	<?php
	}
	?>

	<input type="hidden" name="option" value="com_easyslider" />
	<input type="hidden" name="view" value="slider" />
	<input type="hidden" name="task" id="jsn-task" value="" />
	<?php echo JHTML::_('form.token'); ?>
<!--</form>-->
</div>

<?php

class easySliderHTML extends JSNHtmlGenerate {
	public static function footer($products = array(), $echo = true)
	{
		JHTML::_('behavior.tooltip');

		// Get extension manifest cache
		$info = JSNUtilsXml::loadManifestCache('', 'component');

		// Initialize variables
		$name		= $info->name;
		$edition	= JSNUtilsText::getConstant('EDITION');
		$version	= JSNUtilsText::getConstant('VERSION');

		// Initialize links
		$links['info']		= JSNUtilsText::getConstant('INFO_LINK');
		$links['doc']		= JSNUtilsText::getConstant('DOC_LINK');
		$links['review']	= JSNUtilsText::getConstant('REVIEW_LINK');
		$links['update']	= JSNUtilsText::getConstant('UPDATE_LINK');
		$links['upgrade']	= JSNUtilsText::getConstant('UPGRADE_LINK');

		// Generate markup
		$html[] = '
			<div id="jsn-footer" class="jsn-page-footer jsn-bootstrap">
			<div class="pull-left">
			<ul class="jsn-footer-menu">'.
			'<a class="btn btn-primary" style="margin-left: 10px;" href="https://www.joomlashine.com/jsn-easyslider-beta.html" target="_blank">Submit your feedback about JSN EasySlider</a>'.
			/* REPLACE html
				'<li class="first">';

					if ( ! empty($links['doc']))
					{
						$html[] = '
					<a href="' . JRoute::_($links['doc']) . '" target="_blank">' . JText::_('JSN_EXTFW_GENERAL_DOCUMENTATION') . '</a>
				</li>
				<li>';
					}

					$html[] = '
					<a href="http://www.joomlashine.com/contact-us/get-support.html" target="_blank">' . JText::_('JSN_EXTFW_GENERAL_SUPPORT') . '</a>
				</li>';

					if ( ! empty($links['review']))
					{
						$html[] = '
				<li>
					<a href="' . JRoute::_($links['review']) . '" target="_blank">' . JText::_('JSN_EXTFW_GENERAL_VOTE') . '</a>
				</li>';
					}

					$html[] = '
				<li class="jsn-iconbar">
					<strong>' . JText::_('JSN_EXTFW_GENERAL_KEEP_IN_TOUCH') . ':</strong>
					<a title="' . JText::_('JSN_EXTFW_GENERAL_FACEBOOK') . '" target="_blank" href="http://www.facebook.com/joomlashine"><i class="jsn-icon16 jsn-icon-social jsn-icon-facebook"></i></a><a title="' . JText::_('JSN_EXTFW_GENERAL_TWITTER') . '" target="_blank" href="http://www.twitter.com/joomlashine"><i class="jsn-icon16 jsn-icon-social jsn-icon-twitter""></i></a><a title="' . JText::_('JSN_EXTFW_GENERAL_YOUTUBE') . '" target="_blank" href="http://www.youtube.com/joomlashine"><i class="jsn-icon16 jsn-icon-social jsn-icon-youtube""></i></a>
				</li>'.
			*/
			'</ul>
			<ul class="jsn-footer-menu">
				<li class="first">';

					if ( ! empty($links['info']))
					{
						$html[] = '
					<a href="' . JRoute::_($links['info']) . '" target="_blank">JSN ' . preg_replace('/JSN\s*/i', '', JText::_($name)) . ' ' . $edition . ' v' . $version . '</a>';
					}
					else
					{
						$html[] = 'JSN ' . preg_replace('/JSN\s*/i', '', JText::_($name)) . ' ' . $edition . ' v' . $version;
					}

					$html[] = ' by <a href="http://www.joomlashine.com" target="_blank">JoomlaShine.com</a>';

					if ( ! empty($edition) AND ! empty($links['upgrade']) AND ($pos = strpos('free + pro standard', strtolower($edition))) !== false)
					{
						$html[] = '
					&nbsp;<a class="label label-important" href="' . JRoute::_($links['upgrade']) . '"><strong class="jsn-text-attention">' . JText::_($pos ? 'JSN_EXTFW_GENERAL_UPGRADE_TO_PRO_UNLIMITED' : 'JSN_EXTFW_GENERAL_UPGRADE_TO_PRO') . '</strong></a>';
					}

					$html[] = '
				</li>';

					try
					{
						$hasUpdate = false;

						foreach (JSNUpdateHelper::check($products) AS $result)
						{
							if ($result)
							{
								$hasUpdate = true;
								break;
							}
						}

						if ($hasUpdate)
						{
							$html[] = '
				<li id="jsn-global-check-version-result" class="jsn-outdated-version">
					<span class="jsn-global-outdated-version">' . JText::_('JSN_EXTFW_GENERAL_UPDATE_AVAILABLE') . '</span>
					&nbsp;<a href="' . JRoute::_($links['update']) . '" class="label label-important">' . JText::_('JSN_EXTFW_GENERAL_UPDATE_NOW') . '</a>
				</li>';
						}
					}
					catch (Exception $e)
					{
						// Simply ignore
					}

					$html[] = '
			</ul>
			</div>
			<div class="pull-right">
			<ul class="jsn-footer-menu">
				<li class="jsn-iconbar first">
					<span class="hasTip" title="' . JText::_('JSN_EXTFW_GENERAL_POWERADMIN') . '"><a target="_blank" href="http://www.joomlashine.com/joomla-extensions/jsn-poweradmin.html">
						<i class="jsn-icon32 jsn-icon-products jsn-icon-poweradmin"></i>
					</a></span>
					<span class="hasTip" title="' . JText::_('JSN_EXTFW_GENERAL_IMAGESHOW') . '"><a target="_blank" href="http://www.joomlashine.com/joomla-extensions/jsn-imageshow.html">
						<i class="jsn-icon32 jsn-icon-products jsn-icon-imageshow"></i>
					</a></span>
					<span class="hasTip" title="' . JText::_('JSN_EXTFW_GENERAL_UNIFORM') . '"><a target="_blank" href="http://www.joomlashine.com/joomla-extensions/jsn-uniform.html">
						<i class="jsn-icon32 jsn-icon-products jsn-icon-uniform"></i>
					</a></span>
					<span class="hasTip" title="' . JText::_('JSN_EXTFW_GENERAL_MOBILIZE') . '"><a target="_blank" href="http://www.joomlashine.com/joomla-extensions/jsn-mobilize.html">
						<i class="jsn-icon32 jsn-icon-products jsn-icon-mobilize"></i>
					</a></span>
					<span class="hasTip" title="' . JText::_('JSN_EXTFW_GENERAL_PAGEBUILDER') . '"><a target="_blank" href="http://www.joomlashine.com/joomla-extensions/jsn-pagebuilder.html">
						<i class="jsn-icon32 jsn-icon-products jsn-icon-pagebuilder"></i>
					</a></span>
				</li>
			</ul>
			</div>
			<div class="clearbreak"></div>
			</div>
			';

		if ($echo)
		{
			echo implode($html);
		}
		else
		{
			return implode($html);
		}
	}
}

//easySliderHTML::footer();
$timeout = intval(JFactory::getApplication()->getCfg('lifetime') * 60 / 3 * 1000);
$url = JURI::base();

?>
<script type="text/javascript">
	var req = false;
	function refreshSession() {
		req = false;
		if(window.XMLHttpRequest && !(window.ActiveXObject)) {
			try {
				req = new XMLHttpRequest();
			} catch(e) {
				req = false;
			}
			// branch for IE/Windows ActiveX version
		} else if(window.ActiveXObject) {
			try {
				req = new ActiveXObject("Msxml2.XMLHTTP");
			} catch(e) {
				try {
					req = new ActiveXObject("Microsoft.XMLHTTP");
				} catch(e) {
					req = false;
				}
			}
		}

		if(req) {
			req.onreadystatechange = processReqChange;
			req.open("HEAD", "<?php echo $url ?>", true);
			req.send();
		}
	}

	function processReqChange() {
		// only if req shows "loaded"
		if(req.readyState == 4) {
			// only if "OK"
			if(req.status == 200) {
				// TODO: think what can be done here
			} else {
				// TODO: think what can be done here
				//alert("There was a problem retrieving the XML data: " + req.statusText);
			}
		}
	}

	setInterval("refreshSession()", <?php echo $timeout ?>);
</script>
