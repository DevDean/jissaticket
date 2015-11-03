<script type="text/html" id="thumbview-template">
	<a class="close remove-slide">
		<span class="fa fa-trash-o"></span>
	</a>
	<a class="close duplicate-slide">
		<span class="fa fa-copy"></span>
	</a>
	<div class="drag-handle"></div>
	<div class="thumb-preview"></div>
</script>
<script type="text/html" id="layerview-template">
	<div class="layer-heading flex">
		<span class="drag-handle"></span>
		<span class="layer-icon">
			{{ if(type=="image"){ }}
				<i class="fa fa-picture-o"></i>
			{{ } else if(type == "video"){ }}
				<i class="fa fa-file-video-o"></i>
			{{ } else if(type == "text"){ }}
				<i class="fa fa-font"></i>
			{{ } }}
		</span>
		<span class="layer-toggle-button fa fa-eye enable-layer" es-enable="{{#show }}" data-tooltip="true" title="Show / hide this item"></span>
		<input type="text" class="layer-title flex-flexible" value="" >
		<span class="layer-toggle-button fa fa-lock lock-layer" es-enable="{{# lock }}" data-tooltip="true" title="Lock / unlock this item"></span>
	</div>
	<div class="layer-timeline flex-flexible">
		<div class="timeline-duration">
			<div class="timeline-in">
				<div class="timeline-effect-name" data-tooltip="true" title="Double click to select effect">
					{{# build.inEffect }}
				</div>
			</div>
			<div class="timeline-out">
				<div class="timeline-effect-name" data-tooltip="true" title="Double click to select effect">
					{{# build.outEffect }}
				</div>
			</div>
		</div>
	</div>
	<div class="layer-end">
		<span class="duplicate-layer fa fa-copy" data-tooltip="true" title="Duplicate this item"></span><!--
		--><span class="delete-layer fa fa-close" data-tooltip="true" title="Delete this item"></span>
	</div>
</script>
<script type="text/html" id="slideview-template">
	<div class="jsn-es-canvas-wrapper flex-flexible">
		<div class="jsn-es-canvas-ruler top"></div>
		<div class="jsn-es-canvas-background-wrapper">
			<div class="jsn-es-canvas-background">
				<div class="jsn-es-canvas-markers"></div>
				<div class="jsn-es-canvas-mask"></div>
				<div class="jsn-es-canvas-behind"></div>
				<div class="jsn-es-canvas"></div>
				<div class="jsn-es-canvas-preview hidden"></div>
			</div>
		</div>
		<div class="jsn-es-canvas-ruler bottom"></div>
	</div>
	<div class="jsn-es-layers-wrapper">
		<div class="jsn-es-timeline-slider flex flex-layout">
			<div class="slider-heading">
				<span class="pull-left">
					<span class="fa fa-bars"></span>
					&nbsp; Layers
				</span>
				<div class="btn-group pull-right slide-preview-btn-group">
					<a class="btn btn-success btn-sm slide-preview-btn-enter text" data-tooltip="true" title="Enter Animation Preview (Space)">
						<span class="fa fa-play"></span>
						&nbsp;
						Preview
					</a>
					<a class="btn btn-danger btn-sm slide-preview-btn-play hidden" data-tooltip="true" title="Resume animation playback (Space)">
						<span class="fa fa-play"></span>
					</a>
					<a class="btn btn-danger btn-sm slide-preview-btn-pause hidden" data-tooltip="true" title="Pause animation playback (Space)">
						<span class="fa fa-pause"></span>
					</a>
					<a class="btn btn-danger btn-sm slide-preview-btn-leave text hidden" data-tooltip="true" title="Exit Animation Preview (ESC)">
						Exit Preview
					</a>
				</div>
			</div>
			<div class="slider-track-wrapper flex-flexible">
				<div class="slider-ruler">
					<svg></svg>
				</div>
				<div class="slider-track">
					<div class="slider-track-handle ui-slider-handle">
						<div class="slider-track-handle-guide"></div>
					</div>
				</div>
				<div class="slider-range">
					<div class="ui-slider-handle left">
						<span class="range-marker"></span>
					</div>
					<div class="ui-slider-handle right">
						<span class="range-marker"></span>
					</div>
				</div>
			</div>
			<div class="timeline-toolset">
				<a class="btn btn-default btn-xs decrease-time" data-tooltip="true" title="Duration -0.5s">
					<span class="fa fa-minus"></span>
				</a>
				<a class="btn btn-default btn-xs increase-time" data-tooltip="true" title="Duration +0.5s">
					<span class="fa fa-plus"></span>
				</a>
			</div>
		</div>
		<div class="jsn-es-layers-scroll-wrap">
			<div class="jsn-es-timeline-guide"></div>
			<div class="jsn-es-layers"></div>
		</div>
	</div>
</script>
<script type="text/html" id="itemview-template">
	<div class="preview-container"></div>
	<div class="item-container {{# type }}">
		{{ if ( type == 'text' || type == 'html' ) { }}
		<div class="item-wrap">
			<{{#tagName}} class="text-editor"></{{#tagName}}>
		</div>
		{{ } }}
	</div>
	<div class="item-origin jsn-es-animated" title="Drag me to set item origin">
		<div class="item-origin-handle">
			<svg width="50" height="50">
				<path d="M32,25c0,3.9-3.1,7-7,7s-7-3.1-7-7s3.1-7,7-7S32,21.1,32,25z M25,14V7 M36,25h7 M14,25H7 M25,36v7 M25,21c-2.2,0-4,1.8-4,4s1.8,4,4,4s4-1.8,4-4S27.2,21,25,21z"/>
			</svg>
		</div>
	</div>
	{{ if(type == 'image'){ }}
	<div class="item-loading-spinner">
		<span class="fa fa-spin fa-gear"></span>
	</div>
	{{ } }}
</script>
<script type="text/html" id="media-selector-file-template">
	<a href="{{# filename }}" class="{{# type }}">
		<div class="file-icon"></div>
		<div class="file-name">
			{{# filename }}
		</div>
	</a>
</script>
<script type="text/html" id="text-shadow-item-template">
	<div class="row flex flex-layout">
		<div class="col-xs-4 flex-flexible">
			<input type="text" class="form-control input-sm input-number value-x" value="{{# x }}" data-tooltip="true" title="Shadow Offset X (px)">
		</div>
		<div class="col-xs-4 flex-flexible">
			<input type="text" class="form-control input-sm input-number value-y" value="{{# y }}" data-tooltip="true" title="Shadow Offset Y (px)">
		</div>
		<div class="col-xs-4 flex-flexible">
			<input type="text" class="form-control input-sm input-number value-blur" value="{{# blur }}" data-tooltip="true" title="Shadow Blur (px)">
		</div>
		<div class="col-xs-4 flex-flexible">
			<input type="text" class="form-control input-sm input-color value-color" value="{{# color }}" data-tooltip="true" title="Shadow Color">
		</div>
		<div>
			<a class="btn btn-default btn-sm remove-shadow" data-tooltip="true" title="Remove this shadow">
				<span class="fa fa-trash-o"></span>
			</a>
		</div>
	</div>
</script>
<script type="text/html" id="box-shadow-item-template">
	<div class="row flex flex-layout">
		<div class="col-xs-4 flex-flexible">
			<select class="form-control input-sm value-inset" data-tooltip="true" title="Shadow inset or outset">
				<option value="">out</option>
				<option value="inset" {{ if (inset == 'inset') print("selected") }}>in</option>
			</select>
		</div>
		<div class="col-xs-4 flex-flexible">
			<input type="text" class="form-control input-sm input-number value-x" value="{{# x }}" data-tooltip="true" title="Shadow Offset X (px)">
		</div>
		<div class="col-xs-4 flex-flexible">
			<input type="text" class="form-control input-sm input-number value-y" value="{{# y }}" data-tooltip="true" title="Shadow Offset Y (px)">
		</div>
		<div class="col-xs-4 flex-flexible">
			<input type="text" class="form-control input-sm input-number value-blur" value="{{# blur }}" data-tooltip="true" title="Shadow Blur (px)">
		</div>
		<div class="col-xs-4 flex-flexible">
			<input type="text" class="form-control input-sm input-color value-color" value="{{# color }}" data-tooltip="true" title="Shadow Color">
		</div>
		<div>
			<a class="btn btn-default btn-sm remove-shadow" data-tooltip="true" title="Remove this shadow">
				<span class="fa fa-trash-o"></span>
			</a>
		</div>
	</div>
</script>

<script type="text/html" id="jsn-es-item-template">
	<div class="item-content">{{#content}}</div>
</script>