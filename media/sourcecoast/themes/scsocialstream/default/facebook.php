<?php
/**
 * @package         JFBConnect
 * @copyright (c)   2009-2014 by SourceCoast - All Rights Reserved
 * @license         http://www.gnu.org/licenses/gpl-2.0.html GNU/GPL
 * @version         Release v6.2.2
 * @build-date      2014/10/03
 */
$message = $this->makeClickableLinks($this->message);

echo
        '<div class="facebook ' . $this->channelType . ' post row-fluid">
   <div class="span12 author">';
        if ($stream->options->get('show_provider'))
            echo '<div class="provider"><img src="' . JUri::root(true) . '/media/sourcecoast/images/provider/facebook/icon.png" /></div>';
        echo '<div class="author-details">
                <span class="screen-name">' . $this->authorScreenName . '</span>';
        if ($stream->options->get('show_date'))
            echo '<div class="date">' . $date . '</div>';
        echo "</div>";
   echo '</div>';

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
}
if (is_array($this->comments))
{
    echo '<div class="row-fluid">
      <div class="comments preview span12">
      <div class="text-center">Comments</div>';

    foreach ($this->comments['data'] as $comment)
    {
        $date = $this->getTimestamp($comment['created_time'], $dateTimeFormat);

        echo '<div class="row-fluid">
          <div class="span12 comment">
              <div>
                <span class="from text-left"><img src="https://graph.facebook.com/' . $comment['from']['id'] . '/picture" width="25" /> ' . $comment['from']['name'] . '</span>
                <span class="date text-right">' . $date . '</span>
              </div>
              <div class="message">' . $comment['message'] . '</div>
        </div>
        </div>';
    }
    echo '</div>
    </div>';
}
echo '</div>';