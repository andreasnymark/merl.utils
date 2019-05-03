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

		console.log( t.settings );

		

		t.updateText = t.updateText.bind( t );
		t.updateStyle = t.updateStyle.bind( t );
		t.paste = t.paste.bind( t );
		t.change = t.change.bind( t );
		

		for ( var i = 0, len = t.settings.length; i < len; i++ ) {
			t.settings[ i ].addEventListener( 'change', t.change );
		}


		t.addChildClass( defs.classOutView );
	};


	Typer.prototype = {



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



		updateText: function ( txt ) {
			var t = this;
			t.elemText.innerText = txt;
		}, 

		updateStyle: function ( prop, val ) {
			var t = this;
			try {
				t.elemText.style[ prop ] = val;
			} catch ( err ) {
				alert( err.name + " " + err.message );
			}
		},

		change: function ( evt ) {
			if ( evt ) {
				var prop = evt.target.getAttribute( 'data-typer-prop' );
				var val = evt.target.value;
				
				this.updateStyle( prop, val );
			}
			// console.log( 'Change!', evt.target, this.elem );
		},



		/**
		 * Add class to child element below the fold.

		 * @method addChildClass
		 * @param {String} cls - class name
		**/
		addChildClass: function ( cls ) {
			
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
