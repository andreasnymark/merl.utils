/**
 * A little …

 * @author Andreas Nymark <andreas@nymark.me>
 * @license MIT
 * @version 1
**/
var merl = merl || {};

merl.typer = ( function ( window, document ) {
	"use strict";

	var instances = [];
	var defs = {
		selector: '.js-typer',
		sample: {
			sv: 'Det kom en visshet över honom, medan han stod där, att han hade idel fiender i kyrkan, fiender i alla bänkar. Bland herrskaperna på läktaren, bland bönderna nere i kyrkan, bland nattvardsbarnen i koret hade han fiender, idel fiender. Det var en fiende, som trampade orgeln, en fiende, som spelade den. I kyrkovärdarnas bänk hade han fiender. Alla hatade honom, alltifrån de små barnen, som hade burits in i kyrkan, ända till kyrkvaktaren, en stel och styv soldat, som hade varit med vid Leipzig. ',
			en: 'English',
			fr: 'French',
		}
	};


	/**
	 * Initiate plugin

	 * @method init
	 * @param {Object} options - override default settings
	**/
	var init = function ( options ) {
		if( options ) {
			for( var o in options ) {
				defs[ o ] = options[ o ];
			}
		}

		instances = [];
		var items = document.querySelectorAll( defs.selector );
		var len = items.length;

		if ( len > 0 ) {
			for ( var i = 0; i < len; i++ ) {
				instances.push( new Typer( items[ i ] ) );
			}
			// window.addEventListener( 'resize', measureWinSize );
		}
	};


	/**
	* @constructor Typer
	* @param {HTMLElement} elem - DOM Element
	*/
	var Typer = function ( elem ) {
		if ( ! ( this instanceof Typer ) ) {
			return new Typer( elem );
		}

		var t = this;
		t.elem = elem;
		t.elemText = t.elem.querySelector( '.Typer-text' );
		t.customText = '';
		t.settings = t.elem.querySelectorAll( '[data-typer-prop]' );

	

		

		t.updateText = t.updateText.bind( t );
		t.updateStyle = t.updateStyle.bind( t );
		t.paste = t.paste.bind( t );
		t.change = t.change.bind( t );
		

		for ( var i = 0, len = t.settings.length; i < len; i++ ) {
			t.settings[ i ].addEventListener( 'input', t.change );
		}

		t.elemText.addEventListener( 'paste', t.paste );

		t.addChildClass( defs.classOutView );
	};


	Typer.prototype = {

		/**
		 * Just pasting clean text, no HTML.

		 * @method paste
		 * @param evt {Object} Event
		**/
		paste: function ( evt ) {
			var t = this;
			var c = t.customText;

			if ( evt.clipboardData || evt.originalEvent.clipboardData ) {
				c = ( evt.originalEvent || evt ).clipboardData.getData( 'text/plain' );
			} else if ( window.clipboardData ) {
				c = window.clipboardData.getData( 'Text' );
			}

		  t.updateText( c );
  		evt.preventDefault();
		},

		/**
		 * Change styles of content of text element.

		 * @method change
		 * @param evt {Object} Event
		**/
		change: function ( evt ) {
			if ( evt ) {
				var t = this;
				var prop = evt.target.getAttribute( 'data-typer-prop' );
				var val = evt.target.value;
				
				if ( prop === 'content' ) {
					t.updateText( defs.sample[ val ] );
				} else if ( prop === 'font-size' ) {
					t.updateStyle( prop, val + 'px' );
				} else {
					t.updateStyle( prop, val );
				}
			}
		},

		/**
		 * Set as innerText in element.

		 * @method updateText
		 * @param txt { String } 
		**/
		updateText: function ( txt ) {
			var t = this;
			try {
				t.elemText.innerText = txt;	
			} catch ( err ) {
				alert( err.name + ' ' + err.message );
			}
		}, 

		/**
		 * With property from data-typer-prop, update and 
		 * set styles for text element.

		 * @method updateText
		 * @param prop { String } Correct CSS property, not javascript
		 * @param val { String } Correct CSS value
		**/
		updateStyle: function ( prop, val ) {
			var t = this;
			try {
				t.elemText.style[ prop ] = val;
			} catch ( err ) {
				alert( err.name + ' ' + err.message );
			}
		},

	};


	/**
	 * @method scrollHandler
	**/
	var scrollHandler = function () {
		
	};


	return {
		init: init,
	};

} ( window, document ) );
