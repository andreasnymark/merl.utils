/**
 * wordWrapper.js
 *
 * WordWrapper is a tiny javascript wrapping each word in an element.
 * Class/style can be added to each new wrapper. Existing elements
 * will be kept as is — like <strong> — and class/style will be added.
 * Since
 *
 * @author Andreas Nymark <andreas@nymark.me>
 * @license MIT
 *
**/
var merl = merl || {};

merl.wordWrapper = ( function ( window, document ) {
	"use strict";


	var instances = [], 
		defs = {
			selector: '.js-wordWrapper',
			delay: 100, // adds styles for animation-delay
			initDelay: 500, 
			wrapElem: 'span',
			wrapClass: '',
			wrapStyle: '',
			attrData: 'data-wordWrapper',
		},
		eventEnd = document.createEvent( 'Event' ),
		eventAnimEnd = merl.utils.evtAnimEnd();

	eventEnd.initEvent( 'merl.wordWrapper.end', true, true );

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
		t.wrapElem = defs.wrapElem;
		t.children = new Array();
		t.wrapClass = defs.wrapClass;
		t.wrapStyle = defs.wrapStyle;


		if ( data ) {
			var d = JSON.parse( data );
			if( d.delay ) t.delay = d.delay;
			if( d.wrapElem ) t.wrapElem = d.wrapElem;
			if( d.wrapClass ) t.wrapClass = d.wrapClass;
			if( d.wrapStyle ) t.wrapStyle = d.wrapStyle;
		}

		t.wrapWords();
	};


	Wordwrapper.prototype = {

		/**
		 * @method wrapWords
		 */
		wrapWords: function () {
			var t = this;
			t.wrapTextInElem();
			if ( t.wrapClass !== '' ) t.addClass( t.elem.querySelectorAll( t.wrapElem ), t.wrapClass );
		},


		/**
		 * Wraps each word in an element.
		 *
		 * @method wrapTextInElement
		 * @param elem { Object } Element.
		 */
		wrapTextInElem: function ( elem ) {
			var t = this,
				re, 
				word,
				arr = t.text.split( / |\u00A0/ ),
				obj = removeDuplicates( arr );

			for ( var key in obj ) {
				word = obj[ key ].replace( /(\r\n|\n|\r)/gm, '' );
				re = new RegExp( '(^|\\b)' + word + '($|\\s|\\?)', 'gm' ); // http://www.regular-expressions.info/anchors.html
				t.content = t.content.replace( re, '<' + t.wrapElem + '>' + '\$&' + '</' + t.wrapElem + '>\n\r' );
			}
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
			if ( t.wrapClass ) t.addClass( t.children, t.wrapClass );

			t.addEvent( t.children );
		},


		/**
		 * Finds all wrapper elements and adds a class to each.
		 *
		 * @method addClass
		 * @param wrapElems { Object } List of elements
		 * @param wrapClass { String } Class added
		 */
		addClass: function ( elems, cls ) {
			for ( var i = 0, len = elems.length; i < len; i++ ) {
				elems[ i ].classList.add( cls );
			}
		},


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
					currStyles = elem.getAttribute( 'style' ) || '';

				elem.setAttribute( 'style', currStyles + wrapStyle );
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
					currStyles = elem.getAttribute( 'style' ) || '';

				if ( defs.delay > 0 ) {
					var d = parseInt( defs.initDelay + ( i * delay ) );
					elem.setAttribute( 'style', 'animation-delay: ' + d + 'ms;' );
				}
			}
		},
	};


	/**
	 * Removes duplicates in an array.
	 *
	 * @method removeDuplicates
	 * @param a { Array } Array of words.
	 * @return { Array }
	 */
	var removeDuplicates = function ( arr ) {
		var obj = {};
		for ( var i = 0; i < arr.length; i++ ) {
			obj[ arr[ i ]] = true;
		}
		arr = [];
		for ( var key in obj ) {
			arr.push( key );
		}
		return arr;
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
