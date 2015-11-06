<?php
JSNHtmlAsset::addStyle(JSNES_PLG_SYSTEM_ASSETS_URL . 'lib/bootstrap/css/jsn.bootstrap.css');
JSNHtmlAsset::addStyle(JSNES_PLG_SYSTEM_ASSETS_URL . 'lib/mediumjs/medium.css');

JSNHtmlAsset::addScript(JSNES_PLG_SYSTEM_ASSETS_URL . 'lib/jquery/jquery.min.js');
JSNHtmlAsset::addScript(JSNES_PLG_SYSTEM_ASSETS_URL . 'lib/underscore/underscore-min.js');
JSNHtmlAsset::addScript(JSNES_PLG_SYSTEM_ASSETS_URL . 'lib/backbone/backbone-min.js');
JSNHtmlAsset::addScript(JSNES_PLG_SYSTEM_ASSETS_URL . 'lib/jquery-ui/jquery-ui.min.js');

JSNHtmlAsset::addScript(JSNES_PLG_SYSTEM_ASSETS_URL . 'lib/rangy/bundle.js');
JSNHtmlAsset::addScript(JSNES_PLG_SYSTEM_ASSETS_URL . 'lib/mediumjs/medium.js');


?>
<style>

</style>
<div class="toolbar">
	<button id="insert-list">Insert UL</button>
	<button id="insert-span">Insert SPAN</button>
	<button id="invoke-bold">Bold</button>
	<button id="invoke-h1">H1</button>
	<button id="invoke-font">Font</button>
	<button id="invoke-font2">Font2</button>
</div>
<div id="editor">
	<div>Hello World</div>
</div>
<script>
	jQuery(function($) {

		$('#insert-list' ).mousedown(function() {
			var ul = document.createElement('OL');
			var li = document.createElement('LI');
			ul.appendChild(li);
			li.innerHTML = 'List item';
			editor.focus();
			editor.cursor.moveCursorToEnd(editor.cursor.parent())
			editor.insertHtml(ul);
		});
		$('#insert-span' ).mousedown(function() {
			editor.focus();
			editor.insertHtml( $('<span>Hello</span>' ).css({ color: 'red', fontWeight: 'bold' }).get(0) );
			editor.cursor.moveCursorToEnd(editor.cursor.parent());
			editor.insertHtml( $('<span>Hello</span>' ).css({ color: 'blue', fontWeight: 'bold' }).get(0) );
		});
		$('#invoke-bold' ).mousedown(function() {
			editor.focus();
			editor.invokeElement('b', {  });
		});
		$('#invoke-font' ).mousedown(function() {
			editor.focus();
			editor.invokeElement('i', { style: 'font-family:"Arial Black";color:red;' });
		});
		$('#invoke-font2' ).mousedown(function() {
			editor.focus();
			editor.invokeElement('i', { style: 'font-family:"Helvetica Neue";color:blue;' });
		});
		$('#invoke-h1' ).mousedown(function() {
			var el = editor.cursor.parent();
			if (!$(el ).parent().is('#editor'))
				while (!$(el ).parent().is('#editor')) {
					editor.cursor.caretToAfter( el );
					el = editor.cursor.parent();
				}
			editor.utils.selectNode(el);
			editor.invokeElement('h1', {  });
			return;
			var h1 = $('<h1>' ).html(el.innerHTML ).get(0);
			editor.cursor.caretToAfter( el );
			editor.insertHtml(h1);
			$(el ).remove();
		});

		editor = new Medium({
			element: document.getElementById('editor'),
			mode: Medium.richMode,
			modifier: 'auto',
			maxLength: -1,
			placeholder: "",
			pasteAsText: true,
			autofocus: false,
			autoHR: false,
			attributes: null,
			tags: null,
			drag: true,
			beforeInvokeElement: function () {
				//this = Medium.Element
			},
			beforeInsertHtml: function () {
				//this = Medium.Html
			},
			beforeAddTag: function (tag, shouldFocus, isEditable, afterElement) {

			},
			keyContext: {
				8: function( e, element ) {
					if ($(element ).is('#editor'))
						return false;
				}
			},
			pasteEventHandler: function(e) {
				/*default paste event handler*/
			}
		});
	})
</script>