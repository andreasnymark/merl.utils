/**
 * wordWrapper.js
 *
 * WordWrapper is a tiny javascript wrapping each word in an element.
 * Class/style can be added to each new wrapper. Existing elements
 * will be kept as is — like <strong> — and class/style will be added.
 *
 * @author Andreas Nymark <andreas@nymark.me>
 * @license MIT
 * @version 1
**/
var merl = merl || {};

merl.letterWrapper = ( function ( window, document ) {
	"use strict";


	var instances = [], 
		defs = {
			selector: '.js-letterWrapper',
			delay: 20, // adds styles for animation-delay
			initDelay: 100, 
			wrapStyle: '',
			attrData: 'data-letterWrapper',
		},
		eventEnd = document.createEvent( 'Event' ),
		eventAnimEnd = merl.utils.evtAnimEnd();

	eventEnd.initEvent( 'merl.letterWrapper.end', true, true );

	/**
	 *
	 * @constructor Wordwrap
	 * @param elem {Object}
	 */
	var Wordwrapper = function ( elem ) {
		var t = this,
			data = elem.getAttribute( defs.attrData );

		t.elem = elem;
		t.text = t.elem.innerText;
		t.delay = defs.delay;
		t.content = t.elem.innerHTML;
		t.children = new Array();
		t.wrapStyle = defs.wrapStyle;


		if ( data ) {
			var d = JSON.parse( data );
			if( d.delay ) t.delay = d.delay;
			if( d.wrapStyle ) t.wrapStyle = d.wrapStyle;
		}

		t.wrapLetters();
	};


	Wordwrapper.prototype = {

		/**
		 * @method wrapWords
		 */
		wrapLetters: function () {
			var t = this;
			var re = t.text.replace( /\S/gm, '<b><i>$&</i></b>' );
			t.content = re;
			t.updateContent();
		},


		/**
		 * Add content to markup. If class/style, set on each child element.
		 *
		 * @method updateContent
		 */
		updateContent: function () {
			var t = this;
			t.children = t.elem.children;

			t.elem.innerHTML = t.content;
			if ( t.delay ) t.setDelay( t.children, t.delay );
			if ( t.wrapStyle ) t.addStyle( t.children, t.wrapStyle );
			// if ( t.wrapClass ) t.addClass( t.children, t.wrapClass );

			t.addEvent( t.children );
		},


		/**
		 * Finds all wrapper elements and adds a class to each.
		 *
		 * @method addClass
		 * @param wrapElems { Object } List of elements
		 * @param wrapClass { String } Class added
		 */
		// addClass: function ( elems, cls ) {
		// 	for ( var i = 0, len = elems.length; i < len; i++ ) {
		// 		elems[ i ].classList.add( cls );
		// 	}
		// },


		/**
		 * Finds all wrapper elements and adds a style attribtue to each.
		 *
		 * @method addStyle
		 * @param wrapElems { Object } List of elements
		 * @param wrapStyle { String } Style added
		 */
		addStyle: function ( elems, wrapStyle ) {
			for ( var i = 0, len = elems.length; i < len; i++ ) {
				var elem = elems[ i ],
					currStyles = elem.firstChild.getAttribute( 'style' ) || '';

				if ( elem.firstChild ) {
					elem.firstChild.setAttribute( 'style', currStyles + wrapStyle );
				} else {
					elem.setAttribute( 'style', currStyles + wrapStyle );
				}
			}
		},

		/**
		 * Add animationend event to last element
		 *
		 * @method addEvent
		 * @param elems { Object } List of elements
		 */
		addEvent: function ( elems ) { 
			var t = this;

			for ( var i = 0, len = elems.length; i < len; i++ ) {
				var child = elems[ i ];
				if ( i === len - 1 ) {
					child.addEventListener( eventAnimEnd, dispEvent.bind( t ) );
				}
			}
		},


		/**
		 *
		 *
		 * @method setDelay
		 */
		setDelay: function ( elems, delay ) {
			var t = this;
			for ( var i = 0, len = elems.length; i < len; i++ ) {
				var elem = elems[ i ],
					currStyles = elem.firstChild.getAttribute( 'style' ) || '';

				if ( defs.delay > 0 ) {
					var d = parseInt( defs.initDelay + ( i * delay ) );
					elem.firstChild.setAttribute( 'style', 'animation-delay: ' + d + 'ms;' + currStyles );
				}
			}
		},
	};




	/**
	 * Dispatch event
	 *
	 * @method dispEvent
	 */
	var dispEvent = function () {
		this.elem.dispatchEvent( eventEnd );
	};


	/**
	 * Init
	 *
	 * @method init
	 * @param options {Object} Object
	 */
	var init = function ( options ) {
		if ( options ) {
			for ( var o in options ) {
				defaults[ o ] = options[ o ];
			}
		}

		var elems = document.querySelectorAll( defs.selector );

		if ( elems ) {
			instances = [];
			for ( var i = 0, len = elems.length; i < len; i++ ) {
				instances.push( new Wordwrapper( elems[ i ] ));
			}
		}

	};


	return {
		init: init,
	};


}( window, document ));
