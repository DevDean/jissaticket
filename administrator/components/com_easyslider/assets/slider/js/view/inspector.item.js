void function(exports,$,_,Backbone){exports.JSNES_ItemInspectorView=JSNES_InspectorView.extend({constructor:function JSNES_ItemInspectorView(){JSNES_InspectorView.apply(this,arguments)},events:_(JSNES_InspectorView.prototype.events).extend({"change .fonts-select":"changeFont","click .add-text-shadow":"addTextShadow","click .add-box-shadow":"addBoxShadow","change .build-in-effect-group":"changeEffectIn","change .build-out-effect-group":"changeEffectOut","click .revert-original-size":"revertOriginalSize","click .reset-to-desktop-style":"resetToDesktopStyle"}),ready:function(){this.slider=this.superView;this.ensureInputInitialized();this.renderEffectSelectContent();this.renderFontsSelectContent();this.textShadowsView=this.attachView(new JSNES_TextShadowsListView({collection:new JSNES_TextShadowsCollection}),".text-shadows");this.boxShadowsView=this.attachView(new JSNES_BoxShadowsListView({collection:new JSNES_BoxShadowsCollection}),".box-shadows");this.listenTo(this.textShadowsView.collection,"add",this.saveTextShadow);this.listenTo(this.textShadowsView.collection,"remove",this.saveTextShadow);this.listenTo(this.textShadowsView.collection,"change",this.saveTextShadow);this.listenTo(this.boxShadowsView.collection,"add",this.saveBoxShadow);this.listenTo(this.boxShadowsView.collection,"remove",this.saveBoxShadow);this.listenTo(this.boxShadowsView.collection,"change",this.saveBoxShadow);this.queueTargets=[];this.debounceInspect=_.debounce(this.debounceInspect);this.resetTextShadow=_.debounce(this.resetTextShadow);this.resetBoxShadow=_.debounce(this.resetBoxShadow)},renderFontsSelectContent:function(){var lastGroup=null;var $group=null;var $fontSelect=this.$(".fonts-select");var fonts=_(this.superView.fontsManager.toJSON()).chain().sortBy("name").sortBy("group");fonts.each(function(font){if(!lastGroup||lastGroup!=font.group){$group=$("<optgroup>").attr("label",font.group).appendTo($fontSelect);lastGroup=font.group}$group.append("<option>"+font.name+"</option>")},this);function renderItem(state){if($(state.element).is("optgroup"))return state.text;else if($(state.element).is("option"))return'<img src="components/com_easyslider/assets/slider/images/fonts/'+state.text.replace(/\s+/g,"-").toLowerCase()+'.png" />'}this.$(".fonts-select").select2({templateSelection:renderItem,templateResult:renderItem,escapeMarkup:function(m){return m}})},renderEffectSelectContent:function(){var view=this;var items_animations=JSNES_ANIMATIONS;_.each(items_animations,function(animations,group){view.$(".effect-select").each(function(){var $group=$("<optgroup>").attr("label",group).appendTo(this);_(animations).each(function(animation,name){$group.append("<option>"+name+"</option>")})})})},inspect:function(model){log("Inspector :: inspect",[model.cid]);if(this._frozen)return;if(_.findWhere(this.queueTargets,{cid:model.cid}))return;this.queueTargets.push(model);this.resetTextShadow();this.resetBoxShadow();this.debounceInspect()},debounceInspect:function(){log("Inspector :: inspect",this.queueTargets.length,"item(s)");while(this.queueTargets.length){var model=this.queueTargets.shift();if(_.findWhere(this.targets,{cid:model.cid}))return;this.superView.slideInspectorView.release();this.targets.push(model);this.debounceUpdateData();this.resetTextShadow();this.resetBoxShadow();this.listenTo(model,"change",this.debounceUpdateData);this.listenTo(model,"remove",this.release);this.$(".jsn-es-dynamic-section").addClass("hidden");var types=this.getValuesOf("type");var $dynamicTab=this.$('a[href="#item-dynamic"]');if(types.length==1){var type=types[0];$dynamicTab.text(type);this.$(".dynamic-section-"+type).removeClass("hidden")}else{$dynamicTab.text("...");this.$(".dynamic-section-multiple").removeClass("hidden")}this.superView.slideInspectorView.$el.addClass("hidden");this.$el.removeClass("hidden")}},updateData:_.compose(JSNES_InspectorView.prototype.updateData,function(){var types=this.getValuesOf("type");if(types.length==1){var type=types[0];switch(type){case"video":break;case"image":this.$(".image-url").val(this.getValueOf("image.url"));break}}}),changeFont:function(e){var name=$(e.currentTarget).val();this.superView.fontsManager.loadFont(name)},resetToDesktopStyle:function(){var responsiveMode=this.slider.model.get("responsiveEditMode");log(responsiveMode);switch(responsiveMode){case"tablet":_(this.targets).invoke("unset","style_T",{silent:true});_(this.targets).invoke("set","style_T",{});break;case"mobile":_(this.targets).invoke("unset","style_M",{silent:true});_(this.targets).invoke("set","style_M",{});break}},revertOriginalSize:function(){_.each(this.targets,function(model){model.setStyle({width:model.get("image").get("original").width,height:model.get("image").get("original").height})})},addTextShadow:function(){this.textShadowsView.collection.add({})},saveTextShadow:function(){var shadowData=this.textShadowsView.toCSSData();this.$(".text-shadow-input").val(shadowData).trigger("change")},resetTextShadow:function(){var shadowsData=this.$(".text-shadow-input").val()||"";this.textShadowsView.collection.reset(parseShadowString(shadowsData))},addBoxShadow:function(){this.boxShadowsView.collection.add({})},saveBoxShadow:function(){var shadowData=this.boxShadowsView.toCSSData();this.$(".box-shadow-input").val(shadowData).trigger("change")},resetBoxShadow:function(){var shadowsData=this.$(".box-shadow-input").val()||"";this.boxShadowsView.collection.reset(parseShadowString(shadowsData))},changeEffectIn:function(){_(this.targets).invoke("trigger","preview:animation","in")},changeEffectOut:function(){_(this.targets).invoke("trigger","preview:animation","out")}});exports.JSNES_TextShadowsListView=Backbone.CollectionView.extend({itemView:Backbone.ItemView.extend({template:"#text-shadow-item-template",className:"jsn-es-shadow-item",events:{"change input":"save","change:color input":"save","click .remove-shadow":"destroy"},initialize:function(){this.render()},ready:function(){this.superView.superView.ensureInputInitialized()},save:function(){this.model.set({x:parseFloat(this.$(".value-x").val()),y:parseFloat(this.$(".value-y").val()),blur:parseFloat(this.$(".value-blur").val()),color:this.$(".value-color").val()})},destroy:function(){this.model.collection.remove(this.model)}}),toCSSData:function(){return this.collection.map(function(model){return model.get("x")+"px "+model.get("y")+"px "+model.get("blur")+"px "+model.get("color")}).join(",").trim()}});exports.JSNES_BoxShadowsListView=Backbone.CollectionView.extend({itemView:Backbone.ItemView.extend({template:"#box-shadow-item-template",className:"jsn-es-shadow-item",events:{"change input":"save","change:color input":"save","change select":"save","click .remove-shadow":"destroy"},initialize:function(){this.render()},ready:function(){this.superView.superView.ensureInputInitialized()},save:function(){this.model.set({inset:this.$(".value-inset").val(),x:parseFloat(this.$(".value-x").val()),y:parseFloat(this.$(".value-y").val()),blur:parseFloat(this.$(".value-blur").val()),color:this.$(".value-color").val()})},destroy:function(){this.model.collection.remove(this.model)}}),toCSSData:function(){return this.collection.map(function(model){return model.get("inset")+" "+model.get("x")+"px "+model.get("y")+"px "+model.get("blur")+"px "+model.get("color")}).join(",").trim()}});function parseShadowString(shadows){return(shadows.match(/((\w+)\s)?(\-?\w+)\s(\-?\w+)\s(\-?\w+)\s(\w+\([^\)]+\)|#\w+)/g)||[]).map(function(shadow){var match=shadow.match(/((\w+)\s)?(\-?\w+)\s(\-?\w+)\s(\-?\w+)\s(\w+\([^\)]+\)|#\w+)/);return{inset:match[2]||"",x:parseFloat(match[3]),y:parseFloat(match[4]),blur:parseFloat(match[5]),color:match[6]}})}}(this,JSNES_jQuery,JSNES_Underscore,JSNES_Backbone);