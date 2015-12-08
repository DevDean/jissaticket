<?php
/*------------------------------------------------------------------------
# mod_bizkniztwitterfeeddisplay - Bizkniz Twitter Feed Display
# ------------------------------------------------------------------------
# @author - Bizkniz
# copyright - All rights reserved by Bizkniz
# @license - http://www.gnu.org/licenses/gpl-2.0.html GNU/GPL
# Websites: http://bizkniz.net/
# Technical Support:  admin@bizkniz.net
-------------------------------------------------------------------------*/
// no direct access
defined( '_JEXEC' ) or die;
?>
<div id="twitterFeeddisplay" class="<?php echo $params->get('moduleclass_sfx');?>">
	<a class="twitter-timeline" data-theme="<?php echo $params->get('theme'); ?>" data-chrome="nofooter noscrollbar " href="https://twitter.com/<?php echo $params->get('userName');?>" data-widget-id="<?php echo $params->get('widgetId'); ?>" width="<?php echo trim($params->get('width'));?>" height="<?php echo trim($params->get('height'));?>">Tweets by @<?php echo $params->get('userName');?></a>
<script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+"://platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");</script>
</div>
<?php if($params->get('support')==1):?>
<div style="font-size: 9px; color: #808080; font-weight: normal; font-family: tahoma,verdana,arial,sans-serif; line-height: 1.28; text-align: right; direction: ltr;"><a href="http://dual-diagnosis-help.com" target="_blank" style="color: #808080;" title="click here">dual-diagnosis-help.com</a></div>
<?php endif; ?>