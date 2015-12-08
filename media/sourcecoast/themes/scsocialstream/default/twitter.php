<?php
/**
 * @package         JFBConnect
 * @copyright (c)   2009-2014 by SourceCoast - All Rights Reserved
 * @license         http://www.gnu.org/licenses/gpl-2.0.html GNU/GPL
 * @version         Release v6.2.2
 * @build-date      2014/10/03
 */
// Do some formatting on the text to turn links, hashtags and mentions into links
$message = $this->makeClickableLinks($this->message);
// @usernames
$message = preg_replace('#@([\\d\\w]+)#', '<a href="http://twitter.com/$1" target="_blank" rel="nofollow">$0</a>', $message);
// @hashtags
$message = preg_replace('/#([\\d\\w]+)/', '<a href="http://twitter.com/search?q=%23$1&src=hash" target="_blank" rel="nofollow">$0</a>', $message);

echo
'<div class="twitter ' . $this->channelType . ' post row-fluid">
    <div class="span12 author">';
         if ($stream->options->get('show_provider'))
             echo '<div class="provider"><img src="' . JUri::root(true) . '/media/sourcecoast/images/provider/twitter/icon.png" /></div>';
     echo '<div class="author-image"><img src="' . $this->authorImage . '"/></div>
       <div class="author-details">
        <span class="screen-name">' . $this->authorScreenName . '</span><span class="author-name">' . $this->authorName . '</span>';
    if ($stream->options->get('show_date'))
        echo '<div class="date">' . $date . '</div>';
       echo '</div>';
  echo '</div>'; //End author

echo '<div class="row-fluid">
        <div class="message span12">' . $message . '</div>
    </div>';
if ($showLink == 'title')
{
    if ($this->thumbTitle != '')
    {
        ?>
        <div class="row-fluid">
            <div class="preview span12">
                <div class="title"><a href="<?php echo $this->thumbLink; ?>" target="_blank" rel="nofollow"><?php echo $this->thumbTitle; ?></a></div>
            </div>
        </div>
    <?php
    }
}
else if ($showLink == 'full' && ($hasPageInfo || $hasPicture))
{
    ?>
    <div class="row-fluid">
        <div class="preview span12">
            <div class="title"><a href="<?php echo $this->thumbLink; ?>" target="_blank" rel="nofollow"><?php echo $this->thumbTitle; ?></a></div>
            <?php if ($this->thumbPicture)
                echo '<div class="image"><img src="' . $this->thumbPicture . '"/></div>';
            if ($this->thumbCaption)
                echo '<div class="caption"><a href="' . $this->thumbLink . '" target="_blank" rel="nofollow">' . $this->thumbCaption . '</a></div>';
            if ($this->thumbDescription)
                echo '<div class="description"><a href="' . $this->thumbLink . '" target="_blank" rel="nofollow">' . $this->makeClickableLinks($this->thumbDescription) . '</a></div>';
            ?>
        </div>
    </div>
<?php
}echo '</div>';