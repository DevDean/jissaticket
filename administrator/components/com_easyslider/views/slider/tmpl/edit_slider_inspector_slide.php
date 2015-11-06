<div class="flex flex-layout flex-vertical jsn-es-inspector jsn-es-slide-inspector hidden">

	<!-- Inspector Heading -->
	<div class="jsn-es-inspector-heading">
		<span class="fa fa-sliders"></span>
		Slide Settings
	</div>

	<!-- Nav tabs -->
	<ul class="nav nav-tabs nav-justified" role="tablist">
		<li role="presentation" class="active"><a href="#slide-background" aria-controls="home" role="tab" data-toggle="tab">Background</a></li>
		<li role="presentation"><a href="#slide-transition" aria-controls="item-link" role="tab" data-toggle="tab">Transition</a></li>
	</ul>

	<!-- Tab panes -->
	<div class="tab-content flex-flexible">
		<div role="tabpanel" class="tab-pane active" id="slide-background">
			<div class="row">
				<div class="col-xs-8">
					<label>Color
						<span class="fa fa-question-circle" data-tooltip="true" data-placement="top" title="Background color"></span>
					</label>
				</div>
				<div class="col-xs-4 form-group">
					<input type="text" value="" data-bind="backgroundColor" class="form-control input-sm input-color">
				</div>
			</div>
			<div class="row">
				<div class="form-group col-xs-12">
					<label>Image
						<span class="fa fa-question-circle" data-tooltip="true" data-placement="top" title="Upload background image"></span>
					</label>
					<input type="text" class="form-control input-sm input-image" data-bind="backgroundImage.url" placeholder="http:// ..." />
				</div>

				<div class="clearfix"></div>

				<div class="form-group col-xs-4 background-image-setting">
					<label>Size
						<span class="fa fa-question-circle" data-tooltip="true" data-placement="top" title="Background size (Possible values: cover,contain, #%, #px)"></span>
					</label>
					<input type="text" class="form-control input-sm" data-bind="backgroundSize">
				</div>
				<div class="form-group col-xs-4 background-image-setting">
					<label>Position
						<span class="fa fa-question-circle" data-tooltip="true" data-placement="top" title="Background position (px or %)"></span>
					</label>
					<input type="text" class="form-control input-sm input-number bg-position-x-input" step="5">
				</div>
				<div class="form-group col-xs-4 background-image-setting">
					<label>&nbsp;</label>
					<input type="text" class="form-control input-sm input-number bg-position-y-input" step="5">
				</div>
			</div>
		</div>
		<div role="tabpanel" class="tab-pane" id="slide-transition">
			<div class="row">
				<div class="col-xs-10 col-xs-offset-1">
					<div class="transition-preview-wrapper">
						<div class="slide-sample slide-sample-from"></div>
						<div class="slide-sample slide-sample-to"></div>
						<div class="transition-preview-view"></div>
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-xs-4 form-group">
					<label>Type:</label>
					<select class="form-control input-sm transition-type-select" data-bind="transition.type">
						<option value=1>Basic</option>
						<option value=2>Complex</option>
						<option value=3>Cube</option>
					</select>
				</div>
				<div class="col-xs-4 form-group">
					<label>Delay
						<span class="fa fa-question-circle" data-tooltip="true" data-placement="top" title="How long before this slide begins to transit to another slide"></span>
					</label>
					<input type="text" class="form-control input-sm input-number" min="0" step="0.1" decimal="1" data-bind="transition.delay" data-type="time">
				</div>
				<div class="col-xs-4 form-group">
					<label>Duration
						<span class="fa fa-question-circle" data-tooltip="true" data-placement="top" title="Duration for slide transition"></span>
					</label>
					<input type="text" class="form-control input-sm input-number" min="0" step="0.1" decimal="1" data-bind="transition.duration" data-type="time">
				</div>
			</div>
			<div class="row transition-config" basic-transition-config complex-transition-config>
				<div class="col-xs-12 form-group">
					<label>Effect
						<span class="fa fa-question-circle" data-tooltip="true" data-placement="top" title="Effect for how this slide transits to another slide"></span>
					</label>
					<select class="form-control input-sm transition-name-select" data-bind="transition.effect"></select>
				</div>
			</div>
			<div class="row transition-config" cube-transition-config>
				<div class="col-xs-5 form-group">
					<label>Rotate
<!--						<span class="fa fa-question-circle" data-tooltip="true" data-placement="top"></span>-->
					</label>
					<select class="form-control input-sm" data-bind="transition.cubeRotate">
						<option value="1">Clockwise</option>
						<option value="-1">Anti-clockwise</option>
<!--						<option value="random">Random</option>-->
						<option value="alternate">Alternate</option>
					</select>
				</div>
				<div class="col-xs-4 form-group">
					<label>Around
<!--						<span class="fa fa-question-circle" data-tooltip="true" data-placement="top"></span>-->
					</label>
					<select class="form-control input-sm cube-axis-select" data-bind="transition.cubeAxis">
						<option value="x">X axis</option>
						<option value="y">Y axis</option>
					</select>
				</div>
				<div class="col-xs-3 form-group">
					<label>To
<!--						<span class="fa fa-question-circle" data-tooltip="true" data-placement="top"></span>-->
					</label>
					<select class="form-control input-sm cube-face-select" data-bind="transition.cubeFace">
						<option value="left">Left</option>
						<option value="right">right</option>
						<option value="top">Top</option>
						<option value="bottom">Bottom</option>
						<option value="back">Back</option>
					</select>
				</div>
				<div class="col-xs-7 form-group">
					<label>Cube thickness
<!--						<span class="fa fa-question-circle" data-tooltip="true" data-placement="top"></span>-->
					</label>
					<select class="form-control input-sm" data-bind="transition.cubeDepth">
						<option value="auto">Auto</option>
						<option value="width">Same as width</option>
						<option value="height">Same as height</option>
						<option value="10">Thin</option>
					</select>
				</div>
			</div>
			<div class="row transition-config" complex-transition-config cube-transition-config>
				<div class="col-xs-3 form-group">
					<label>Rows
<!--						<span class="fa fa-question-circle"></span>-->
					</label>
					<input type="text" class="form-control input-sm input-number" min="1" data-bind="transition.rows">
				</div>
				<div class="col-xs-3 form-group">
					<label>delay
<!--						<span class="fa fa-question-circle"></span>-->
					</label>
					<input type="text" class="form-control input-sm input-number" data-bind="transition.delayY" step="50">
				</div>
				<div class="col-xs-3 form-group">
					<label>Cols
<!--						<span class="fa fa-question-circle"></span>-->
					</label>
					<input type="text" class="form-control input-sm input-number" min="1" data-bind="transition.cols">
				</div>
				<div class="col-xs-3 form-group">
					<label>delay
<!--						<span class="fa fa-question-circle"></span>-->
					</label>
					<input type="text" class="form-control input-sm input-number" data-bind="transition.delayX" step="50">
				</div>
			</div>
		</div>
	</div>

</div>