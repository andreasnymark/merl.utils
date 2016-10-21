var merl = merl || {};

merl.utils = ( function ( window, document ) {
	"use strict";
	
	
	
	var hasClass = function ( elem, cls ) {
		var bool;
		if ( elem.classList ) {
			bool = elem.classList.contains( cls );
		} else {
			bool = new RegExp( '\\b' + cls + '\\b' ).test( elem.className );
		}
		return bool;
	};
	
	
	
	
	var addClass = function ( elem, cls ) {
		if ( elem.classList ) {
			elem.classList.add( cls );
		} else if ( !hasClass( elem, cls )) {
			elem.className += ' ' + cls;
		}
	};
	
	
	
	
	var removeClass = function ( elem, cls ) {
		if ( elem.classList ) {
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
