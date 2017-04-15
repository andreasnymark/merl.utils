/**
 * Descent. Canvas animation to descent deeper into the website.
 * Built for www.nymark.me.
 *
 * @author Andreas Nymark <andreas@nymark.me>
 * @license MIT
 * @version 1
**/
var nymark = nymark || {};


nymark.descent = ( function ( window, document ) {
	"use strict";


	var instances = [],
		docWidth = 100,
		docHeight = 100,
		defs = {
			dur: 750,
			top: 120
		};

	var evtEnd = document.createEvent( 'Event' );
	evtEnd.initEvent( 'nymark.descent.end', true, true );


	/**
	 * Constructor
	 *
	 * @constructor Descent
	 * @param {HTMLElement} canvas - DOM Element
	 */
	var Descent = function ( canvas ) {
		var t = this;
		t.canvas = canvas;
		t.ctx = t.canvas.getContext( '2d' );
		t.dur = defs.dur / 1000;
		t.start = Date.now();
		t.setDimensions();
	};


	Descent.prototype = {


		/**
		 * Initiate descent
		 *
		 * @method init
		 */
		init: function () {
			var t = this;
			window.cancelAnimationFrame( t.animation );
			// set new start time
			t.start = Date.now();
			t.update();
		},


		/**
		 * @method update
		 */
		update: function () {
			var t = this;
			t.tim = ( Date.now() - t.start ) / ( 1000 );
			if ( t.tim <= t.dur ) {
				t.render();
				t.animation = window.requestAnimationFrame( t.update.bind( t ) );
			} else {
				t.canvas.dispatchEvent( evtEnd );
				window.cancelAnimationFrame( t.animation );
			}
		},


		/**
		 * @method render
		 */
		render: function () {
			var t = this;

			var outOpac = t.easing( t.tim, 1, -1 ),
				outYPos = t.easing( t.tim, ( defs.top * 2 ), ( defs.top * -2 ) ),
				outWidth = t.easing( t.tim, ( docWidth * 1.6 ), 600 ),
				outHeight = t.easing( t.tim, ( docHeight * 2 ), 200 );

			var inOpac = t.easing( t.tim, 0, 1 ),
				inYPos = t.easing( t.tim, ( defs.top * 6 ), ( defs.top * -4 ) ),
				inWidth = t.easing( t.tim, ( docWidth * 1 ), ( ( docWidth * 1.6 ) - ( docWidth * 1 ) ) ),
				inHeight = t.easing( t.tim, ( docHeight * 2 ), 200 );

  		  	t.ctx.clearRect( 0, 0, docWidth * 2, docHeight * 2 );
			t.ctx.fillStyle = 'rgba( 240, 236, 235, ' + outOpac + ' )';
			t.ctx.fillRect( 0, outYPos, outWidth, outHeight );
			t.ctx.fillStyle = 'rgba( 240, 236, 235, ' + inOpac + ' )';
			t.ctx.fillRect( 0, inYPos, inWidth, inHeight );
			t.ctx.save();
		},


		/**
		 * Easing. From http://www.gizma.com/easing/
		 *
		 * @function easing
		 * @param {Number} tim - Time, how far along tween
		 * @param {Number} beg - Initial value
		 * @param {Number} cha - Value will be change with
		 * @return {Number}
		 */
		easing: function ( tim, beg, cha ) {
			tim = tim / this.dur;
			tim--;
			return ( -cha * ( tim * tim * tim * tim - 1 ) ) + beg;
		},


		/**
		 * Set dimension on canvas.
		 *
		 * @method setDimensions
		 */
		setDimensions: function () {
			var t = this,
				c = t.canvas;

			c.setAttribute( 'width', docWidth * 2 );
			c.setAttribute( 'height', docHeight * 2 );
			c.style.height = docHeight + 'px';
		},


		/**
		 * @method kill
		 */
		kill: function () {
			window.cancelAnimationFrame( this.animation );
		},
	};


	/**
	 * Initiate plugin
	 *
	 * @method init
	 * @param {Object} options - override default settings
	**/
	var init = function ( options ) {
		if ( options ) {
			for ( var o in options ) {
				defs[ o ] = options[ o ];
			}
		}

		setDocDimensions();
		instances.push( new Descent( document.querySelector( 'canvas' ) ) );

		for ( var i = 0, len = instances.length; i < len; i++ ) {
			instances[ i ].update();
		}
	};


	/**
	 * @method trigger
	**/
	var trigger = function ( i ) {
		i = i || 0;
		instances[ i ].init();
	};


	/**
	 * @method setDocDimensions
	**/
	var setDocDimensions = function () {
		var body = document.body,
		    html = document.documentElement;

		docHeight = Math.max( body.scrollHeight, body.offsetHeight,
						html.clientHeight, html.scrollHeight, html.offsetHeight );

		docWidth = Math.max( html.clientWidth, window.innerWidth );
	};


	return {
		init: init,
		trigger: trigger,
	};
}( window, document ) );
