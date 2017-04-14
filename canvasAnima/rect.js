/**
 * Animation on canvas
 *
 * @author Andreas Nymark <andreas@nymark.me>
 * @license MIT
 * @version 1
**/
var merl = merl || {};

merl.rect = ( function ( window, document ) {
	"use strict";

	var isAnimating = false,
		instances = [],
		viewWidth = 0,
		viewHeight = 0,
		docWidth = document.documentElement.clientWidth,
		docHeight = document.documentElement.offsetHeight,
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

		console.log( 'init!' );
		/*  Constructs objects */
		/* instances.push() */
		instances.push( new Rect( document.querySelector( 'canvas' ) ) );

		// instances[ 0 ].render();
		instances[ 0 ].update();


		setTimeout( function() {
			console.log( 'Kill requestAnimationFrame' );
			instances[ 0 ].kill();
		}, 1000 );


		// debugger;

	};





	/* ·--––——————————————————————————————————––--· */



	/**
	* Canvas animation. Clea
	* @constructor CA
	* @param {HTMLElement} ctx - DOM Element
	*/
	var Rect = function ( canvas ) {
		var t = this;


		t.canvas = canvas;
		t.ctx = t.canvas.getContext( '2d' );

		/* t.content = ctx; */
		t.start = Date.now(); // milliseconds
		t.width = 0;
		t.height = 0;

		t.x = 0;
		/* elapsed in 0.0->1.0 value */
		/* elap = ( Date.now() - start ) / duration; */

		/* http://www.williammalone.com/articles/create-html5-canvas-javascript-sprite-animation/ */



	};

	Rect.prototype = {
		init: function () {
			var t = this;
			window.cancelAnimationFrame( t.animation );
			// set new start time
			t.start = Date.now();
			t.update();
		},


		update: function () {
			var t = this;

			/* set start time stamp */
			/* start animation/render  */
			/* if time is up, stop animation? */

			// window.requestAnimationFrame( this.render );
			// t.x += 2;
			t.tim = ( Date.now() - t.start ) / ( 1000 );

			console.log( t.tim );

			if ( t.tim < 1 ) {
				t.animation = window.requestAnimationFrame( t.update.bind( t ) );
			} else {
				window.cancelAnimationFrame( t.animation );
			}

			t.render();
		},

		render: function () {
			var t = this;

			var w = document.documentElement.clientWidth;

			var opac = t.easeOut( t.tim, 1, -1, 1 );

			var sWidth = (t.easeOut( t.tim, ( w * 1.6 ), 600, 1 ) );
			var sHeight = (t.easeOut( t.tim, 4000, 200, 1 ) );
			var yPos = ( t.easeOut( t.tim, 160, -160, 1 ) );

			var rectInWidth  = ( t.easeOut( t.tim, ( w * 1.4 ), ( ( w * 1.6 ) - ( w * 1.4 ) ), 1 ) );
			var rectInHeight = ( t.easeOut( t.tim, 4000, 200, 1 ) );
			var rectInYPos = ( t.easeOut( t.tim, 320, -160, 1 ) );
			var rectInOpac = ( t.easeOut( t.tim, 0, 1, 1 ) );

			// var scaling = t.easeOut( tim, 1, 1, 1 );
			// console.log( scaling );
			/* draw all the stuff? */
			// Clear the canvas
			console.log( docWidth, docHeight );

  		  	t.ctx.clearRect( 0, 0, docWidth * 2, docHeight * 2 );
			t.ctx.save();

			t.ctx.fillStyle = 'rgba( 100, 100, 100, ' + opac + ' )';
			t.ctx.fillRect( 0, yPos, sWidth, sHeight );
			t.ctx.save();

			t.ctx.fillStyle = 'rgba( 100, 100, 100, ' + rectInOpac + ' )';
			t.ctx.fillRect( 0, rectInYPos, rectInWidth, rectInHeight );

			console.log( 'render' );

  		  	// Draw the animation

			/* if time is up, stop animation? */
			// window.cancelAnimationFrame( requestId );
		},

		kill: function () {
			window.cancelAnimationFrame( this.animation );
		},



		easeOut: function ( tim, beg, cha, dur ) {
			// http://www.gizma.com/easing/
			tim = tim / dur;
			tim--;
			// return ( cha * ( tim * tim * tim + 1 ) ) + beg;

			return ( -cha * ( tim * tim * tim * tim - 1 ) ) + beg;

			// return cha * Math.sin( tim / dur * ( Math.PI / 2 ) ) + beg;

			// tim = tim / dur;
			// return -cha * tim * ( tim - 2 ) + beg;

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


	/**
	 * @method animateEvent
	**/
	var trigger = function () {

		instances[ 0 ].init();

	};


	var setViewport = function () {
		docWidth = document.documentElement.clientWidth;
		docHeight = document.documentElement.clientHeight;
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

	return {
		init: init,
		trigger: trigger,
	};
}( window, document ));
