/**
 * A collection of utility functions.
 *
 * @author Andreas Nymark <andreas@nymark.me>
 * @license MIT
**/

var merl = merl || {};

merl.utils = ( function ( window, document ) {
	"use strict";


	/**
	 * Check if element already contains class
	 * @method hasClass
	 * @param {HTMLElement} elem - DOM Element
	 * @param {String} cls - Class name
	 * @param {Boolean} forceOld - In some cases we need to force old style, even if classlist is supported. E.g. IE and SVG.
	 * @return {Boolean} bool
	**/
	var hasClass = function ( elem, cls, forceOld ) {
		var bool;
		forceOld = forceOld || false;

		if ( elem.classList && !forceOld ) {
			bool = elem.classList.contains( cls );
		} else {
			bool = new RegExp( '\\b' + cls + '\\b' ).test( elem.className );
		}
		return bool;
	};


	/**
	 * Add class to element
	 * @method addClass
	 * @param {HTMLElement} elem - DOM Element
	 * @param {String} cls - Class name
	 * @param {Boolean} forceOld - In some cases we need to force old style, even if classlist is supported. E.g. IE and SVG.
	**/
	var addClass = function ( elem, cls, forceOld ) {
		forceOld = forceOld || false;
		if ( elem.classList && !forceOld ) {
			elem.classList.add( cls );
		} else if ( !hasClass( elem, cls, forceOld )) {
			elem.className += ' ' + cls;
		}
	};


	/**
	 * Remove class from element
	 * @method removeClass
	 * @param {HTMLElement} elem - DOM Element
	 * @param {String} cls - Class name
	 * @param {Boolean} forceOld - In some cases we need to force old style, even if classlist is ”supported”. E.g. IE and SVG.
	**/
	var removeClass = function ( elem, cls, forceOld ) {
		forceOld = forceOld || false;
		if ( elem.classList && !forceOld ) {
			elem.classList.remove( cls );
		} else {
			var reg = new RegExp( '\\b' + cls + '\\b', 'g' );
			elem.className.replace( reg, '' );
		}
	};


	/**
	 * Traverse DOM upwards until class
	 * @method parentUntilClass
	 * @param {HTMLElement} elem - Element to start from
	 * @param {String} cls - Class name where to stop
	 * @return {HTMLElement} elem
	**/
	var parentUntilClass = function ( elem, cls ) {
		if ( /^(\.|#)/.test( cls ) ) cls = cls.substr( 1 );

		while ( elem.parentNode ) {
			elem = elem.parentNode;
			if ( elem.nodeType === 1 && hasClass( elem, cls ) ) {
				return elem;
			}
		}
		return null;
	};


	/**
	 * Return supported event for animationend.
	 * @method evtAnimEnd
	 * @return {String} anims - supported event.
	**/
	var evtAnimEnd = function () {
  		var elem = document.createElement( 'div' ),
			anims = {
				'animation': 'animationend',
				'OAnimation': 'oAnimationEnd',
				'MSAnimation': 'MSAnimationEnd',
				'MozAnimation': 'animationend',
				'WebkitAnimation': 'webkitAnimationEnd',
			};

		for ( var anim in anims ) {
			if ( elem.style[ anim ] !== undefined ) {
				return anims[ anim ];
			}
		}
	};


	/**
	 * Add styles to element
	 * @method css
	 * @param {HTMLElement} elem - DOM Element
	 * @param {Object} styles - Styles passed as object
	**/
	var css = function ( elem, styles ) {
		for ( var prop in styles ) {
			elem.style[ prop ] = styles[ prop ];
		}
	};


	/**
	 * Replace element with another, keeping all attributes
	 *
	 * @method changeElement
	 * @param elem {HTMLElement} - DOM Element
	 * @param newTag {String} - name of new tag
	 * @return {Object}
	**/
	var changeElement = function( elem, newTag ) {
		newTag = typeof newTag !== 'undefined' ? newTag : 'div';
		if ( elem ) {
			var elemNew = document.createElement( newTag );
			var attr = elem.attributes;
			var value = elem.innerHTML;

			for ( var i = 0, len = attr.length; i < len; i++ ) {
				elemNew.setAttribute( attr[ i ].nodeName, attr[ i ].nodeValue );
			}
			elemNew.innerHTML = value;
			return elemNew;
		}
	};


	/**
	 * Add attributes
	 *
	 * @method addAttr
	 * @param elem {HTMLElement} - DOM Element
	 * @param attr {Array} - attr: value pair
	**/
	var addAttr = function( elem, attrs ) {
		if ( elem && attr instanceof Array ) {
			for ( var i = 0, len = attr.length; i < len; i++ ) {
				elemNew.setAttribute( attr[ i ].nodeName, attr[ i ].nodeValue );
			}
			elemNew.innerHTML = value;
			return elemNew;
		}
	};



	/**
	 * Get sibling elements, excluding the element
	 *
	 * @method getSiblings
	 * @param elem {Object} Element to get siblings from
	 * @return {Array}
	**/
	var getSiblings = function ( elem ) {
		var siblings = [];
		var child = elem.parentNode.firstChild;

		do {
			if ( child.nodeType === 1 && child != elem ) siblings.push( child );
		} while ( child = child.nextSibling );

		return ( siblings.length > 0 ) ? siblings : null;
	};




	/**
	 * Returns random value from Object
	 * @method rndObj
	 * @param {Object} obj - list of values to randomize.
	 * @return {String} value
	 */
	var rndObj = function ( obj ) {
		if ( typeof obj === 'object' ) {
			var rnd = Math.floor( Math.random() * obj.length );
			return obj[ rnd ];
		}
	};



	/**
	 * Toggle class on body element based on what kind of 
	 * input device the user is using. 
	 * @method setDeviceInputClass
	 * @param obj {Object} - class name to add on body
	 */
	var setDeviceInputClass = function ( obj ) {
		if ( typeof obj === 'object' ) {
			var doc = document.body;
			if ( 'touch' in obj ) {
				window.addEventListener( 'touchdown', function ( evt ) {
					merl.utils.removeClass( doc, obj[ 'mouse' ] );
					merl.utils.addClass( doc, obj[ 'touch' ] );
				} );
			}
			if ( 'mouse' in obj ) {
				window.addEventListener( 'mousedown', function ( evt ) {
					merl.utils.removeClass( doc, obj[ 'touch' ] );
					merl.utils.addClass( doc, obj[ 'mouse' ] );
				} );
			}	
			window.addEventListener( 'keydown', function ( evt ) {
				merl.utils.removeClass( doc, obj[ 'touch' ] );
				merl.utils.removeClass( doc, obj[ 'mouse' ] );
			} );
		}
	};




	// https://stackoverflow.com/questions/359788/how-to-execute-a-javascript-function-when-i-have-its-name-as-a-string
	/**
	 * Returns random value from Object
	 * @method rndObj
	 * @param {Object} obj - list of values to randomize.
	 * @return {String} value
	 */
	var executeFunctionByName = function ( functionName, context /*, args */) {
		var args = Array.prototype.slice.call( arguments, 2 ),
			ns = functionName.split( '.' ),
			func = ns.pop();

		for ( var i = 0, len = ns.length; i < len; i++ ) {
			context = context[ ns[ i ] ];
		}

		return context[ func ].apply( context, args );
	};




	return {
		parentUntilClass: parentUntilClass,
		changeElement: changeElement,
		getSiblings: getSiblings,
		removeClass: removeClass,
		evtAnimEnd: evtAnimEnd,
		hasClass: hasClass,
		addClass: addClass,
		css: css,
		addAttr: addAttr,
		setDeviceInputClass: setDeviceInputClass,
	};

}( window, document ));
