void function( exports, $, _, Backbone ) {

	var InspectorSliderGroup = React.createClass( {
		render: function() {
			return (
				<div className="row">
					<label className="col-xs-4">
						{ this.props.label }
					</label>

					<div className="col-xs-8 form-group">
						<div className="ui-slider" data-bind={ this.props.bind }></div>
					</div>
				</div>
			)
		}
	} );
	var InspectorNumberInput = React.createClass( {
		componentDidMount: function() {
			$( '.input-number', this.getDOMNode() )
				.attr( 'unit', this.props.unit )
				.JSNES_NumberInput();
		},
		update: function( e ) {
			this.props.model.set( this.props.bind, e.target.value );
		},
		render: function() {
			return (
				<div className="form-group">
					<label className="col-xs-2">
						{ this.props.label }
					</label>

					<div className="col-xs-10">
						<div className="input-group input-number-wrapper">
							<input type="text"
							       className="form-control input-sm input-number"
							       value={ this.props.model.get( this.props.bind ) }
							       onChange={ this.update }
							       placeholder={ this.props.defaultValue || 0 }/>
						</div>
					</div>
					<div className="clearfix"></div>
				</div>
			)
		}
	} );
	var JSNES_Component_AnimationEditor = React.createClass( {
		getInitialState: function() {
			return JSNES_StateStore.load( 'animation-editor' );
		},
		render: function() {
			var transform = this.props.model.get( 'transform' );
			return (
				<div className="jsn-es-panel-layout flex flex-layout flex-vertical">
					<div className="flex-flexible"></div>

					<div className="row flex flex-layout">
						<div className="col-xs-2">
							<label>Offset</label>
							<InspectorNumberInput label="X" unit="px" bind="transform.translateX"
							                      model={ this.props.model }/>
							<InspectorNumberInput label="Y" unit="px" bind="transform.translateY"
							                      model={ this.props.model }/>
							<InspectorNumberInput label="Z" unit="px" bind="transform.translateZ"
							                      model={ this.props.model }/>
						</div>
						<div className="col-xs-2">
							<label>Rotate</label>
							<InspectorNumberInput label="X" unit="&deg;" bind="transform.rotateX"
							                      model={ this.props.model }/>
							<InspectorNumberInput label="Y" unit="&deg;" bind="transform.rotateY"
							                      model={ this.props.model }/>
							<InspectorNumberInput label="Z" unit="&deg;" bind="transform.rotateZ"
							                      model={ this.props.model }/>
						</div>
						<div className="col-xs-2">
							<label>Scale</label>
							<InspectorNumberInput label="X" unit="" defaultValue="1" bind="transform.scaleX"
							                      model={ this.props.model }/>
							<InspectorNumberInput label="Y" unit="" defaultValue="1" bind="transform.scaleY"
							                      model={ this.props.model }/>
						</div>
						<div className="col-xs-2">
							<label>Skew</label>
							<InspectorNumberInput label="X" unit="px" bind="transform.skewX"
							                      model={ this.props.model }/>
							<InspectorNumberInput label="Y" unit="px" bind="transform.skewY"
							                      model={ this.props.model }/>
						</div>
					</div>
				</div>
			)
		}
	} );

	exports.JSNES_AnimationEditor = Backbone.View.extend( {
		initialize: function() {
			this.$el.draggable( {
				distance: 10
			} );
			this.listenTo( this.model, 'change', this.render );
			this.render();
		},
		render: function() {
			React.render( <JSNES_Component_AnimationEditor model={ this.model }/>, this.el );
		}
	} );

}( this, JSNES_jQuery, JSNES_Underscore, JSNES_Backbone )