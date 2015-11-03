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

include_once JPATH_ROOT . '/administrator/components/com_easyslider/classes/jsn.easyslider.slider.php';

class JSNEasySliderRender
{
    private $_db = null;
    private $_mediaObjectMicrodata = null;
    private $_videoObjectMicrodata = null;
    private $_imageObjectMicrodata = null;

    private $_uriBase = '';

    /**
     * Contructor
     */
    public function __construct()
    {
        $this->_db = JFactory::getDbo();
        $this->_mediaObjectMicrodata = new JMicrodata('MediaObject');
        $this->_videoObjectMicrodata = new JMicrodata('VideoObject');
        $this->_imageObjectMicrodata = new JMicrodata('ImageObject');

        $this->_uriBase = JURI::root();
        $this->_uriBase = substr($this->_uriBase, strlen($this->_uriBase) - 1, strlen($this->_uriBase)) == '/' ?
            substr($this->_uriBase, 0, strlen($this->_uriBase) - 1) :
            $this->_uriBase;
    }

    /**
     * Render HTML structure
     * @param int $sliderID
     *
     * @return (string)
     */
    public function render($sliderID, $status = false)
    {
        if (is_numeric((int)$sliderID))
        {

            $objJSNEasySliderSlider = new JSNEasySliderSlider();

            // Load the results as a list of stdClass objects (see later for more options on retrieving data).
            $results = $objJSNEasySliderSlider->getSliderInfoByID((int)$sliderID);

            if (count($results))
            {
            	if ($status)
            	{
            		if ( !(int) $results->published )
            		{
            			return '';
            		}	
            	}	
            	
                $this->_loadAssets();
                $data = json_decode($results->slider_data);
                if ($data)
                {
                    $settings       = isset($data->settings) ? $data->settings : new stdClass();
                    $startAt        = isset($settings->startAt) ? $settings->startAt : 1;
                    $loop           = isset($settings->loopSlider) && $settings->loopSlider ? 'loop' : '';
                    $fonts          = isset($data->fonts) ? array_unique($data->fonts) : array();
                    $html           = '';
                    foreach($fonts as $key=>$font )
                    {
                        $font = preg_replace('/\s/is', '+', $font);
                        $html .= '<link href="//fonts.googleapis.com/css?family=' . $font .'" rel="stylesheet" type="text/css" data-noprefix />';
                    }

                    $html .= '<div uribase="' . $this->_uriBase . '" class="jsn-es-slider" id="slider' . $sliderID . '"
                             data-full-width="'     . (isset($data->fullWidth) ? $data->fullWidth : 'false') . '"
                             data-full-height="'    . (isset($data->fullHeight) ? $data->fullHeight : 'false') . '"

                             data-width="'          . (isset($data->width) ? $data->width : '') . '"
                             data-height="'         . (isset($data->height) ? $data->height : '') . '"

                             data-max-width="'      . (isset($data->maxWidth ) ? $data->maxWidth  : '' ) . '"
                             data-min-width="'      . (isset($data->minWidth) ? $data->minWidth   : '' ). '"

                             data-max-height="'     . (isset($data->maxHeight) ? $data->maxHeight  : '' ) . '"
                             data-min-height="'     . (isset($data->minHeight) ? $data->minHeight   : '' ) . '"

                             data-container-width="' . (isset($data->canvasWidth) ? $data->canvasWidth : '') . '"
                             data-container-height="' . (isset($data->canvasHeight) ? $data->canvasHeight : '') . '"

                             data-tablet-mode="'    . (isset($data->tabletMode) ? $data->tabletMode : 'false') . '"
                             data-tablet-under="'   . (isset($data->tabletUnder ) ? $data->tabletUnder  : '' ). '"
                             data-tablet-width="'   . (isset($data->tabletWidth ) ? $data->tabletWidth  : '' ) . '"
                             data-tablet-height="'  . (isset($data->tabletHeight ) ? $data->tabletHeight  : '' ) . '"

                             data-mobile-mode="'    . (isset($data->mobileMode) ? $data->mobileMode : 'false') . '"
                             data-mobile-under="'   . (isset($data->mobileUnder) ? $data->mobileUnder : '') . '"
                             data-mobile-width="'   . (isset($data->mobileWidth) ? $data->mobileWidth : '') . '"
                             data-mobile-height="'  . (isset($data->mobileHeight ) ? $data->mobileHeight  : ''). '"

                             data-start-at="'       . $startAt . '"
                             data-loop="'           . $loop . '"
                            >';

                    //get html string for slides
                    if (isset($data->slides) && !empty($data->slides))
                    {
                        foreach ($data->slides as $slide)
                        {
                            $html .= $this->renderSlide($slide, $settings);
                        }
                    }
                    if (isset($settings->showPagination) && $settings->showPagination)
                    {
                        $html .= '<div class="buttons-container"><div class="buttons"></div></div>';
                    }
                    else
                    {
                        $html .= '<div class="buttons-container hidden" style="visibility: hidden;"><div class="buttons"></div></div>';
                    }

                    if (isset($settings->showProgress) && $settings->showProgress)
                    {
                        $html .= '<div class="jsn-es-progress"><div class="jsn-es-progress-bar"></div></div>';
                    }
                    $html .= '<span class="loading-text">...</span>';

                    $nextLabel = isset($settings->nextBtnLabel) && $settings->nextBtnLabel ? $settings->nextBtnLabel : '';
                    $prevLabel = isset($settings->prevBtnLabel) && $settings->prevBtnLabel ? $settings->prevBtnLabel : '';

                    if (isset($settings->showBtnPrev) && $settings->showBtnPrev)
                    {
                        if (is_bool($settings->showBtnPrev))
                        {
                            $html .= '<a class="nav-button prev ' . (isset($settings->prevBtnLabel) && $settings->prevBtnLabel ? 'button-has-text' : '') .'">' . $prevLabel . '</a>';
                        }
                        else
                        {
                            if ($settings->showBtnPrev == 'true')
                            {
                                $html .= '<a class="nav-button prev ' . (isset($settings->prevBtnLabel) && $settings->prevBtnLabel ? 'button-has-text' : '') .'">' . $prevLabel . '</a>';
                            }
                        }
                    }

                    if (isset($settings->showBtnNext) && $settings->showBtnNext)
                    {
                        if (is_bool($settings->showBtnNext))
                        {
                            $html .= '<a class="nav-button next ' . (isset($settings->nextBtnLabel) && $settings->nextBtnLabel ? 'button-has-text' : '') .'">' . $nextLabel . '</a>';
                        }
                        else
                        {
                            if ($settings->showBtnNext == 'true')
                            {
                                $html .= '<a class="nav-button next ' . (isset($settings->nextBtnLabel) && $settings->nextBtnLabel ? 'button-has-text' : '') .'">' . $nextLabel . '</a>';
                            }
                        }
                    }
                    $html .= '</div>';
                    return $html;
                } //end if data: true
                else
                {
                    return '<p>error</p>';
                }

            }

        }

        return '';
    }

    /**
     * Render slide item
     * @param object $slide
     *
     * @return string
     */
    public function renderSlide($slide, $settings)
    {

        $index = $slide->index;
        if (isset($slide->backgroundImage)) $backgroundImage = $slide->backgroundImage;

        $transition = isset($slide->transition) ? $slide->transition : '{}';
        if (isset($slide->items)) $items = $slide->items;

        $html = '';

        $backgroundURL = ($backgroundImage->url == '') ? '' : ($backgroundImage->type == 'extend' ? $backgroundImage->url : ($this->_uriBase . '/' . $backgroundImage->url));

        $html .= '<div class="jsn-es-slide"
                    data-transition=\'' . json_encode($transition) . '\'

                    data-bg-color="' . (isset($slide->backgroundColor) ? $slide->backgroundColor : 'transparent') . '"
                    data-bg-size="' . (isset($slide->backgroundSize) ? $slide->backgroundSize : 'cover') . '"
                    data-bg-position="' . (isset($slide->backgroundPosition) ? $slide->backgroundPosition : 'center') . '"
                >
                    <img data-src="' . $backgroundURL . '" />';

        $html .= '<div class="jsn-es-container">';

        if (isset($items) && !empty($items))
        {
            $html .= $this->renderItems($items);
        }

        $html .= '</div></div>';

        return $html;
    }

    /**
     * Render Item slide
     * @param object $items
     *
     * @return string
     */
    public function renderItems($items)
    {
        $html = '';
        $items = json_decode(json_encode($items, true));

        if (is_array($items) && !empty($items))
        {
            foreach ($items as $item)
            {
                if ($item->show)
                {
                    $customID           = isset($item->customID) ? 'id="' . $item->customID . '"' : '';
                    $customClass        = isset($item->customClassNames) ?  $item->customClassNames : ' ';
                    $style              = $item->style;
                    $style->zIndex      = count($items) - $item->index;

                    $styleT             = isset($item->style_T) ? $item->style_T : new stdClass();
                    $styleT->zIndex     = $style->zIndex;

                    $styleM             = isset($item->style_M) ? $item->style_M : new stdClass();
                    $styleM->zIndex     = $style->zIndex;

                    $build              = $item->build;
                    $animationIn        = array(
                        "effect"        =>  isset($build->inEffect) ? $build->inEffect : '',
                        "start"         =>  isset($build->inStart) ? $build->inStart : '',
                        "end"           =>  isset($build->inEnd) ? $build->inEnd : '',
                        "origin"        =>  isset($build->inOrigin) ? $build->inOrigin : '',
                        "easing"        =>  isset($build->inEasing) ? $build->inEasing : '',
                        'fade'          =>  isset($build->inFade) ? $build->inFade : '',
                        'transform'     =>  isset($build->inTransform) ? $build->inTransform : '{}'
                    );
                    $animationOut       = array(
                        "effect"        => isset($build->outEffect) ? $build->outEffect : '',
                        "start"         =>  isset($build->outStart) ? $build->outStart : '',
                        "end"           =>  isset($build->outEnd) ?  $build->outEnd : '',
						"origin"        =>  isset($build->outOrigin) ? $build->outOrigin : '',
						"easing"        =>  isset($build->outEasing) ? $build->outEasing : '',
                        'fade'          => isset($build->outFade) ?  $build->outFade : '',
                        'transform'     =>  isset($build->outTransform) ? $build->outTransform : '{}'
                    );

                    $html .= '<div '. $customID .'class="jsn-es-item" ';

                    if($item->type == 'image')
                    {
                        $html .= $this->_imageObjectMicrodata->displayScope();
                    }
                    if($item->type == 'video')
                    {
                        $videoObj = $item->video;
                        $html .= ' data-type="video"
                                 data-provider="' . $videoObj->type .'"
                                 data-autoplay="' . $videoObj->autoplay .'"
                                 data-controls="' . $videoObj->controls .'"
                                 data-loop="' . $videoObj->loop .'"
                                 data-quality="default"
                                 data-volume="' . $videoObj->volume .'"';
                    }

                    $html    .= ' data-type="'. (isset($item->type) ? $item->type : '' ) .'"
                                 data-origin="' . (isset($item->origin) ? $item->origin : '' ) . '"
                                 data-animation-in=\'' . json_encode($animationIn) .'\'
                                 data-animation-out=\'' . json_encode($animationOut) .'\'

                                 data-style=\'' . json_encode($style) .'\'
                                 data-style-t=\'' . json_encode($styleT) .'\'
                                 data-style-m=\'' . json_encode($styleM) .'\'

                                 data-classname="'. $customClass .'"
                             >';

                    if (isset($item->link) && $item->link != '')
                    {
                        $target = isset($item->linkTarget) ? $item->linkTarget : '_blank';
                        $html .= '<a href="' . $item->link . '" target="' . $target . '">Link</a>';
                    }

                    //image item
                    if($item->type == 'image')
                    {
                        $html .= '<img ' . $this->_imageObjectMicrodata->htmlProperty('contentUrl') . ' data-src="' . $this->checkURL($item->image->url) . '" alt="' . (isset($item->altText) ? isset($item->altText) : '') . '">';
                    }
                    //html item
                    if ($item->type == 'html')
                    {
                        $html .= '<div>' . $item->content . '</div>';
                    }
                    //text item
                    if ($item->type == 'text')
                    {
                        $html .= '<'. (isset($item->tagName) ? $item->tagName : 'div') .' class="content-text">' . $item->content . '</'. (isset($item->tagName) ? $item->tagName : 'div') .'>';
                    }
                    //video item
                    if ($item->type == 'video')
                    {

                        $metaTags = '<meta ' . $this->_mediaObjectMicrodata->htmlProperty('contentURL') . ' content="' .  $this->checkURL($item->video->url) . '" />
                                    <meta ' . $this->_mediaObjectMicrodata->htmlProperty('width') . ' content="' . $style->width . '" />
                                    <meta ' . $this->_mediaObjectMicrodata->htmlProperty('height') . ' content="' . $style->height . '" />';

                        if ($item->video->type == 'youtube')
                        {
                            $html .= '<a class="video-link" ' . $this->_videoObjectMicrodata->displayScope() . ' href="' .  $this->checkURL($item->video->url) . '">' . $metaTags . 'Youtube Link</a>';
                        }
                        else if ($item->video->type == 'local')
                        {
                            $html .= '<video ' . $this->_videoObjectMicrodata->displayScope() . $item->video->type . ' src="' .  $this->checkURL($item->video->url) . '">' . $metaTags . '</video>';
                        }
                        else if ($item->video->type == 'vimeo')
                        {
                            $id = '';
                            if(preg_match('#vimeo\.com.*.\/(\d+)#is', $this->checkURL($item->video->url), $matches)) {
                                $id = $matches[1];
                            }
                            $html .= '<iframe ' . $this->_videoObjectMicrodata->displayScope() .' class="vimeo-player '. $item->video->type . '" src="//player.vimeo.com/video/'. $id.'?api=1&loop='. ($videoObj->loop ? 1:0) .'"  frameBorder="0" width="100%" height="100%">' . $metaTags . '</iframe>';
                        }
                    }

                    $html .='</div>'; //jsn-es-item

                }
            }
        }

        return $html;
    }

	/**
	 * parseURL
	 * @param string $path
	 *
	 * @return string
	 */

	public function checkURL($path) {
		$result = $path;
		if ( !preg_match('/^(http|https):\/\//', $path ) )
		{
			$result = $this->_uriBase . preg_replace( '/\/+/', '/', ('/' . $path));
		}
		return $result;
	}

    /**
     * Load Assets
     */
    protected function _loadAssets()
    {
        $pathOnly = JURI::root(true);
        $pathRoot = JURI::root();
        $document = JFactory::getDocument();

        $document->addStyleSheet($pathOnly . '/plugins/system/easyslider/assets/css/easyslider.css');

//        $document->addScript($pathOnly . '/plugins/system/easyslider/assets/js/jsnes_jquery_safe.js');
//        $document->addScript($pathOnly . '/plugins/system/easyslider/assets/lib/jquery/jquery.min.js');
        $document->addScript($pathOnly . '/plugins/system/easyslider/assets/js/jsnes_conflict.js');
        $document->addScript($pathOnly . '/plugins/system/easyslider/assets/lib/underscore/underscore-min.js');
        $document->addScript($pathOnly . '/plugins/system/easyslider/assets/lib/backbone/backbone-min.js');

        $document->addScript($pathOnly . '/plugins/system/easyslider/assets/lib/prefixfree/prefixfree.min.js');
        $document->addScript($pathOnly . '/plugins/system/easyslider/assets/lib/jquery-keyframes/jquery.keyframes.js');

        $document->addScript($pathOnly . '/plugins/system/easyslider/assets/js/jsnes_return_jquery.js');

        $document->addScript($pathOnly . '/plugins/system/easyslider/assets/js/addons.js');
        $document->addScript($pathOnly . '/plugins/system/easyslider/assets/js/animations.js');
        $document->addScript($pathOnly . '/plugins/system/easyslider/assets/js/easyslider.js');
        $document->addScript($pathOnly . '/plugins/system/easyslider/assets/js/init.js');
    }
}