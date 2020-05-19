/** @namespace merl */
var merl = merl || {};
/**
 * A collection of utility functions.
 *
 * @author Andreas Nymark <andreas@nymark.me>
 * @namespace utils
 * @memberof merl
 * @license MIT
 */
merl.utils = ( function ( window, document ) {
	"use strict";
	
	/**
	 * Check if element already contains class
	 * @memberof merl.utils
	 * @param {object} elem - DOM Element
	 * @param {string} cls - Class name
	 * @param {boolean} forceOld - In some cases we need to force old style, even if classlist is supported. E.g. IE and SVG.
	 * @return {boolean} bool
	 */
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
		* @memberof merl.utils
	 * @param {object} elem - DOM Element
	 * @param {string} cls - Class name
	 * @param {boolean} forceOld - In some cases we need to force old style, even if classlist is supported. E.g. IE and SVG.
	 */
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
	 * @memberof merl.utils
	 * @param {object} elem - DOM Element
	 * @param {string} cls - Class name
	 * @param {boolean} forceOld - In some cases we need to force old style, even if classlist is ”supported”. E.g. IE and SVG.
	 */
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
	 * Traverse DOM upwards until class name
	 * @memberof merl.utils
	 * @param {object} elem - Element to start from
	 * @param {string} cls - Class name where to stop
	 * @return {object} elem
	 */
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
	 * @memberof merl.utils
	 * @return {string} anims - supported event.
	 */
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
	 * @memberof merl.utils
	 * @param {object} elem - DOM Element
	 * @param {object} styles - Styles passed as object
	 */
	var css = function ( elem, styles ) {
		for ( var prop in styles ) {
			elem.style[ prop ] = styles[ prop ];
		}
	};

	/**
	 * Replace element with another, keeping all attributes
	 * @memberof merl.utils
	 * @param {object} elem - DOM Element
	 * @param {string} newTag - name of new tag
	 * @return {object}
	 */
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
	 * @memberof merl.utils
	 * @param {object} elem - DOM Element
	 * @param {Array} attr - attr: value pair
	 */
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
	 * @memberof merl.utils
	 * @param {object} elem - Element to get siblings from
	 * @return {Array}
	 */
	var getSiblings = function ( elem ) {
		var siblings = [];
		var child = elem.parentNode.firstChild;

		do {
			if ( child.nodeType === 1 && child != elem ) siblings.push( child );
		} while ( child = child.nextSibling );

		return ( siblings.length > 0 ) ? siblings : null;
	};


	/**
	 * Returns random value from object
	 * @memberof merl.utils
	 * @param {object} obj - list of values to randomize.
	 * @return {string} value
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
	 * @memberof merl.utils
	 * @param {object} obj - class name to add on body
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

	/**
	 * Execute a function via name. A bit unsure about this one …
	 * @memberof merl.utils
	 * @param {string} functionName - name of function to execute, including namespace.
	 * @param {object} context - name of function to execute, including namespace.
	 * @return {string} value
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
	
	/**
	 * Remove a value from an object, returning new object.
	 * @memberof merl.utils
	 * @param {object} obj - Object to remove value from
	 * @param {string} val - Value in above object to remove
	 * @return {object} new object
	 */
	var removeFromObj = function ( obj, val ) {
		if ( typeof val !== string ) val = string( val );
		var newObj = obj.filter( function( e ) { return e !== val } );
		return newObj;
	};
	
	/** 
	 * JavaScript function that checks to see whether an array contains a certain value.
	 * @memberof merl.utils
	 * @param {array} arr - The array you want to search.
	 * @param {string} searchFor - The value you want to search for.
	 * @returns {boolean} returns true if the value exists in the array
	 */
	function inArray( arr, searchFor ){
		if ( typeof arr.includes == 'undefined' ) {
			var arrLength = arr.length;
			for ( var i = 0; i < arrLength; i++ ) {
				if ( arr[ i ] === searchFor ) {
					return true;
				}
			}
			return false;
		}
		return arr.includes( searchFor );
	}

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
		rndObj: rndObj,
		removeFromObj: removeFromObj,
		setDeviceInputClass: setDeviceInputClass,
		inArray: inArray,
	};
}( window, document ));