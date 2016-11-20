/**
 * Toggle class on element out of browser view, while scrolling.
 *
 * @author Andreas Nymark <andreas@nymark.me>
 * @license MIT
 * @version 1
**/
var merl = merl || {};

merl.scrollToggleClass = ( function ( window, document ) {
	"use strict";

	var isScrolling = false,
		instances = [],
		winSize,
        defs = {
            selector: '.js-stc',
			selectBlock: '.block',
			classInView: 'is-inView',
			classOutView: 'is-outOfView',
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

		if ( len > 0 ) {
			measureWinSize();

			for ( var i = 0; i < len; i++ ) {
				instances.push( new STC( items[ i ] ) );
			}
			window.addEventListener( 'scroll', scrollHandler );
			window.addEventListener( 'resize', measureWinSize );
		}
	};


    /**
	* @constructor STC
	* @param {HTMLElement} elem - DOM Element
	*/
	var STC = function ( elem ) {
        var t = this;
		t.root = elem;
		t.blocks = t.root.querySelectorAll( defs.selectBlock );
		t.addChildClass( defs.classOutView );
    };


	STC.prototype = {

        /**
		 * Add class to child element below the fold.
		 * @method addChildClass
         * @param {String} cls - class name
		**/
		addChildClass: function ( cls ) {
			var t = this;
			for ( var i = 0; i < t.blocks.length; i++ ) {
				var block = t.blocks[ i ],
					rect = block.getBoundingClientRect();

				if ( rect.top > winSize.height ) {
					block.classList.add( cls );
				}
			}
		},


        /**
		 * Event triggered when scrolling. Toggles class on child element when
         * out of browser view. Add "&& rect.bottom > 0" if yo need to toggle
         * class above window view.
		 * @method scrollEvent
		**/
		scrollEvent: function () {
			var t = this;
	        for ( var i = 0; i < t.blocks.length; i++ ) {
	            var block = t.blocks[ i ],
	            	rect = block.getBoundingClientRect();

	            if ( /* rect.bottom > 0 && */ rect.top < winSize.height ) {
	    			block.classList.add( defs.classInView );
	                block.classList.remove( defs.classOutView );
	    		} else {
	    			block.classList.remove( defs.classInView );
	                block.classList.add( defs.classOutView );
	    		}
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
		for ( var i = 0; i < instances.length; i++ ) {
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
		};
	};


	return {
		init: init,
	};
}( window, document ));
