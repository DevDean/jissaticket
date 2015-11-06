<?php
$title = $this->sliderName;
?>
<div class="jsn-es-dialog jsn-es-panel jsn-es-inspector jsn-es-config">
	<div class="jsn-es-panel-arrow top"></div>
	<div role="tabpanel">

		<!-- Nav tabs -->
		<ul class="nav nav-tabs nav-justified" role="tablist">
			<li role="presentation" class="active">
				<a href="#config-general" aria-controls="config-general" role="tab" data-toggle="tab">General</a>
			</li>
			<li role="presentation" class="">
				<a href="#config-layout" aria-controls="config-layout" role="tab" data-toggle="tab">Layout</a>
			</li>
			<li role="presentation" class="">
				<a href="#config-responsive" aria-controls="config-responsive" role="tab" data-toggle="tab">Responsive</a>
			</li>
			<li role="presentation class=""">
				<a href="#config-theme" aria-controls="config-theme" role="tab" data-toggle="tab">Navigation</a>
			</li>
		</ul>

		<!-- Tab panes -->
		<div class="tab-content">
			<div role="tabpanel" class="tab-pane active" id="config-general">
				<div class="row">
					<div class="form-group col-xs-12">
						<label>Slider's Name</label>
						<input class="form-control input-lg slider-title" placeholder="Give your slide a name..." value="<?php echo $title; ?>">
					</div>
				</div>
			</div>
			<div role="tabpanel" class="tab-pane" id="config-layout">

				<div class="row flex">
					<div class="col-xs-3 form-group push-bottom">
						<label>Canvas</label>
					</div>
					<div class="col-xs-4 form-group text-center">
						<label class="control-description">Width</label>
						<input type="text" step="10" class="form-control input-sm input-number canvas-size-input canvas-width-input" data-bind="canvasWidth" data-unit="px" placeholder="auto" data-tooltip="true" title="Slider canvas width (*required).">
					</div>
					<div class="col-xs-4 form-group text-center">
						<label class="control-description">Height</label>
						<input type="text" step="10" class="form-control input-sm input-number canvas-size-input canvas-height-input" data-bind="canvasHeight" data-unit="px" placeholder="auto" data-tooltip="true" title="Slider canvas height (*required).">
					</div>
					<div class="col-xs-1 form-group text-center"></div>
				</div>
				<div class="row">
					<div class="flex">
						<div class="col-xs-3 form-group">
							<label class="control-description">Slider Width</label>
							<input type="text" step="10" class="form-control input-sm input-number" data-bind="width" data-unit="px" placeholder="auto" data-tooltip="true" title="Container width, Slider will fit inside its parent by defaults.">
						</div>
						<div class="col-xs-3 form-group">
							<label class="control-description">Max Width</label>
							<input type="text" step="10" class="form-control input-sm input-number" data-bind="maxWidth" data-unit="px" placeholder="auto" data-tooltip="true" title="Container max width.">
						</div>
						<div class="col-xs-3 form-group">
							<label class="control-description">Min Width</label>
							<input type="text" step="10" class="form-control input-sm input-number" data-bind="minWidth" data-unit="px" placeholder="auto" data-tooltip="true" title="Container min width.">
						</div>
						<div class="col-xs-3 form-group text-center">
							<label class="control-description">Full Width</label>
							<button type="toggle" data-bind="fullWidth" data-tooltip="true" title="Full width slider mode"></button>
						</div>
					</div>
					<div class="flex">
						<div class="col-xs-3 form-group">
							<label class="control-description">Slider Height</label>
							<input type="text" step="10" class="form-control input-sm input-number" data-bind="height" data-unit="px" placeholder="auto" data-tooltip="true" title="Container height. Auto by default.">
						</div>
						<div class="col-xs-3 form-group">
							<label class="control-description">Max Height</label>
							<input type="text" step="10" class="form-control input-sm input-number" data-bind="maxHeight" data-unit="px" placeholder="auto" data-tooltip="true" title="Container max height.">
						</div>
						<div class="col-xs-3 form-group">
							<label class="control-description">Min Height</label>
							<input type="text" step="10" class="form-control input-sm input-number" data-bind="minHeight" data-unit="px" placeholder="auto" data-tooltip="true" title="Container min height.">
						</div>
						<div class="col-xs-3 form-group text-center">
							<label class="control-description">Full Height</label>
							<button type="toggle" data-bind="fullHeight" data-tooltip="true" title="Full height slider mode"></button>
						</div>
					</div>
				</div>
			</div>
			<div role="tabpanel" class="tab-pane" id="config-responsive">

				<div class="row">
					<div class="form-group flex flex-bottom">
						<div class="col-xs-3 text-center">
							<label class="control-label">Modes</label>
						</div>
						<div class="col-xs-3 text-center">
							<label class="control-description">When slider width below</label>
						</div>
						<div class="col-xs-3 text-center">
							<label class="control-description">Set canvas<br>width to</label>
						</div>
						<div class="col-xs-3 text-center">
							<label class="control-description">Set canvas<br>height to</label>
						</div>
					</div>

					<div class="clearfix"></div>

					<div class="form-group flex  responsive-tablet-settings">
						<div class="col-xs-3 text-center">
							<button type="toggle" data-bind="tabletMode" data-tooltip="true" title="Tablet Mode" data-placement="left"></button>
						</div>
						<div class="col-xs-3">
							<input type="text" step="10" class="form-control input-sm input-number" data-bind="tabletUnder" data-unit="px" value="1024px" placeholder="auto" data-tooltip="true" title="Switch to this mode when device width is smaller this value">
						</div>
						<div class="col-xs-3">
							<input type="text" step="10" class="form-control input-sm input-number" data-bind="tabletWidth" data-unit="px" placeholder="auto" data-tooltip="true" title="Set the canvas width to this value when tablet mode is active">
						</div>
						<div class="col-xs-3">
							<input type="text" step="10" class="form-control input-sm input-number" data-bind="tabletHeight" data-unit="px" placeholder="auto" data-tooltip="true" title="Set the canvas height to this value when tablet mode is active">
						</div>
					</div>

					<div class="clearfix"></div>

					<div class="form-group flex responsive-mobile-settings">
						<div class="col-xs-3 text-center">
							<button type="toggle" data-bind="mobileMode" data-tooltip="true" title="Mobile Mode" data-placement="left"></button>
						</div>
						<div class="col-xs-3">
							<input type="text" step="10" class="form-control input-sm input-number" data-bind="mobileUnder" data-unit="px" value="640px" placeholder="auto" data-tooltip="true" title="Switch to this mode when device width is smaller this value">
						</div>
						<div class="col-xs-3">
							<input type="text" step="10" class="form-control input-sm input-number" data-bind="mobileWidth" data-unit="px" placeholder="auto" data-tooltip="true" title="Set the canvas width to this value when mobile mode is active">
						</div>
						<div class="col-xs-3">
							<input type="text" step="10" class="form-control input-sm input-number" data-bind="mobileHeight" data-unit="px" placeholder="auto" data-tooltip="true" title="Set the canvas height to this value when mobile mode is active">
						</div>
					</div>

				</div>
			</div>
			<div role="tabpanel" class="tab-pane" id="config-transition">

			</div>
			<div role="tabpanel" class="tab-pane" id="config-theme">

				<div class="row">
					<div class="form-group col-xs-4 text-center">
						<label class="toggle-label">Back Button</label>
						<button type="toggle" data-bind="settings.showBtnPrev"></button>
					</div>
					<div class="form-group col-xs-4 text-center">
						<label class="toggle-label">Next Button</label>
						<button type="toggle" data-bind="settings.showBtnNext"></button>
					</div>
					<div class="form-group col-xs-4 text-center">
						<label class="toggle-label">Pagination</label>
						<button type="toggle" data-bind="settings.showPagination"></button>
					</div>
				</div>
				<div class="row">
					<div class="form-group col-xs-4 text-center">
						<label class="toggle-label">Progress Bar</label>
						<button type="toggle" data-bind="settings.showProgress"></button>
					</div>
					<div class="form-group col-xs-4 text-center">
						<label class="toggle-label">Touch Navigate</label>
						<button type="toggle" data-bind="settings.touchNavigation"></button>
					</div>
				</div>
			</div>
		</div>

	</div>
</div>