// init
// measue viewport
// measure image
// crop the v








/**
 * Scrollax
 *
 * @author Andreas Nymark <andreas@nymark.me>
 * @license MIT
 * @version 1
**/
var merl = merl || {};

merl.scrollax = ( function ( window, document ) {
	"use strict";


	var isScrolling = false,
		instances = [],
		interval = null,
		winSize,
		defs = {
			selector: '.js-scrollax',
			offset: 150,
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
		clearInterval( interval );
		measureWinSize();

		if ( len > 0 /*&& winSize.width > defs.minWidth*/ ) {
			for ( var i = 0; i < len; i++ ) {
				instances.push( new scrollax( items[ i ] ) );
			}
			// window.addEventListener( 'scroll', scrollHandler );
			// window.addEventListener( 'resize', measureWinSize );
			interval = setInterval( scrollHandler, 35 );
		}
	};


	/**
	* @constructor scrollToggle
	* @param {HTMLElement} elem - DOM Element
	*/
	var scrollax = function ( elem ) {
		var t = this;
		//t.timer = setTimeout();
		t.root = elem;
		t.blocks = t.root.querySelectorAll( defs.selectBlock );
		//t.addChildClass( defs.classOutView );
		t.image = t.root.querySelector( 'img, picture' );
		t.evLis = t.image.addEventListener( 'load', t.imgLoaded );
		t.timer = setInterval( t.nHeight.bind( t ), 20 );
	};


	scrollax.prototype = {



		imgLoaded: function () {
			console.log( 'imgLoaded', this, this.height );
		},
		nHeight: function () {
			console.log( 'nHeight' );
			var t = this;
			if ( t.image.naturalHeight > 0 ) {
				clearInterval( t.timer );
				t.root.style.height = ( t.image.naturalHeight - defs.offset ) + 'px';
				t.root.style.overflow = 'hidden';
			}
		},


		/**
		 * Event triggered when scrolling. Toggles class on child element when
		 * out of browser view.
		 * @method scrollEvent
		**/
		scrollEvent: function () {
			var t = this;
			
				var rect = t.root.getBoundingClientRect();

				if ( rect.bottom > 0 && rect.top < winSize.height ) {
					// console.log( 'inView', rect.top, winSize.height );
					
					// var height = winSize.height + 570; // need to calc

					// console.log( 'Height: ' + height );
					// console.log( (height - rect.top)/height, Math.abs( rect.top ) );

					// using negative




					//console.log(  -( height - rect.top ) /-570 );
					



					var height = Math.floor( ( ( rect.top - -570 ) * defs.offset ) / ( winSize.height - -570 ) );

					// or (move relative/top)
					// t.image.style.position = 'relative';
					// t.image.style.top = '-'+ defs.offset +'px';
					// t.image.style.transform = 'translatey('+ height +'px)';

					// or 
					t.image.style.transform = 'translatey(-'+ height +'px)';




					// Working 
					// ((input - min) * 100) / (max - min)



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


	/**
	 * @method measureWinSize
	**/
	var measureWinSize = function () {
		winSize = setWinSize();
	};


	/**
	 * @method setWinSize
	 * @return {Object}
	**/
	var setWinSize = function () {
		return {
			height: ( window.innerHeight || document.documentElement.clientHeight ),
			width: ( window.innerWidth || document.documentElement.clientWidth ),
		};
	};



	return {
		init: init,
	};
}( window, document ));
