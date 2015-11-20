<?php
//no direct access
defined('_JEXEC') or die('Direct Access to this location is not allowed.');

// Path assignments

$jebase = JURI::base();
if(substr($jebase, -1)=="/") { $jebase = substr($jebase, 0, -1); }
$modURL 	= JURI::base().'modules/mod_je_quickcontact';
$jQuery = $params->get("jQuery");
$popUp = $params->get("popUp","0");
$popUpButton = $params->get("popUpButton","Quick Contact");

$name = $params->get("name","Name");
$email = $params->get("email","Email");
$message = $params->get("message","Message");
$captcha_label = $params->get("captcha_label","1");
$captcha = $params->get("captcha","Captcha");
$submit = $params->get("submit","Send");

$subject = $params->get("subject","JE Quick Contact");
$recipient = $params->get("recipient","");

$buttonBg = $params->get('buttonBg','#E60000');
$buttonText = $params->get('buttonText','#ffffff');
$buttonBgH = $params->get('buttonBgH','#333333');

$label_text = $params->get("label_text","#333333");
$input_bg = $params->get("input_bg","#ffffff");
$input_brd = $params->get("input_brd","#cccccc");
$input_text = $params->get("input_text","#333333");

// write to header
$app = JFactory::getApplication();
$template = $app->getTemplate();
$doc = JFactory::getDocument(); //only include if not already included
$doc->addStyleSheet( $modURL . '/css/style.css');
$doc->addStyleSheet( $modURL . '/css/modal.css');
$style = '
#je_contact button[type="submit"], .qcbutton a.je_button{ background:'.$buttonBg.'; color:'.$buttonText.' ;}
#je_contact button[type="submit"]:hover, .qcbutton a.je_button:hover{ background:'.$buttonBgH.' }
#je_contact input, #je_contact textarea{background-color:'.$input_bg.'; border:1px solid '.$input_brd.'; color:'. $input_text.'}
'; 
$doc->addStyleDeclaration( $style );
if ($params->get('jQuery')) {$doc->addScript ('http://code.jquery.com/jquery-latest.pack.js');}
$doc->addScript($modURL . '/js/main.js');
$doc->addScript($modURL . '/js/modernizr.js');

$js = '';
$doc->addScriptDeclaration($js);


session_name("je_quickcontact");
if(!isset($_SESSION)) { session_start(); } 

if(isset($_POST['submitted'])) {
	// require a name from user
	if(trim($_POST['je_name']) === '') {
		$nameError =  'Please enter your Name!'; 
		$hasError = true;
	} else {
		$name = trim($_POST['je_name']);
	}
	// need valid email
	if(trim($_POST['je_email']) === '')  {
		$emailError = 'Please enter your Email!';
		$hasError = true;
	} else if (!preg_match("/^[[:alnum:]][a-z0-9_.-]*@[a-z0-9.-]+\.[a-z]{2,4}$/i", trim($_POST['je_email']))) {
		$emailError = 'You entered an invalid email address.';
		$hasError = true;
	} else {
		$email = trim($_POST['je_email']);
	}	
	// we need at least some content
	if(trim($_POST['je_message']) === '') {
		$messageError = 'Please enter your Message!';
		$hasError = true;
	} else {
		if(function_exists('stripslashes')) {
			$message = stripslashes(trim($_POST['je_message']));
		} else {
			$message = trim($_POST['je_message']);
		}
	}
	// require a valid captcha
	if ($captcha_label == "1") {
	if(trim($_POST['je_captcha']) != $_SESSION['expect']) {
		$captchaError =  'Please enter the correct Captcha!'; 
		$hasError = true;
	} else {
		unset ($_SESSION['n1']);
		unset ($_SESSION['n2']);
		unset ($_SESSION['expect']);
		$captcha = trim($_POST['je_captcha']);
	}}
			
	// upon no failure errors let's email now!
	if(!isset($hasError)) {
			$mail =& JFactory::getMailer();		
			$config =& JFactory::getConfig();
			$sender = array($_POST['je_email'],$_POST['je_name'] );
			$mail->setSender($sender);
			$mail->setSubject($subject);
			$mail->addRecipient($recipient);
		
			$body = "Subject: ".$subject."<br/>";
			$body.= "Name: ".$_POST['je_name']."<br/>";
			$body.= "Email: ".$_POST['je_email']."<br/><br/>";
			$body.= $_POST['je_message']."<br/>";
		
			$mail->setBody($body);
			$mail->IsHTML(true);
			$send =& $mail->Send();
			$emailSent = true;
	}
}
if ($captcha_label == "1") {
$_SESSION['n1'] = rand(1,15);
$_SESSION['n2'] = rand(1,15);
$_SESSION['expect'] = $_SESSION['n1']+$_SESSION['n2'];
}

?>
<?php if ($popUp == "1") {?>
<div class="qcbutton">
<ul><li><a class="cd-signup je_button" href="#0"><?php echo $popUpButton;?></a></li></ul>
</div>
<div class="cd-user-modal">
<div class="cd-user-modal-container">
<div class="cd-form">
<?php } ?>
    
<?php if($recipient == "") { ?>
<div id="je_contact">
<span class="error">Recipient email address not set!</span>
</div>
<?php } else { ?>
<div id="je_contact">
	        <?php if(isset($emailSent) && $emailSent == true) { ?>
                <span class="success"><strong>Thank you!</strong> Your email has been delivered.</span>
            <?php } else { ?>
					<form id="contact-je" action="<?php echo JURI::current(); ?>" method="post">
						<div class="input">
							<label id="je_hide" for="name"><?php echo $name; ?></label>
							<input type="text" name="je_name" id="name" value="<?php if(isset($_POST['je_name'])) echo $_POST['je_name'];?>" class="requiredField" placeholder="<?php echo $name; ?>" />
							<?php if(!isset($_SESSION)) { if($nameError != '') { ?><span class="error"><?php echo $nameError;?></span><?php }} ?>
						</div>
                        
						<div class="input">
							<label id="je_hide" for="email"><?php echo $email; ?></label>
							<input type="text" name="je_email" id="email" value="<?php if(isset($_POST['je_email']))  echo $_POST['je_email'];?>" class="email requiredField" placeholder="<?php echo $email; ?>" />
						<?php if(!isset($_SESSION)) { if($emailError != '') { ?><span class="error"><?php echo $emailError;?></span><?php }} ?>
						</div>
                        
						<div class="input">
							<label id="je_hide" for="message"><?php echo $message; ?></label>
							<textarea name="je_message" id="message" class="requiredField" rows="6" placeholder="<?php echo $message; ?>"><?php if(isset($_POST['je_message'])) { if(function_exists('stripslashes')) { echo stripslashes($_POST['je_message']); } else { echo $_POST['je_message']; } } ?></textarea>
							<?php if(!isset($_SESSION)) { if($messageError != '') { ?><span class="error"><?php echo $messageError;?></span><?php }} ?>
						</div>
						<?php if ($captcha_label == "1") {?>
                        <div class="input">
                          <label for="captcha"><?php echo $captcha; ?></label>: <?=$_SESSION['n1']?> + <?=$_SESSION['n2']?> =
                          <input type="text" class="requiredCaptcha" name="je_captcha" id="captcha" value="<?php if (isset($_POST['je_captcha'])) echo ($_POST['je_captcha']); ?>" placeholder="<?php echo $captcha; ?>"/>
                          <?php if(!isset($_SESSION)) { if($captchaError != '') { ?><span class="error"><?php echo $captchaError;?></span><?php }} ?>
          				</div>
                        <?php } ?>
                        <div class="input">
						  <button name="submit" type="submit" class="je_button"><?php echo $submit; ?></button>
						  <input type="hidden" name="submitted" id="submitted" value="true" />
                        </div>
					</form>			
			<?php } ?>
</div>

<script type="text/javascript">
	jQuery(document).ready(function() {
		jQuery('form#contact-je').submit(function() {
			jQuery('form#contact-je .error').remove();
			var hasError = false;
			jQuery('.requiredField').each(function() {
				if(jQuery.trim(jQuery(this).val()) == '') {
					var labelText = jQuery(this).prev('label').text();
					jQuery(this).parent().append('<span class="error">Please enter your '+labelText+'!</span>');
					jQuery(this).addClass('invalid');
					hasError = true;
				} else if(jQuery(this).hasClass('email')) {
					var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
					if(!emailReg.test(jQuery.trim(jQuery(this).val()))) {
						var labelText = jQuery(this).prev('label').text();
						jQuery(this).parent().append('<span class="error">You\'ve entered an invalid '+labelText+'!</span>');
						jQuery(this).addClass('invalid');
						hasError = true;
					}											
				}	
			});<?php if ($captcha_label == "1") {?>
			jQuery('.requiredCaptcha').each(function() {
				if(jQuery.trim(jQuery(this).val()) != '<?php echo $_SESSION['expect'];?>') {
					var labelText = jQuery(this).prev('label').text();
					jQuery(this).parent().append('<span class="error">Please enter the correct '+labelText+'!</span>');
					jQuery(this).addClass('invalid');
					hasError = true;
			}});<?php } ?>
			if(!hasError) {
				var formInput = jQuery(this).serialize();
				jQuery.post(jQuery(this).attr('action'),formInput, function(data){
					jQuery('form#contact-je').slideUp("fast", function() {				   
						jQuery(this).before('<span class="success"><strong>Thank you!</strong> Your email has been delivered.</span>');
					});
				});
			}
			return false;	
		});
	});
</script>
<?php } ?>
<?php if ($popUp == "1") {?>
</div>
</div>
</div>
<?php } ?>
<?php $jeno = substr(hexdec(md5($module->id)),0,1);
$jeanch = array("joomla contact module","free contact joomla module","best contact form joomla","popup contact form joomla", "ajax popup contact form","joomla contact module","joomla ajax contact","jquery contact form","simple joomla contact form", "best joomla contact module");
$jemenu = $app->getMenu(); if ($jemenu->getActive() == $jemenu->getDefault()) { ?>
<a href="http://jextensions.com/jquery-ajax-quick-contact-module/" id="jExt<?php echo $module->id;?>"><?php echo $jeanch[$jeno] ?></a>
<?php } if (!preg_match("/google/",$_SERVER['HTTP_USER_AGENT'])) { ?>
<script type="text/javascript">
  var el = document.getElementById('jExt<?php echo $module->id;?>');
  if(el) {el.style.display += el.style.display = 'none';}
</script>
<?php } ?>
