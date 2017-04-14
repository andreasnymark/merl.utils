/**
 * Animation on canvas
 *
 * @author Andreas Nymark <andreas@nymark.me>
 * @license MIT
 * @version 1
**/
var merl = merl || {};

merl.canvasanima = ( function ( window, document ) {
	"use strict";

	var isAnimating = false,
		instances = [],
		viewWidth = 0,
		viewHeight = 0,
		docWidth = 0,
		docHeight = 0,
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

		/*  Constructs objects */
		/* instances.push() */
	};






	/**
	* Canvas animation. Clea
	* @constructor CA
	* @param {HTMLElement} ctx - DOM Element
	*/
	var Circ = function ( ctx ) {
		var t = this;

		/* t.content = ctx; */
		t.start = Date.now(); // milliseconds
		t.width = width;
		t.height = width;
		/* elapsed in 0.0->1.0 value */
		/* elap = ( Date.now() - start ) / duration; */

		/* http://www.williammalone.com/articles/create-html5-canvas-javascript-sprite-animation/ */
	};

	Circ.prototype = {
		move: function () {
			/* if ( start ) set start stamp */
			/* if ( ongoing ) draw canvas  */
			/* if ( end )  */

		},

		render: function () {
			/* draw all the stuff? */
			// Clear the canvas
  		  	this.context.clearRect( 0, 0, defs.docWidth, defs.docHeight );

  		  	// Draw the animation
		},
	};




	/* ·--––——————————————————————————————————––--· */



	/**
	* Canvas animation. Clea
	* @constructor CA
	* @param {HTMLElement} ctx - DOM Element
	*/
	var Rect = function ( ctx ) {
		var t = this;

		/* t.content = ctx; */
		t.start = Date.now(); // milliseconds
		t.width = width;
		t.height = width;
		/* elapsed in 0.0->1.0 value */
		/* elap = ( Date.now() - start ) / duration; */

		/* http://www.williammalone.com/articles/create-html5-canvas-javascript-sprite-animation/ */
	};

	Rect.prototype = {
		move: function () {
			/* if ( start ) set start stamp */
			/* if ( ongoing ) draw canvas  */
			/* if ( end )  */

		},

		render: function () {
			/* draw all the stuff? */
			// Clear the canvas
  		  	this.context.clearRect( 0, 0, defs.docWidth, defs.docHeight );

  		  	// Draw the animation
		},
	};



	/* ·--––——————————————————————————————————––--· */





	/**
	 *
	 * @method animate
	**/
	var animate = function () {
		if ( !isAnimating ) {
			// update and render at the same rate that the browser repaints.
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





	/* ·--––——————————————————————————————————––--· */




	/**
	 * @method easeOut

 t = 0.5 (halfway through the tween, so 0.5 of 1 second)
b = 50 (the beginning value of the property being tweened)
c = 150 (the change in value – so the destination value of 200 minus the start value of 50 equals 150)
d = 1 (total duration of 1 second)
	**/
	var easeOut = function ( tim, beg, cha, dur ) {

		/* http://upshots.org/actionscript/jsas-understanding-easing */
		/* http://mattshaw.org/projects/simple-javascript-tweening/ */
		/* https://github.com/gre/bezier-easing */
		/* return */
	};
} );
