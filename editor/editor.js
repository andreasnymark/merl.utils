/**
 * Editor
 *
 * @author Andreas Nymark <andreas@nymark.me>
 * @license MIT
**/

var merl = merl || {};

merl.editor = ( function ( window, document ) {
	"use strict";

	var ls = localStorage,
		defs = {
			selectEditor: '.js-editor',
			selectTitle: '.js-title',
			editor: 'merl.editor',
			title: 'merl.title',
		};


	/**
	 * Initiate plugin
	 *
	 * @method init
	 * @param {Object} options - override default settings
	**/
	var init = function( options ) {
		if ( options ) {
			for ( var o in options ) {
				defs[ o ] = options[ o ];
			}
		}

		var e = document.querySelector( defs.selectEditor ),
		    t = document.querySelector( defs.selectTitle );

		if ( e ) {
    		e.value = ls.getItem( defs.editor );
    		e.addEventListener( 'input', function () {
    			ls.setItem( defs.editor, this.value );
    		} );
        }

		if ( t ) {
			t.value = ls.getItem( defs.title );
			t.addEventListener( 'input', function () {
				ls.setItem( defs.title, this.value );
			} );
		}
	};



	return {
		init: init,
	};

}( window, document ));
