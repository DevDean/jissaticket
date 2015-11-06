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

JSNHtmlAsset::addStyle(JSNES_PLG_SYSTEM_ASSETS_URL . 'lib/font-awesome/css/font-awesome.css');

// Display messages
if (JFactory::getApplication()->input->getInt('ajax') != 1)
{
    echo $this->msgs;
}

?>
    <div id="jsn-page-list" class="jsn-master jsn-page-list jsn-easyslider-hide">
        <div class="jsn-bootstrap">
            <form class="form-inline" action="<?php echo JRoute::_('index.php?option=com_easyslider&view=sliders'); ?>"
                  method="post" name="adminForm" id="adminForm">
                <?php
                $pathRootImage = JURI::root();

                $JSNItemList = new JSNItemlistGenerator($this->getModel());

                $JSNItemList->addColumn('', 'slider_id', 'checkbox', array('checkall' => true, 'name' => 'cid[]', 'class' => 'jsn-column-select', 'onclick' => 'Joomla.isChecked(this.checked);'));
				$JSNItemList->addColumn('', null, 'images', array('class' => 'jsn-column-icon', 'srcRoot' => (JSNES_ASSETS_URL . 'images/es-icon-large.png')));

				$JSNItemList->addColumn('JSN_EASYSLIDER_SLIDER_TITLE', 'slider_title', 'link', array('sortTable' => 'il.slider_title', 'class' => 'jsn-column-title', 'link' => 'index.php?option=com_easyslider&view=slider&layout=edit&slider_id={$slider_id}'));
				$JSNItemList->addColumn('JSN_EASYSLIDER_POSITION', 'ordering', 'ordering', array ('sortTable'   => 'il.ordering', 'class'	   => 'jsn-column-ordering', 'classHeader' => 'header-orders'));

				$JSNItemList->addColumn('JSN_EASYSLIDER_SLIDER_ID', 'slider_id', '', array('class' => 'jsn-column-id', 'classHeader' => 'header-2percent', 'sortTable' => 'il.slider_id'));

				$JSNItemList->addColumn('JSN_EASYSLIDER_PUBLISHED', 'published', 'published', array('classHeader' => 'header-5percent', 'class' => 'jsn-column-published'));
				$JSNItemList->addColumn('JSN_EASYSLIDER_ACTION', '', 'custom', array('class' => 'jsn-column-medium','classHeader' => 'header-5percent', 'obj' => $this, 'method' => 'renderBtnAddToModule'));

				echo $JSNItemList->generateFilter();
                echo $JSNItemList->generate();
                ?>
                <?php echo JHTML::_('form.token'); ?>
            </form>
			<div id="jsnes-import-export">
				<!-- Modal -->
				<div class="modal fade hidden" role="dialog">
					<div class="modal-dialog">

						<!-- Modal content-->
						<div class="modal-content">
							<div class="modal-header">
								<button type="button" class="close" data-dismiss="modal">&times;</button>
								<h4 class="modal-title">Modal Header</h4>
							</div>
							<div class="modal-body">
								<p>Some text in the modal.</p>
							</div>
							<div class="modal-footer">
								<button type="button" class="btn btn-default jsnes-close" data-dismiss="modal">Close</button>
								<button type="button" class="btn btn-primary jsnes-save" data-dismiss="modal">OK</button>
							</div>
						</div>

					</div>
				</div>

			</div>
        </div>

		<script type="text/javascript" src="<?php echo JSNES_ASSETS_URL . 'slider/js/view/import-export.js'; ?>"></script>

    </div>
<?php 
if (count($this->sliders))
{
	$preConvertedData = array();
	foreach ($this->sliders as $slider)
	{
		$preConvertedData [$slider->slider_id] = $slider->slider_data;
	}	
	
	if (count($preConvertedData))
	{
?>
	<script type="text/javascript">
		const JSNES_SlidersData = <?php echo json_encode($preConvertedData); ?>;
	</script>
<?php 		
	}
}	
?>
<?php
// Display footer
JSNHtmlGenerate::footer();