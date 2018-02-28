/**
 * 
 *
 * @author Andreas Nymark <andreas@nymark.me>
 * @license MIT
 * @version 1
**/
var merl = merl || {};

merl.scrollFade = ( function ( window, document ) {
	"use strict";


	var isScrolling = false,
		instances = [],
		doc = document.documentElement,
		defs = {
			selector: '.js-title',
			offset: 200,




			selectBlock: '.block',
			classInView: 'is-inView',
			classOutView: 'is-outOfView',
			toggleAbove: false,
			minWidth: 600,
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

		var items = document.querySelectorAll( defs.selector ),
			len = items.length;

		
		instances = [];

		if ( len > 0 ) {
			for ( var i = 0; i < len; i++ ) {
				instances.push( new scrollFade( items[ i ] ) );
			}
			window.addEventListener( 'scroll', scrollHandler );
		}
	};


	/**
	 * @constructor scrollToggle
	 * @param {HTMLElement} elem - DOM Element
	**/
	var scrollFade = function ( elem ) {
		var t = this;
		t.root = elem;
	};


	scrollFade.prototype = {





		/**
		 * Event triggered when scrolling. Toggles class on child element when
		 * out of browser view.
		 * @method scrollEvent
		**/
		scrollEvent: function () {
			var t = this;


			
			
			var top = ( window.pageYOffset || doc.scrollTop ) - ( doc.clientTop || 0 );

			if ( top < defs.offset ) {
				var tmp = Number( 1 - ( top / defs.offset ) );

				console.log( 'scrollEvent!', top, tmp, t.root );
				t.root.style.opacity = tmp;

			}

			if ( top > defs.offset ) {
				console.log( 'more than defs.offset' );
				t.root.style.opacity = 0;
			}
			
			

			isScrolling = false;
		},
	};


	/**
	 * Keeps isScrolling true.
	 * @method scrollHandler
	**/
	var scrollHandler = function () {
		if ( !isScrolling ) {
			window.requestAnimationFrame( scrollEvent );
		}
		isScrolling = true;
	};


	/**
	 * @method scrollEvent
	**/
	var scrollEvent = function () {
		for ( var i = 0, len = instances.length; i < len; i++ ) {
			instances[ i ].scrollEvent();
		}
		isScrolling = false;
	};


	


	return {
		init: init,
	};
}( window, document ));
