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


	return {
		hasClass: hasClass,
		addClass: addClass,
		evtAnimEnd: evtAnimEnd,
		removeClass: removeClass,
		parentUntilClass: parentUntilClass,
		css: css,
	};

}( window, document ));
