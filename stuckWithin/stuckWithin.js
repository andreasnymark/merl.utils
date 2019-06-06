/**
 * 
 *
 * @author Andreas Nymark <andreas@nymark.me>
 * @license MIT
 * @version 1
**/
var merl = merl || {};

merl.stuckWithin = ( function ( window, document ) {
	"use strict";

	var defs = {
		selector: '.parent',
		selectSticky: '.js-stuckWithinSticky',
		selectDummy: '.js-stuckWithinDummy',
		classStuck: 'is-stuck',
		minWidth: 600,
	};

	var isScrolling = false;
	var instances = [];
	var doc = document.documentElement;

	var intObsSupp = ( 'IntersectionObserver' in window ) ? true : false;
	var stickySupp = CSS.supports( 'position', 'sticky' ) || CSS.supports( 'position', '-webkit-sticky' ) || false;
	var passSupp = false;
	try {
		var opts = {
			get passive() {
				passSupp = true;
			}
		};
		window.addEventListener( 'test', opts, opts );
		window.removeEventListener( 'test', opts, opts );
	} catch( err ) {
		passSupp = false;
	}

	var intObsListener = null; 
	var intObsOptions = {
		rootMargin: '0px',
		threshold: 0
	}



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

		var items = document.querySelectorAll( defs.selector );
		var len = items.length;
	
		instances = [];

		if ( len > 0 && stickySupp && intObsSupp ) {
			for ( var i = 0; i < len; i++ ) {
				instances.push( new StuckWithin( items[ i ] ) );
			}
		}
	};


	/**
	 * @constructor scrollToggle
	 * @param {HTMLElement} elem - DOM Element
	**/
	var StuckWithin = function ( elem ) {
		var t = this;
		t.elem = elem;
		t.elemSticky = t.elem.querySelector( defs.selectSticky );
		t.elemDummy = t.elem.querySelector( defs.selectDummy );

		t.bodyRect = document.documentElement.getBoundingClientRect();
		t.elemStickyRect = t.elemSticky.getBoundingClientRect();
		t.offset = t.elemStickyRect.top - t.bodyRect.top;

		t.hover = false; 
		t.minHeight = null; 
		t.maxHeight = t.elemSticky.offsetHeight;
		
		t.scrollHandler = t.scrollHandler.bind( t );
		t.scrollEvent = t.scrollEvent.bind( t );
		t.mouseEnter = t.mouseEnter.bind( t );
		t.mouseLeave = t.mouseLeave.bind( t );
		t.maxDummy = t.maxDummy.bind( t );
		t.minDummy = t.minDummy.bind( t );

		t.observer = new IntersectionObserver( function ( entries ) {
			entries.forEach( function( entry ) {
				if ( entry.isIntersecting ) {
					window.addEventListener( 'scroll', t.scrollHandler, passSupp ? { passive: true } : false );
				} else {
					window.removeEventListener( 'scroll', t.scrollHandler );
				}
			});
		}, intObsOptions );
		t.observer.observe( t.elem );

		t.elemSticky.addEventListener( 'mouseenter', t.mouseEnter, passSupp ? { passive: true } : false );
		t.elemSticky.addEventListener( 'mouseleave', t.mouseLeave, passSupp ? { passive: true } : false );
	};


	StuckWithin.prototype = {

		/**
		 * Event triggered when scrolling. Toggles class on child element when
		 * out of browser view.
		 * @method scrollEvent
		**/
		scrollEvent: function () {
			var t = this;
			var top = ( window.pageYOffset || doc.scrollTop ) - ( doc.clientTop || 0 );
			if ( top >= ( t.offset + t.maxHeight ) ) {
				t.elemSticky.classList.add( defs.classStuck );
				if ( ! t.hover ) t.maxDummy();
			} else {
				t.elemSticky.classList.remove( defs.classStuck );
				if ( ! t.hover ) t.minDummy();
			}
			isScrolling = false;
		},


		/**
		 * Handle the scroll event
		 * @method scrollHandler
		**/
		scrollHandler: function () {
			if ( ! isScrolling ) {
				window.requestAnimationFrame( this.scrollEvent );
			}
			isScrolling = true;
		},


		/**
		 * When element is stuck, measure and set correct height on dummy.
		 * @method maxDummy
		**/
		maxDummy: function () {
			var t = this;
			if ( t.elemSticky.classList.contains( defs.classStuck ) ) {
				if ( ! t.minHeight ) t.minHeight = t.elemSticky.offsetHeight;
				t.elemDummy.style[ 'height' ] = Number( t.maxHeight - t.minHeight ) + 'px';
			}
		},


		/**
		 * When element is un-stuck, set to 0
		 * @method minDummy
		**/
		minDummy: function () {
			this.elemDummy.style[ 'height' ] = '0px';
		},


		/**
		 * Hover stuck element, set size on dummy element
		 * @method mouseEnter
		**/
		mouseEnter: function ( evt ) {
			var t = this;
			t.hover = true;
			if ( ! isScrolling ) t.minDummy();
		},


		/**
		 * Mouse leave stuck element, set size on dummy element
		 * @method mouseLeave
		**/
		mouseLeave: function ( evt ) {
			var t = this;
			t.hover = false;
			t.maxDummy();
		},
	};


	return {
		init: init,
	};
}( window, document ));
