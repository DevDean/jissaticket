<div class="inner-container">
	<!-- Nav tabs -->
	<ul class="nav nav-pills " role="tablist">
		<li role="presentation" class="active"><a href="#build-in-fx" aria-controls="build-in" role="tab" data-toggle="tab" class="build-in-fx-tab-toggle">Transition in</a></li>
		<li role="presentation"><a href="#build-out-fx" aria-controls="build-out" role="tab" data-toggle="tab" class="build-out-fx-tab-toggle">Transition out</a></li>
	</ul>

	<!-- Tab panes -->
	<div class="tab-content">
		<div role="tabpanel" class="tab-pane build-in-effect-group active" id="build-in-fx">
			<div class="row">
				<div class="form-group col-xs-2 text-right">
					<label>Start</label>
				</div>
				<div class="form-group col-xs-4">
					<input type="text" class="form-control input-sm input-number" data-bind="build.inStart" min="0" value="0" step="0.1" decimal="1" data-type="time">
				</div>
				<div class="form-group col-xs-2 text-right">
					<label>End</label>
				</div>
				<div class="form-group col-xs-4">
					<input type="text" class="form-control input-sm input-number" data-bind="build.inEnd" min="0" value="0" step="0.1" decimal="1" data-type="time">
				</div>
			</div>

			<div class="row">
				<div class="form-group col-xs-3 text-right">
					<label>Easing</label>
				</div>
				<div class="form-group col-xs-6">
					<select class="form-control input-sm" data-bind="build.inEasing">
						<optgroup label="linear">
							<option value="linear">None</option>
						</optgroup>
						<optgroup label="IN">
							<option value="easeInQuad">Quad.In</option>
							<option value="easeInCubic">Cubic.In</option>
							<option value="easeInQuart">Quart.In</option>
							<option value="easeInQuint">Quint.In</option>
							<option value="easeInExpo">Expo.In</option>
							<option value="easeInSine">Sine.In</option>
							<option value="easeInCirc">Circular.In</option>
							<option value="easeInElastic">Elastic.In</option>
							<option value="easeInBack">Back.In</option>
							<option value="easeInBounce">Bounce.In</option>
						</optgroup>
						<optgroup label="OUT">
							<option value="easeOutQuad">Quad.Out</option>
							<option value="easeOutCubic">Cubic.Out</option>
							<option value="easeOutQuart">Quart.Out</option>
							<option value="easeOutQuint">Quint.Out</option>
							<option value="easeOutExpo">Expo.Out</option>
							<option value="easeOutSine">Sine.Out</option>
							<option value="easeOutCirc">Circular.Out</option>
							<option value="easeOutElastic">Elastic.Out</option>
							<option value="easeOutBack">Back.Out</option>
							<option value="easeOutBounce">Bounce.Out</option>
						</optgroup>
						<optgroup label="IN.OUT">
							<option value="easeInOutQuad">Quad.In.Out</option>
							<option value="easeInOutCubic">Cubic.In.Out</option>
							<option value="easeInOutQuart">Quart.In.Out</option>
							<option value="easeInOutQuint">Quint.In.Out</option>
							<option value="easeInOutExpo">Expo.In.Out</option>
							<option value="easeInOutSine">Sine.In.Out</option>
							<option value="easeInOutCirc">Circular.In.Out</option>
							<option value="easeInOutElastic">Elastic.In.Out</option>
							<option value="easeInOutBack">Back.In.Out</option>
							<option value="easeInOutBounce">Bounce.In.Out</option>
						</optgroup>
					</select>
				</div>
				<div class="form-group col-xs-3 text-center">
					<a class="btn btn-default btn-sm btn-block" data-toggle="jsn-es-button" data-bind="build.inTransform.opacity" data-on="0" data-off="1">Fade</a>
				</div>

				<div class="clearfix"></div>

				<label class="col-xs-3 col-xs-offset-3 text-center">X</label>
				<label class="col-xs-3 text-center">Y</label>
				<label class="col-xs-3 text-center">Z</label>

				<div class="clearfix"></div>
				<div class="form-group col-xs-3 text-right">
					<label>Offset</label>
				</div>
				<div class="form-group col-xs-3">
					<input type="text" class="form-control input-sm input-number" data-bind="build.inTransform.translate.x" step="10" />
				</div>
				<div class="form-group col-xs-3">
					<input type="text" class="form-control input-sm input-number" data-bind="build.inTransform.translate.y" step="10" />
				</div>
				<div class="form-group col-xs-3">
					<input type="text" class="form-control input-sm input-number" data-bind="build.inTransform.translate.z" step="10" />
				</div>

				<div class="clearfix"></div>
				<div class="form-group col-xs-3 text-right">
					<label>Rotate</label>
				</div>
				<div class="form-group col-xs-3">
					<input type="text" class="form-control input-sm input-number" data-bind="build.inTransform.rotate.x" step="10" />
				</div>
				<div class="form-group col-xs-3">
					<input type="text" class="form-control input-sm input-number" data-bind="build.inTransform.rotate.y" step="10" />
				</div>
				<div class="form-group col-xs-3">
					<input type="text" class="form-control input-sm input-number" data-bind="build.inTransform.rotate.z" step="10" />
				</div>

				<div class="clearfix"></div>
				<div class="form-group col-xs-3 text-right">
					<label>Scale</label>
				</div>
				<div class="form-group col-xs-3">
					<input type="text" class="form-control input-sm input-number" data-bind="build.inTransform.scale.x" step="0.1" defaultValue="1" />
				</div>
				<div class="form-group col-xs-3">
					<input type="text" class="form-control input-sm input-number" data-bind="build.inTransform.scale.y" step="0.1" defaultValue="1" />
				</div>

				<div class="clearfix"></div>
				<div class="form-group col-xs-3 text-right">
					<label>Skew</label>
				</div>
				<div class="form-group col-xs-3">
					<input type="text" class="form-control input-sm input-number" data-bind="build.inTransform.skew.x" step="1" />
				</div>
				<div class="form-group col-xs-3">
					<input type="text" class="form-control input-sm input-number" data-bind="build.inTransform.skew.y" step="1" />
				</div>

				<div class="clearfix"></div>
				<br>
				<div class="form-group col-xs-3 text-right">
					<label>Origin</label>
				</div>
				<div class="form-group col-xs-3">
					<input type="text" class="form-control input-sm input-number" data-bind="build.inTransform.origin.x" step="0.1" />
				</div>
				<div class="form-group col-xs-3">
					<input type="text" class="form-control input-sm input-number" data-bind="build.inTransform.origin.y" step="0.1" />
				</div>
			</div>
		</div>
		<div role="tabpanel" class="tab-pane build-out-effect-group" id="build-out-fx">
			<div class="row">
				<div class="form-group col-xs-2 text-right">
					<label>Start</label>
				</div>
				<div class="form-group col-xs-4">
					<input type="text" class="form-control input-sm input-number" data-bind="build.outStart" min="0" value="0" step="0.1" decimal="1" data-type="time">
				</div>
				<div class="form-group col-xs-2 text-right">
					<label>End</label>
				</div>
				<div class="form-group col-xs-4">
					<input type="text" class="form-control input-sm input-number" data-bind="build.outEnd" min="0" value="0" step="0.1" decimal="1" data-type="time">
				</div>
			</div>

			<div class="row">
				<div class="form-group col-xs-3 text-right">
					<label>Easing</label>
				</div>
				<div class="form-group col-xs-6">
					<select class="form-control input-sm" data-bind="build.outEasing">
						<optgroup label="linear">
							<option value="linear">None</option>
						</optgroup>
						<optgroup label="IN">
							<option value="easeInQuad">Quad.In</option>
							<option value="easeInCubic">Cubic.In</option>
							<option value="easeInQuart">Quart.In</option>
							<option value="easeInQuint">Quint.In</option>
							<option value="easeInExpo">Expo.In</option>
							<option value="easeInSine">Sine.In</option>
							<option value="easeInCirc">Circular.In</option>
							<option value="easeInElastic">Elastic.In</option>
							<option value="easeInBack">Back.In</option>
							<option value="easeInBounce">Bounce.In</option>
						</optgroup>
						<optgroup label="OUT">
							<option value="easeOutQuad">Quad.Out</option>
							<option value="easeOutCubic">Cubic.Out</option>
							<option value="easeOutQuart">Quart.Out</option>
							<option value="easeOutQuint">Quint.Out</option>
							<option value="easeOutExpo">Expo.Out</option>
							<option value="easeOutSine">Sine.Out</option>
							<option value="easeOutCirc">Circular.Out</option>
							<option value="easeOutElastic">Elastic.Out</option>
							<option value="easeOutBack">Back.Out</option>
							<option value="easeOutBounce">Bounce.Out</option>
						</optgroup>
						<optgroup label="IN.OUT">
							<option value="easeInOutQuad">Quad.In.Out</option>
							<option value="easeInOutCubic">Cubic.In.Out</option>
							<option value="easeInOutQuart">Quart.In.Out</option>
							<option value="easeInOutQuint">Quint.In.Out</option>
							<option value="easeInOutExpo">Expo.In.Out</option>
							<option value="easeInOutSine">Sine.In.Out</option>
							<option value="easeInOutCirc">Circular.In.Out</option>
							<option value="easeInOutElastic">Elastic.In.Out</option>
							<option value="easeInOutBack">Back.In.Out</option>
							<option value="easeInOutBounce">Bounce.In.Out</option>
						</optgroup>
					</select>
				</div>
				<div class="form-group col-xs-3 text-center">
					<a class="btn btn-default btn-sm btn-block" data-toggle="jsn-es-button" data-bind="build.outTransform.opacity" data-on="0" data-off="1">Fade</a>
				</div>

				<div class="clearfix"></div>

				<label class="col-xs-3 col-xs-offset-3 text-center">X</label>
				<label class="col-xs-3 text-center">Y</label>
				<label class="col-xs-3 text-center">Z</label>

				<div class="clearfix"></div>
				<div class="form-group col-xs-3 text-right">
					<label>Offset</label>
				</div>
				<div class="form-group col-xs-3">
					<input type="text" class="form-control input-sm input-number" data-bind="build.outTransform.translate.x" step="10" />
				</div>
				<div class="form-group col-xs-3">
					<input type="text" class="form-control input-sm input-number" data-bind="build.outTransform.translate.y" step="10" />
				</div>
				<div class="form-group col-xs-3">
					<input type="text" class="form-control input-sm input-number" data-bind="build.outTransform.translate.z" step="10" />
				</div>

				<div class="clearfix"></div>
				<div class="form-group col-xs-3 text-right">
					<label>Rotate</label>
				</div>
				<div class="form-group col-xs-3">
					<input type="text" class="form-control input-sm input-number" data-bind="build.outTransform.rotate.x" step="10" />
				</div>
				<div class="form-group col-xs-3">
					<input type="text" class="form-control input-sm input-number" data-bind="build.outTransform.rotate.y" step="10" />
				</div>
				<div class="form-group col-xs-3">
					<input type="text" class="form-control input-sm input-number" data-bind="build.outTransform.rotate.z" step="10" />
				</div>

				<div class="clearfix"></div>
				<div class="form-group col-xs-3 text-right">
					<label>Scale</label>
				</div>
				<div class="form-group col-xs-3">
					<input type="text" class="form-control input-sm input-number" data-bind="build.outTransform.scale.x" step="0.1" defaultValue="1" />
				</div>
				<div class="form-group col-xs-3">
					<input type="text" class="form-control input-sm input-number" data-bind="build.outTransform.scale.y" step="0.1" defaultValue="1" />
				</div>

				<div class="clearfix"></div>
				<div class="form-group col-xs-3 text-right">
					<label>Skew</label>
				</div>
				<div class="form-group col-xs-3">
					<input type="text" class="form-control input-sm input-number" data-bind="build.outTransform.skew.x" step="1" />
				</div>
				<div class="form-group col-xs-3">
					<input type="text" class="form-control input-sm input-number" data-bind="build.outTransform.skew.y" step="1" />
				</div>

				<div class="clearfix"></div>
				<br>
				<div class="form-group col-xs-3 text-right">
					<label>Origin</label>
				</div>
				<div class="form-group col-xs-3">
					<input type="text" class="form-control input-sm input-number" data-bind="build.outTransform.origin.x" step="0.1" />
				</div>
				<div class="form-group col-xs-3">
					<input type="text" class="form-control input-sm input-number" data-bind="build.outTransform.origin.y" step="0.1" />
				</div>
			</div>
		</div>
	</div>
</div>