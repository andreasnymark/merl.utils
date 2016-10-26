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




	/**
	 * Traverse DOM upwards until class
	 *
	 * @method parentUntilClass
	 * @param {HTMLElement} elem - Element to start from
	 * @param {String} cls - Class name where to stop
	 * @return {HTMLElement} elem
	**/
	var parentUntilClass = function ( elem, cls ) {
		if ( /^(\.|#)/.test( cls ) ) cls = cls.substr( 1 );

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





	var CustomEvent = function ( event, params ) {
		params = params || { bubbles: false, cancelable: false, detail: undefined };
		var evt = document.createEvent( 'CustomEvent' );
		evt.initCustomEvent( event, params.bubbles, params.cancelable, params.detail );
		return evt;
	};








	var init = function () {
		if ( typeof window.CustomEvent !== "function" ) {
			CustomEvent.prototype = window.Event.prototype;
			window.CustomEvent = CustomEvent;
		}
	};




	return {
		hasClass: hasClass,
		addClass: addClass,
		removeClass: removeClass,
		parentUntilClass: parentUntilClass,
		init: init,
	};
}( window, document ));
