<?php
/**
 * @copyright	Copyright (C) 2010-2011 HIKASHOP SARL - All rights reserved.
 * @license		http://www.gnu.org/licenses/gpl-3.0.html GNU/GPL
 */
defined('_JEXEC') or die('Restricted access');
if(!defined('DS'))
	define('DS', DIRECTORY_SEPARATOR);
if(!@include_once(rtrim(JPATH_ADMINISTRATOR,DS).DS.'components'.DS.'com_hikashop'.DS.'helpers'.DS.'helper.php') || class_exists('getHikaShopTab')){
	return;
};

$_PLUGINS->registerFunction( 'onUserActive', 'userActivated','getHikaShopTab' );
$_PLUGINS->registerFunction( 'onAfterDeleteUser', 'userDelete','getHikaShopTab' );
$_PLUGINS->registerFunction( 'onBeforeUserBlocking', 'onBeforeUserBlocking','getHikaShopTab' );

class getHikaShopTab extends cbTabHandler {

	var $installed = true;
	var $errorMessage = 'This plugin can not work without the HikaShop Component.<br/>Please download it from <a href="http://www.hikashop.com">http://www.hikashop.com</a> and install it.';
	var $paramBase = 'com_hikashop.order';

	function getHikaShopTab(){
		if(!class_exists('hikashop')){
			$this->installed = false;
		}else{
			$lang = JFactory::getLanguage();
			$lang->load(HIKASHOP_COMPONENT,JPATH_SITE);
		}
		$this->cbTabHandler();
	}


	function getDisplayTab( $tab, $user, $ui) {
		include_once(rtrim(JPATH_ADMINISTRATOR,DS).DS.'components'.DS.'com_hikashop'.DS.'helpers'.DS.'helper.php');
		$my = JFactory::getUser();
		//only you can see your orders
		if (empty($my->id) OR $my->id != $user->user_id) return;

		//load order info
		$database	= JFactory::getDBO();
		$searchMap = array('a.order_id','a.order_status');
		$filters = array('a.order_user_id='.hikashop_loadUser());

		$order = ' ORDER BY a.order_created DESC';
		$query = 'FROM '.hikashop_table('order').' AS a WHERE '.implode(' AND ',$filters).$order;
		$database->setQuery('SELECT a.* '.$query);
		$rows = $database->loadObjectList();

		if(empty($rows)){
			return;
		}
		$currencyHelper = hikashop_get('class.currency');
		$trans = hikashop_get('helper.translation');
		$statuses = $trans->getStatusTrans();

		ob_start();
		?>
			<table class="hikashop_orders adminlist" cellpadding="1">
				<thead>
					<tr>
						<th class="title" align="center">
							<?php echo JText::_('ORDER_NUMBER'); ?>
						</th>
						<th class="title" align="center">
							<?php echo JText::_('DATE'); ?>
						</th>
						<th class="title" align="center">
							<?php echo JText::_('ORDER_STATUS'); ?>
						</th>
						<th class="title" align="center">
							<?php echo JText::_('HIKASHOP_TOTAL'); ?>
						</th>
					</tr>
				</thead>
				<tbody>
					<?php
						$k = 0;
						for($i = 0,$a = count($rows);$i<$a;$i++){
							$row =& $rows[$i];
					?>
						<tr class="<?php echo "row$k"; ?>">
							<td align="center">
								<a href="<?php echo hikashop_completeLink('order&task=show&cid='.$row->order_id.'&cancel_url='.urlencode(base64_encode(JRoute::_('index.php?option=com_comprofiler')))); ?>">
									<?php echo hikashop_encode($row); ?>
								</a>
							</td>
							<td align="center">
								<?php echo hikashop_getDate($row->order_created,'%Y-%m-%d %H:%M');?>
							</td>
							<td align="center">
								<?php
									//get translation
									echo $statuses[$row->order_status];
								?>
							</td>
							<td align="center">
								<?php echo $currencyHelper->format($row->order_full_price,$row->order_currency_id);?>
							</td>
						</tr>
					<?php
							$k = 1-$k;
						}
					?>
				</tbody>
			</table>
		<?php

		return ob_get_clean();
		}

}