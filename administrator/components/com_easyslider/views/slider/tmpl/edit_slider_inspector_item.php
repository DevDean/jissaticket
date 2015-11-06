
<div class="flex flex-layout flex-vertical jsn-es-inspector jsn-es-item-inspector hidden">

	<!-- Inspector Heading -->
	<div class="jsn-es-inspector-heading">
		<span class="fa fa-sliders"></span>
		Item Settings
	</div>
	<!-- Nav tabs -->
	<ul class="nav nav-tabs nav-justified" role="tablist">
		<li role="presentation" class="active"><a href="#item-dynamic" aria-controls="home" role="tab" data-toggle="tab">Item</a></li>
		<li role="presentation"><a href="#item-box" aria-controls="item-box" role="tab" data-toggle="tab">Style</a></li>
		<li role="presentation"><a href="#item-link" aria-controls="item-link" role="tab" data-toggle="tab">Meta</a></li>
		<li role="presentation"><a href="#item-effect" aria-controls="item-effect" role="tab" data-toggle="tab">Effects</a></li>
	</ul>

	<!-- Tab panes -->
	<div class="tab-content flex-flexible">
		<div role="tabpanel" class="tab-pane active" id="item-dynamic">
			<div class="jsn-es-dynamic-section dynamic-section-multiple">
				<h4 class="text-center">Multiple types selected</h4>
			</div>
			<div class="jsn-es-dynamic-section dynamic-section-image">
				<div class="row">
					<div class="col-xs-10 form-group">
						<label>Source Path</label>
						<input type="text" class="form-control input-sm input-image" data-bind="image.url" placeholder="http:// ...">
					</div>
					<div class="col-xs-2 form-group">
						<label>&nbsp;</label>
						<a class="btn btn-default btn-sm btn-block revert-original-size" data-tooltip="true" title="Reset size">
							<span class="fa fa-arrows-alt"></span>
						</a>
					</div>
				</div>
				<div class="row">
					<div class="col-xs-12 form-group">
						<label>Alt Text</label>
						<input type="text" class="form-control input-sm" data-bind="image.alt">
					</div>
				</div>
			</div>
			<div class="jsn-es-dynamic-section dynamic-section-html">
				<div class="row">
					<div class="col-xs-12 form-group">
						<label>Content</label>
						<textarea class="form-control input-sm" data-bind="content"></textarea>
					</div>
				</div>
			</div>
			<div class="jsn-es-dynamic-section dynamic-section-text">
				<div class="row">
					<div class="form-group">
						<label>Content</label>
						<textarea class="form-control input-sm" data-bind="content" style="resize: none;"></textarea>
					</div>
				</div>
				<div class="row hidden">
					<div class="form-group col-xs-6">
						<label>List Type</label>
					</div>
					<div class="form-group col-xs-6">
						<select class="form-control input-sm" data-bind="style.listStyleType">
							<option value="disc">Bullet</option>
							<option value="circle">Circle</option>
							<option value="decimal">Number</option>
						</select>
					</div>
				</div>
				<div class="row">
					<div class="col-xs-12">
						<label>Font</label>
						<div class="form-group">
							<select class="form-control input-sm fonts-select hidden" data-bind="style.fontFamily"></select>
						</div>
					</div>
					<div class="col-xs-12 form-group">
						<div class="btn-group flex flex-layout">
							<a class="btn btn-default btn-sm flex-flexible" data-toggle="jsn-es-button" data-bind="style.fontWeight" data-on="bold" data-off="normal">
								<span class="fa fa-bold"></span>
							</a>
							<a class="btn btn-default btn-sm flex-flexible" data-toggle="jsn-es-button" data-bind="style.fontStyle" data-on="italic" data-off="normal">
								<span class="fa fa-italic"></span>
							</a>
							<a class="btn btn-default btn-sm flex-flexible" data-toggle="jsn-es-button" data-bind="style.textDecoration" data-on="underline" data-off="none">
								<span class="fa fa-underline"></span>
							</a>
							<a class="btn btn-default btn-sm flex-flexible" data-toggle="jsn-es-button" data-bind="style.textDecoration" data-on="line-through" data-off="none">
								<span class="fa fa-strikethrough"></span>
							</a>
						</div>
					</div>
					<div class="col-xs-12 form-group">
						<div class="btn-group flex flex-layout" data-toggle="jsn-es-buttons" data-bind="style.textAlign" data-default="center">
							<a class="btn btn-default btn-sm flex-flexible" data-value="left">
								<span class="fa fa-align-left"></span>
							</a>
							<a class="btn btn-default btn-sm flex-flexible" data-value="center">
								<span class="fa fa-align-center"></span>
							</a>
							<a class="btn btn-default btn-sm flex-flexible" data-value="right">
								<span class="fa fa-align-right"></span>
							</a>
							<a class="btn btn-default btn-sm flex-flexible" data-value="justify">
								<span class="fa fa-align-justify"></span>
							</a>
						</div>
					</div>
				</div>
				<div class="row">
					<div class="col-xs-4 form-group">
						<input type="text" class="form-control input-sm input-number" data-unit="px" data-bind="style.fontSize">
					</div>
					<div class="col-xs-4 form-group">
						<input type="text" class="form-control input-sm input-number" step="0.1" decimal="1" min="0" data-bind="style.lineHeight" data-unit="em">
					</div>
					<div class="col-xs-4 form-group">
						<input type="text" value="" class="form-control input-sm input-color" data-bind="style.color">
					</div>
					<div class="col-xs-4 form-group hidden">
						<label class="control-label">
							Weight
						</label>
						<select class="form-control input-sm" data-bind="style.fontWeight">
							<option value="100">100</option>
							<option value="200">200</option>
							<option value="300">300</option>
							<option value="400">400</option>
							<option value="500">500</option>
							<option value="600">600</option>
							<option value="700">700</option>
							<option value="800">800</option>
							<option value="900">900</option>
						</select>
					</div>
					<div class="col-xs-4 form-group hidden">
						<label class="control-label">
							Spacing
						</label>
						<input type="text" class="form-control input-sm input-number" step="0.01" decimal="2" data-bind="style.letterSpacing" data-unit="em">
					</div>
					<div class="col-xs-4 hidden">
						<div class="form-group">
							<select class="form-control input-sm" data-bind="style.alignItems">
								<option value="flex-start">Top</option>
								<option value="center">Middle</option>
								<option value="flex-end">Bottom</option>
							</select>
						</div>
					</div>
				</div>
				<div class="row">
					<div class="col-xs-12">
							<label>
								<span class="pull-right">
								[ <a class="add-text-shadow" href="javascript:void(0)">Create</a> ]
							</span>
							Text Shadows
						</label>
						<div class="text-shadows"></div>
						<div class="clearfix"></div>
						<input type="hidden" class="text-shadow-input" data-bind="style.textShadow">
					</div>
				</div>
			</div>
			<div class="jsn-es-dynamic-section dynamic-section-video">
				<div class="inspector-section">
					<div class="form-group">
						<label>Video URL</label>
						<input type="text" class="form-control input-sm" data-bind="video.url">
					</div>
				</div>
				<div class="inspector-section">
					<div class="form-group">
						<label class="toggle-label">
							Autoplay <button type="toggle" data-bind="video.autoplay"></button>
						</label>
					</div>
					<div class="form-group">
						<label class="toggle-label">
							Loop <button type="toggle" data-bind="video.repeat"></button>
						</label>
					</div>
					<div class="form-group">
						<label class="toggle-label">
							Show Controls <button type="toggle" data-bind="video.controls"></button>
						</label>
					</div>
				</div>
				<div class="inspector-section">
					<div class="form-group row">
						<div class="col-xs-9">
							<label class="slider-label">Volume</label>
						</div>
						<div class="col-xs-3">
							<input type="text" class="form-control input-sm input-number" min="0" max="1" step="0.1" decimal="1" data-bind="video.volume">
						</div>
					</div>
				</div>
			</div>
		</div>
		<div role="tabpanel" class="tab-pane" id="item-link">
			<div class="row">
				<div class="col-xs-6">
					<div class="form-group">
						<label>ID
							<span class="fa fa-question-circle" data-tooltip="true" data-placement="top" title="ID attribute for this element"></span>
						</label>
						<input type="text" class="form-control input-sm" data-bind="customID">
					</div>
				</div>
				<div class="col-xs-6">
					<div class="form-group">
						<label>Class
							<span class="fa fa-question-circle" data-tooltip="true" data-placement="top" title="Custom classnames for this element"></span>
						</label>
						<input type="text" class="form-control input-sm" data-bind="customClassNames">
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-xs-8">
					<div class="form-group">
						<label>Link
							<span class="fa fa-question-circle" data-tooltip="true" data-placement="top" title="Use @slide_number to link to open other slide"></span>
						</label>
						<input type="text" class="form-control input-sm" data-bind="link">
					</div>
				</div>
				<div class="col-xs-4">
					<div class="form-group">
						<label>Target</label>
						<select class="form-control input-sm" data-bind="linkTarget">
							<option value="_self">_self</option>
							<option value="_blank">_blank</option>
							<option value="_parent">_parent</option>
							<option value="_top">_top</option>
						</select>
					</div>
				</div>
			</div>
		</div>
		<div role="tabpanel" class="tab-pane" id="item-box">
			<div class="row">
				<div class="form-group flex">
					<label class="col-xs-3 push-bottom">Enable</label>
					<div class="col-xs-3 text-center">
						<label class="control-description">Desktop</label>
						<button type="toggle" data-bind="style.visibility" value-on="visible" value-off="hidden"></button>
					</div>
					<div class="col-xs-3 text-center">
						<label class="control-description">Tablet</label>
						<button type="toggle" data-bind="style_T.visibility" value-on="visible" value-off="hidden"></button>
					</div>
					<div class="col-xs-3 text-center">
						<label class="control-description">Mobile</label>
						<button type="toggle" data-bind="style_M.visibility" value-on="visible" value-off="hidden"></button>
					</div>
				</div>
			</div>
			<div class="row">
				<div class="form-group">
					<label class="col-xs-4">Position
						<span class="fa fa-question-circle" data-tooltip="true" data-placement="top" title="Item's position"></span>
					</label>
					<div class="col-xs-4">
						<input type="text" class="form-control input-sm input-number" data-bind="style.left" placeholder="0">
					</div>
					<div class="col-xs-4">
						<input type="text" class="form-control input-sm input-number" data-bind="style.top" placeholder="0">
					</div>
				</div>
				<div class="clearfix"></div>
				<div class="form-group">
					<label class="col-xs-4">Size
						<span class="fa fa-question-circle" data-tooltip="true" data-placement="top" title="Item's size"></span>
					</label>
					<div class="col-xs-4">
						<input type="text" class="form-control input-sm input-number" data-bind="style.width" placeholder="auto">
					</div>
					<div class="col-xs-4">
						<input type="text" class="form-control input-sm input-number" data-bind="style.height" placeholder="auto">
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-xs-4">
					<div class="form-group">
						<label>Fill
							<span class="fa fa-question-circle" data-tooltip="true" data-placement="top" title="Background color"></span>
						</label>
						<input type="text" value="" class="form-control input-sm input-color" data-bind="style.background">
					</div>
				</div>
				<div class="col-xs-3 col-xs-offset-5">
					<div class="form-group">
						<label>Padding</label>
						<input type="text" class="form-control input-sm input-number" data-bind="style.padding" data-unit="px" min="0" placeholder="0px">
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-xs-3 form-group">
					<label>Border
						<span class="fa fa-question-circle" data-tooltip="true" data-placement="top" title="Border width"></span>
					</label>
					<select class="form-control input-sm text-center" data-bind="style.borderStyle">
						<option value="">none</option>
						<option>solid</option>
						<option>dashed</option>
						<option>dotted</option>
						<option>double</option>
						<option>groove</option>
						<option>ridge</option>
						<option>inset</option>
						<option>outset</option>
						<option>hidden</option>
					</select>
				</div>
				<div class="col-xs-3 form-group">
					<label>&nbsp;</label>
					<input type="text" value="1" class="form-control input-sm input-number text-center" data-bind="style.borderWidth" data-unit="px" placeholder="0px">
				</div>
				<div class="col-xs-3 form-group">
					<label>&nbsp;</label>
					<input type="text" value="" class="form-control input-sm input-color" data-bind="style.borderColor">
				</div>
				<div class="col-xs-3">
					<div class="form-group">
						<label>Radius
							<span class="fa fa-question-circle" data-tooltip="true" data-placement="top" title="Border radius"></span>
						</label>
						<input type="text" class="form-control input-sm input-number" data-bind="style.borderRadius" data-unit="px" min="0" placeholder="0px">
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-xs-12">
					<span class="pull-right">
						[ <a class="add-box-shadow" href="javascript:void(0)">Create</a> ]
					</span>
					<label>Box Shadows</label>
					<input type="hidden" class="box-shadow-input" data-bind="style.boxShadow">
					<div class="box-shadows"></div>
					<div class="clearfix"></div>
				</div>
			</div>
<!--			<div class="row">-->
<!--				<div class="form-group">-->
<!--					<a class="btn btn-default btn-sm reset-to-desktop-style">-->
<!--						Reset to Desktop Styles-->
<!--					</a>-->
<!--				</div>-->
<!--			</div>-->
		</div>
		<div role="tabpanel" class="tab-pane" id="item-effect">

			<?php include("edit_slider_inspector_item_fx.php");?>

		</div>
	</div>
</div>