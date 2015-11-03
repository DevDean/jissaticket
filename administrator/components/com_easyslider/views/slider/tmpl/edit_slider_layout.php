<?php
$uriBase = JURI::root();
$uriBase = substr($uriBase, strlen($uriBase) - 1, strlen($uriBase)) == '/' ?
	substr($uriBase, 0, strlen($uriBase) - 1) :
	$uriBase;
?>
<div class="jsn-master jsn-bootstrap3">
	<!-- BEGIN BACKEND HTML -->
	<div class="jsn-es-loading-screen">
		<div class="loader">
			<div class="loader-inner"></div>
		</div>
	</div>
	<div class="jsn-es-app" <?php echo 'data-uri="' . $uriBase . '"'; ?>>

		<div class="jsn-es-wrapper">

			<div class="jsn-es-layout flex flex-layout flex-vertical">
				<div class="jsn-es-toolbar jsn-es-slider-toolbar flex">
					<div class="jsn-es-brand-wrapper">
						<div class="jsn-es-brand">EasySlider</div>
					</div>
					<div class="left-btn-group">
						<a class="btn btn-default undo-btn" data-tooltip="true" title="Undo (Ctrl+Z)">
							<svg width="20" height="20">
								<path d="M10,3C7.8,3,5.8,3.9,4.3,5.3L2,3v6h6L5.8,6.8C6.8,5.7,8.3,5,10,5c3.3,0,6,2.7,6,6c0,1.8-0.8,3.4-2,4.5 l1.3,1.5c1.7-1.5,2.7-3.6,2.7-6C18,6.6,14.4,3,10,3z"/>
							</svg>
						</a>
						<a class="btn btn-default redo-btn" data-tooltip="true" title="Redo (Shift+Ctrl+Z)">
							<svg width="20" height="20">
								<path d="M2,11c0,2.4,1,4.5,2.7,6L6,15.5c-1.2-1.1-2-2.7-2-4.5c0-3.3,2.7-6,6-6c1.7,0,3.2,0.7,4.2,1.8L12,9h6V3 l-2.3,2.3C14.2,3.9,12.2,3,10,3C5.6,3,2,6.6,2,11z"/>
							</svg>
						</a>
					</div>

					<div class="flex-flexible"></div>
					<span class="left-btn-group">
						<a class="btn btn-default btn-sm add-item-text" data-tooltip="true" title="Add Text">
							<svg width="20" height="20">
								<path d="M2,2h16v2h-7v14H9V4H2V2z"/>
							</svg>
						</a>
						<div class="btn-group dropdown hidden" role="group">
							<a class="btn btn-default btn-sm dropdown-toggle" data-tooltip="true" title="Add Text">
								<svg width="20" height="20">
									<path d="M2,2h16v2h-7v14H9V4H2V2z"/>
								</svg>
							</a>
							<ul class="dropdown-menu">
								<span class="dropdown-menu-arrow"></span>
								<li>
									<a href="javascript:void(0);" class="add-item-text" data-type="text">
										<span class="dropdown-menu-icon fa fa-font"></span>
										Caption
									</a>
								</li>
								<li class="hidden">
									<a href="javascript:void(0);" class="add-item-text" data-type="text-list">
										<span class="dropdown-menu-icon fa fa-asterisk"></span>
										Bullets
									</a>
								</li>
								<li class="hidden">
									<a href="javascript:void(0);" class="add-item-text" data-type="text-paragraph">
										<span class="dropdown-menu-icon fa fa-paragraph"></span>
										Paragraph
									</a>
								</li>
								<li class="hidden">
									<a href="javascript:void(0);" class="add-item-text" data-type="text-badge">
										<span class="dropdown-menu-icon fa fa-certificate"></span>
										Badge
									</a>
								</li>
								<li class="hidden">
									<a href="javascript:void(0);" class="add-item-text" data-type="text-button">
										<span class="dropdown-menu-icon fa fa-stop"></span>
										Button
									</a>
								</li>
							</ul>
						</div>

						<div class="btn-group dropdown" role="group">
							<a class="btn btn-default btn-sm dropdown-toggle" data-tooltip="true" title="Add Image">
								<svg width="20" height="20">
									<path d="M0,1h20v18H0V2h1v15l3-5l5,2l5-4.4l5,3.6V2H0V1z M7.7,5H6.3C5.6,5,5,5.6,5,6.3v1.4
		C5,8.4,5.6,9,6.3,9h1.4C8.4,9,9,8.4,9,7.7V6.3C9,5.6,8.4,5,7.7,5z"/>
								</svg>
							</a>
							<ul class="dropdown-menu">
								<span class="dropdown-menu-arrow"></span>
								<li>
									<a href="javascript:void(0);" class="add-item-image">
										<span class="dropdown-menu-icon fa fa-square-o"></span>
										Placeholder
									</a>
								</li>
								<li>
									<a href="javascript:void(0);" class="add-item-image-from-media">
										<span class="dropdown-menu-icon fa fa-folder-open-o"></span>
										Choose existing ...
									</a>
								</li>
								<li>
									<a href="javascript:void(0);" class="add-item-image-by-url">
										<span class="dropdown-menu-icon fa fa-ellipsis-h"></span>
										Enter URL
									</a>
								</li>
							</ul>
						</div>
						<div class="btn-group dropdown" role="group">
							<a class="btn btn-default btn-sm dropdown-toggle" data-tooltip="true" title="Add Video">
								<svg width="20" height="20">
									<path d="M19,19v1H1v-1H19z M1,16v1h18v-1H1z M1,3v1h18V3H1z M1,0v1h18V0L1,0z M1,4v12h1V4H1z M18,4v12
		h1V4H18z M2,1v2h1V1H2z M14,1v2h1V1H14z M11,1v2h1V1H11z M5,1v2h1V1H5z M8,1v2h1V1H8z M2,17v2h1v-2H2z M14,17v2h1v-2H14z M17,1v2h1
		V1H17z M17,17v2h1v-2H17z M11,17v2h1v-2H11z M5,17v2h1v-2H5z M8,17v2h1v-2H8z M13,10L13,10L8,7v6L13,10z"/>
								</svg>
							</a>
							<ul class="dropdown-menu">
								<span class="dropdown-menu-arrow"></span>
								<li>
									<a href="javascript:void(0);" class="add-item-video-youtube">
										<span class="dropdown-menu-icon fa fa-youtube-play"></span>
										Youtube
									</a>
								</li>
								<li>
									<a href="javascript:void(0);" class="add-item-video-vimeo">
										<span class="dropdown-menu-icon fa fa-link"></span>
										Vimeo
									</a>
								</li>
								<li>
									<a href="javascript:void(0);" class="add-item-video-url">
										<span class="dropdown-menu-icon fa fa-file-video-o"></span>
										Enter video file URL
									</a>
								</li>
							</ul>
						</div>
                    </span>

					<div class="flex-flexible"></div>
					<div class="left-btn-group">
						<div class="btn-group" data-toggle="jsn-es-buttons" data-bind="responsiveEditMode"
							 data-default="default">
							<a class="btn btn-default btn-sm switch-to-default-mode" data-value="default"
							   data-tooltip="true" title="Desktop Layout" style="min-width: 40px">
								<svg width="20" height="20">
									<path d="M0,3h20v13H0V4h1v10h18V4H0V3z M6,18h8v-1H6V18z"/>
								</svg>
							</a>
							<a class="btn btn-default btn-sm switch-to-tablet-mode" data-value="tablet"
							   data-tooltip="true" title="Tablet Layout" style="min-width: 35px">
								<svg width="20" height="20">
									<path id="XMLID_29_" d="M4,3h12v14H4V4h1v11h4v1h2v-1h4V4H4V3z"/>
								</svg>
							</a>
							<a class="btn btn-default btn-sm switch-to-mobile-mode" data-value="mobile"
							   data-tooltip="true" title="Mobile Layout" style="min-width: 30px">
								<svg width="20" height="20">
									<path d="M6,4h8v13H6V6h1v8h2v2h2v-2h2V6H6V4z"/>
								</svg>
							</a>
						</div>
					</div>
					<div class="flex-flexible"></div>
					<div class="left-btn-group">
						<a class="btn btn-default btn-settings" data-tooltip="true" title="Slider Settings" style="margin-right: 20px;">
							<svg width="20" height="20">
								<path d="M18,5.9c0-0.1-0.1-0.3-0.2-0.3c-0.1,0-0.3,0-0.4,0.1l-2.1,2.1L13,7l-0.7-2.3l2.1-2.1
			c0.1-0.1,0.1-0.3,0.1-0.4c0-0.1-0.2-0.2-0.3-0.2c-1.3-0.1-2.5,0.3-3.4,1.2c-1.2,1.2-1.5,3-1,4.5C9.7,7.8,9.6,7.9,9.5,8l-6.9,6.5
			c0,0,0,0,0,0c-0.8,0.8-0.8,2.1,0,3c0.8,0.8,2.1,0.8,2.9,0c0,0,0,0,0,0l6.5-7c0.1-0.1,0.1-0.1,0.2-0.2c1.5,0.6,3.3,0.3,4.5-1
			C17.6,8.4,18.1,7.2,18,5.9z M4.5,16.6c-0.3,0.3-0.8,0.3-1.1,0c-0.3-0.3-0.3-0.8,0-1.1c0.3-0.3,0.8-0.3,1.1,0
			C4.8,15.8,4.8,16.3,4.5,16.6z"/>
							</svg>
						</a>
					</div>
					<div class="right-btn-group">
						<a class="btn btn-default btn-sm btn-cancel-save">
							<span class="fa fa-close"></span>
							Close
						</a>
						<a disabled class="btn btn-success btn-sm btn-save-data">
							<span class="default-label">
								<span class="fa fa-check"></span>
								Save
							</span>
							<span class="saving-label">
								<span class="fa fa-spin fa-spinner"></span>
								Saving
							</span>
						</a>
						<a disabled class="btn btn-success btn-save-data-and-close hidden">
							<span class="fa fa-check"></span>
							Save & Close
						</a>
					</div>
				</div>

				<div class="jsn-es-toolbar jsn-es-slide-toolbar flex">

					<span class="flex-flexible"></span>

					<div class="btn-group">
						<a class="btn btn-default btn-xs btn-copy-item item-align-tools disabled" data-tooltip="true" title="Copy (Ctrl+C)">
							<span class="fa fa-copy"></span>
						</a>
<!--						<a class="btn btn-default btn-xs btn-cut-item disabled" data-tooltip="true" title="Cut (Ctrl+X)">-->
<!--							<span class="fa fa-scissors"></span>-->
<!--						</a>-->
						<a class="btn btn-default btn-paste-item disabled" data-tooltip="true" title="Paste (Ctrl+V)">
							<span class="fa fa-paste"></span>
						</a>
					</div>

					<span class="flex-flexible"></span>

					<div class="btn-group">
						<a class="btn btn-default btn-xs btn-align-items item-align-tools disabled" data-alignment="left" data-tooltip="true"
						   title="Horizontal Align Left">
							<svg width="16" height="16">
								<path d="M1.5,1v14 M13.5,13.5v-4h-10v4H13.5z M9.5,6.5v-4h-6v4H9.5z"/>
							</svg>
						</a>
						<a class="btn btn-default btn-xs btn-align-items item-align-tools disabled" data-alignment="center" data-tooltip="true"
						   title="Horizontal Align Center">
							<svg width="16" height="16">
								<path
									d="M7.5,7v2 M12.5,13.5v-4h-10v4H12.5z M10.5,6.5v-4h-6v4H10.5z M7.5,14v1 M7.5,1v1"/>
							</svg>
						</a>
						<a class="btn btn-default btn-xs btn-align-items item-align-tools disabled" data-alignment="right" data-tooltip="true"
						   title="Horizontal Align Right">
							<svg width="16" height="16">
								<path d="M13.5,1v14 M11.5,13.5v-4h-10v4H11.5z M11.5,6.5v-4h-6v4H11.5z"/>
							</svg>
						</a>
						<a class="btn btn-default btn-xs btn-align-items item-align-tools disabled" data-alignment="top" data-tooltip="true"
						   title="Vertical Align Top">
							<svg width="16" height="16">
								<path d="M1,1.5h14H1z M6.5,3.5h-4v10h4V3.5z M13.5,3.5h-4v6h4V3.5z"/>
							</svg>
						</a>
						<a class="btn btn-default btn-xs btn-align-items item-align-tools disabled" data-alignment="middle" data-tooltip="true"
						   title="Vertical Align Center">
							<svg width="16" height="16">
								<path
									d="M1,7.5h1H1z M7,7.5h2H7z M6.5,2.5h-4v10h4V2.5z M13.5,4.5h-4v6h4V4.5z M14,7.5h1H14z"/>
							</svg>
						</a>
						<a class="btn btn-default btn-xs btn-align-items item-align-tools disabled" data-alignment="bottom" data-tooltip="true"
						   title="Vertical Align Bottom">
							<svg width="16" height="16">
								<path d="M1,13.5h14H1z M6.5,1.5h-4v10h4V1.5z M13.5,5.5h-4v6h4V5.5z"/>
							</svg>
						</a>
					</div>

					<span class="flex-flexible"></span>

<!--                    <span class="zoom-input-wrapper form-inline hidden">-->
<!--                        <span class="fa fa-search-plus"></span>-->
<!--                        <select class="form-control input-sm canvas-zoom">-->
<!--                            <option value="0.25">25%</option>-->
<!--                            <option value="0.5">50%</option>-->
<!--                            <option value="0.7">75%</option>-->
<!--                            <option value="1">100%</option>-->
<!--                            <option value="1.25">125%</option>-->
<!--                            <option value="1.5">150%</option>-->
<!--                            <option value="2">200%</option>-->
<!--                            <option value="3">300%</option>-->
<!--                            <option value="4">400%</option>-->
<!--                        </select>-->
<!--                    </span>-->

				</div>
				<div class="jsn-es-slides flex-flexible flex flex-layout flex-vertical"></div>
			</div>

			<div class="jsn-es-thumbs-panel">
				<ul class="jsn-es-thumbs">
					<li class="jsn-es-thumb add-slide" data-tooltip="true" data-placement="right"
						title="Create new slide">
						<span class="fa fa-plus"></span>
					</li>
				</ul>
			</div>

			<div class="jsn-es-inspector-panel">
				<?php echo $this->loadTemplate('slider_inspector_item'); ?>
				<?php echo $this->loadTemplate('slider_inspector_slide'); ?>
			</div>

			<?php echo $this->loadTemplate('slider_inspector_settings'); ?>

			<div class="jsn-es-animation-selector panel panel-default hidden">
				<div class="jsn-es-animation-list list-group"></div>
				<span class="panel-arrow bottom"></span>
			</div>

			<div class="jsn-es-media-selector hidden">
				<iframe class="jsn-image-frame" width="100%" height="100%" frameborder="0"></iframe>
			</div>

		</div>
	</div>

	<div class="jsn-es-medium-toolbar panel panel-default hidden">
		<div class="panel-body form-inline">
			<div class="btn-group btn-group-sm dropdown">
				<button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
					<span class="fa fa-paragraph"></span>
					<span class="caret"></span>
				</button>
				<ul class="dropdown-menu">
					<li><a href="#">Helvetica Neue</a></li>
					<li><a href="#">Times New Romance</a></li>
				</ul>
			</div>
			<div class="btn-group btn-group-sm hidden">
				<button type="button" class="btn btn-default">
					Helvetica Neue
					<span class="btn-divider"></span>
					<span class="caret"></span>
				</button>
			</div>
			<div class="btn-group btn-group-sm">
				<button type="button" class="btn btn-default">
					<span class="fa fa-list-ol"></span>
				</button>
				<button type="button" class="btn btn-default">
					<span class="fa fa-list-ul"></span>
				</button>
			</div>
			<div class="btn-group btn-group-sm" data-toggle="buttons">
				<button type="button" class="btn btn-default" data-toggle="button" aria-pressed="false">
					<span class="fa fa-bold"></span>
				</button>
				<button type="button" class="btn btn-default" data-toggle="button" aria-pressed="false">
					<span class="fa fa-italic"></span>
				</button>
				<button type="button" class="btn btn-default" data-toggle="button" aria-pressed="false">
					<span class="fa fa-underline"></span>
				</button>
			</div>
			<div class="btn-group btn-group-sm" data-toggle="buttons">
				<label class="btn btn-default btn-sm">
					<input type="radio" name="text-align" />
					<span class="fa fa-align-left"></span>
				</label>
				<label class="btn btn-default btn-sm">
					<input type="radio" name="text-align" />
					<span class="fa fa-align-center"></span>
				</label>
				<label class="btn btn-default btn-sm">
					<input type="radio" name="text-align" />
					<span class="fa fa-align-right"></span>
				</label>
			</div>
			<div class="btn-group btn-group-sm">
				<button type="button" class="btn btn-default">
					<span class="fa fa-link"></span>
				</button>
				<button type="button" class="btn btn-default">
					<span class="fa fa-image"></span>
				</button>
			</div>
			<div class="input-group input-number-wrapper hidden">
				<input type="text" class="form-control input-number input-sm" value="72px" />
				<span class="input-group-addon">
					<div class="flex flex-vertical">
						<a class=""><span class="fa fa-angle-up"></span></a>
						<a class=""><span class="fa fa-angle-down"></span></a>
					</div>
				</span>
			</div>
		</div>
	</div>

	<!-- END BACKEND HTML -->
</div>