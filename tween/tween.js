/**
 * A first attepmt to create tween
 *
 * @author Andreas Nymark <andreas@nymark.me>
 * @license MIT
 * @version 1
**/
var merl = merl || {};

merl.tween = ( function ( window, document ) {
	"use strict";

	var isAnimating = false,
		defs = {
			/* defaults */
		};


	/**
	 * Initiate plugin
	 * @method init
	 * @param {Object} options - override default settings
	**/
	var init = function ( options ) {
		if ( options ) {
			for ( var o in options ) {
				defs[ o ] = options[ o ];
			}
		}
	};



	/**
	* @constructor Tween
	* @param {HTMLElement} elem - DOM Element
	*/
	var Tween = function ( elem ) {
		var t = this;
	};


	Tween.prototype = {

		/**
		 * Add class to child element below the fold.
		 * @method addChildClass
		 * @param {String} cls - class name
		**/
		move: function ( x, y ) {
			/*  */
		},
	};



	/* ·--––——————————————————————————————————––--· */



	/**
	 *
	 * @method animate
	**/
	var animate = function () {
		if ( !isAnimating ) {
			window.requestAnimationFrame( animateEvent );
		}
		isAnimating = true;
	};


	/**
	 * @method animateEvent
	**/
	var animateEvent = function () {
		for ( var i = 0, len = instances.length; i < len; i++ ) {
			instances[ i ].move();
		}
		isAnimating = false;
	};
} );
