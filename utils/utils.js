var merl = merl || {};

merl.utils = ( function ( window, document ) {
	"use strict";


	/**
	 * Check if element already contains class
	 * @method hasClass
	 * @param {Object} elem - DOM Element
	 * @param {String} cls - Class name
	 * @param {Boolean} forceOld - In some cases we need to force old style, even if classlist is supported. E.g. IE and SVG.
	 * @return {Boolean} bool
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
	 * @method addClass
	 * @param {Object} elem - DOM Element
	 * @param {String} cls - Class name
	 * @param {Boolean} forceOld - In some cases we need to force old style, even if classlist is supported. E.g. IE and SVG.
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
	 * @method removeClass
	 * @param {Object} elem - DOM Element
	 * @param {String} cls - Class name
	 * @param {Boolean} forceOld - In some cases we need to force old style, even if classlist is supported. E.g. IE and SVG.
	 */
	var removeClass = function ( elem, cls, forceOld ) {
		forceOld = forceOld || false;
		if ( elem.classList && !forceOld ) {
			elem.classList.remove( cls );
		} else {
			var re = new RegExp( '\\b' + cls + '\\b', 'g' );
			elem.className.replace( re, '' );
		}
	};




	/*
	* Traverse DOM upwards until class
	*
	* @method parentUntilClass
	* @param elem {Object} Element to start from
	* @param cls {String} Class name where to stop
	* @return {Object} DOM object
	*/
	var parentUntilClass = function ( elem, cls ) {
		// if ( typeof elem === Object && typeof cls === String ) {
			while ( elem.parentNode ) {
				elem = elem.parentNode;
				if ( elem.nodeType === 1 && hasClass( elem, cls ) ) {
					return elem;
				}
			}
			return null;
		// }
	};




	return {
		hasClass: hasClass,
		addClass: addClass,
		removeClass: removeClass,
		parentUntilClass: parentUntilClass,
	};
}( window, document ));
