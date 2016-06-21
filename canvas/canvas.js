/*
*
*  
*
*
*/
var merl = merl || {};

merl.canvas = ( function( window, document ) {
	"use strict";


	var defs = {
		selectCanvas: '.js-canvas'
	};
	
	
	var instances = [];
    var docSize = { 
        height: 0, 
        width: 0 
    };
	
	
	/*
	* 
	*
	* @constructor Canvas
	* @param color {String} Color of rectangles, defaults to grey
	*/
	var Canvas = function( elem, color ) {
		var c = this; // I use initial of contructor
        c.elem = elem;
		c.color = color || '#cccccc';
        c.context = elem.getContext( '2d' );
        
        c.addRectangle();
	};
	
	
	/*
	* 
	*
	* @method resize
	*/
	Canvas.prototype.sizeRectangles = function() {
		var c = this;
		
	};
    
    /*
	* 
	*
	* @method resize
	*/
	Canvas.prototype.addRectangle = function() {
		var c = this;

        c.context.beginPath();
        c.context.rect( 20, 20, 100, 100 );
        c.context.stroke();
		
	};
	
	
	
	/*
	* Init
	* 
	* @method init
	* @param options {Object} Object
	*/
	var init = function( options ) {
		if( options ) {
			for( var o in options ) { 
				defaults[ o ] = options[ o ]; 
			}
		}
        
        // Set document size
        docSize.height = document.body.clientHeight;
        docSize.width = document.body.clientWidth;
		
		var elems = document.querySelectorAll( defs.selectCanvas );
		
		instances = [];
		
		for ( var i = 0, len = elems.length; i<len; i++ ) {
			instances.push( new Canvas( elems[ i ] ) );
		}

		window.removeEventListener( 'resize', ( function() { console.log( 'Resize!' ) } ) );
		window.addEventListener( 'resize', ( function() { console.log( 'Resize!' ) } ) );

	};
	

   
	return {
		init: init
	};
   
   
}( window, document ));
