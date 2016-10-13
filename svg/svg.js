/*
*
*  
*
*
*/
var merl = merl || {};

merl.svg = ( function ( window, document ) {
	"use strict";


	var defs = {
			selectSVG: '.js-svg',
			ns: 'http://www.w3.org/2000/svg',
			bgColor: 'rgb( 218, 215, 212 )',
			opacity: .4,
			boundary: {
				narrow: 800
			},
			cls: {
				in: 'scaleIn',
				up: 'scaleUp',
				out: 'scaleOut',
			}
		},
		instances = [],
		docSize = { 
			height: 0, 
			width: 0,
			offScreen: 0
		};
	
	
	/*
	* @constructor SVG
	*
	* @param color {Object} DOMObject
	* @param color {String} Color of rectangles, defaults to grey
	*/
	var SVG = function ( elem, color ) {
		var s = this; // I use initial of contructor
        s.elem = elem;
		s.color = color || defs.bgColor;
        s.rects = [];
		s.running = false;

		for ( var i = 0; i < 3; i++ ) {
			s.rects.push( createRectangle( 0, 60, ( docSize.width ), docSize.height, s.color ) )
			s.elem.appendChild( s.rects[ i ] );	
		}
		
        s.resizeContainer();
	};
	
	
	/*
	* @method resizeContainer
	*
	* Set size on container (SVG) based on size of window
	*/
	SVG.prototype.resizeContainer = function () {
		var s = this;
        s.elem.setAttribute( 'height', docSize.height );
        s.elem.setAttribute( 'width', docSize.width );
        s.elem.setAttribute( 'viewBox', '0 0 ' + docSize.width + ' ' + docSize.height );
		s.resetRects();
	};
    

	
	/*
	* @method resetRects
	*
	* Reset rectangles to original position
	*/
	SVG.prototype.resetRects = function () {
		var s = this,
			rect0X = -docSize.offScreen - 100, 
			rect0Y = 160,
			rect1X = -docSize.offScreen - 40, 
			rect1Y = 100,
			rect2X = -docSize.offScreen, 
			rect2Y = 60;
		
		if ( docSize.width < defs.boundary.narrow ) {
			rect0X = -docSize.offScreen - 45;
			rect0Y = 105;
			rect1X = -docSize.offScreen - 15;
			rect1Y = 75;
			rect2X = -docSize.offScreen;
			rect2Y = 60;
		} 
		
		s.rects[ 0 ].setAttributeNS( null, 'x', rect0X );
		s.rects[ 0 ].setAttributeNS( null, 'y', rect0Y );
		s.rects[ 0 ].setAttributeNS( null, 'width', docSize.width );
		s.rects[ 0 ].setAttributeNS( null, 'opacity', '0' );
		
		s.rects[ 1 ].setAttributeNS( null, 'x', rect1X );
		s.rects[ 1 ].setAttributeNS( null, 'y', rect1Y );
		s.rects[ 1 ].setAttributeNS( null, 'width', docSize.width );
		s.rects[ 1 ].setAttributeNS( null, 'opacity', defs.opacity );
		
		s.rects[ 2 ].setAttributeNS( null, 'x', rect2X );
		s.rects[ 2 ].setAttributeNS( null, 'y', rect2Y );
		s.rects[ 2 ].setAttributeNS( null, 'width', docSize.width );
		s.rects[ 2 ].setAttributeNS( null, 'opacity', defs.opacity );	
	};
	
	
	/*
	* @method pseudoZoomIn
	*
	* Adds classes to each rectangle, and removes via timeout.
	*/
	SVG.prototype.pseudoZoomIn = function () {
		var s = this;
		
		if ( !s.running ) {
			s.running = true;
			s.resetRects();
			
			s.rects[ 0 ].classList.add( defs.cls.in );
			s.rects[ 1 ].classList.add( defs.cls.up );
			s.rects[ 2 ].classList.add( defs.cls.out );	
			
			// Maybe do something else?
			var t = setTimeout( ( function () {
				var s = this;
				for ( var i=0; i<3; i++ ) {
					s.rects[ 0 ].classList.remove( defs.cls.in );
					s.rects[ 1 ].classList.remove( defs.cls.up );
					s.rects[ 2 ].classList.remove( defs.cls.out );
					s.running = false;
				}
			} ).bind( this ), 1600 );
		}
	};
	

    /*
	* @method sizeDoc
	*
	* Measure document width/height and returns this together with offScreen.
	*
	* returns obj {Object} Object
	*/
    var sizeDoc = function () {
		var offScreen = 0.18,
			obj;
		
		if ( document.body.clientWidth < defs.boundary.narrow ) offScreen = 0.05;
        
		obj = {
            width: document.body.clientWidth,
            height: document.body.clientHeight,
			offScreen: Math.floor( document.body.clientWidth * offScreen )
        };
        
        if( obj.height < window.innerHeight ) {
            obj.height = window.innerHeight;
        } 
        
        return obj;
    }
    
	
    /*
	* @method createRectangle
	* 
	* @param x {Number} x-position
	* @param y {Number} y-position
	* @param width {Number} width of rectangle
	* @param height {Number} height of rectangle
	* @param color {String} color
	* @param cls {String} classes to add to rectanggle
	* return SVG {DOMObject} rectangle
	*/	
	var createRectangle = function ( x, y, width, height, color, cls ) {
        var rect = document.createElementNS( defs.ns, 'rect' );
        rect.setAttributeNS( null, 'x', x );
        rect.setAttributeNS( null, 'y', y );
        rect.setAttributeNS( null, 'width', width );
        rect.setAttributeNS( null, 'height', height );
        rect.setAttributeNS( null, 'fill', color );

		if( cls && typeof cls === 'string' ) rect.classList.add( cls );
		
		return rect;
	};
	
	
	
	
	
    /*
	* @method resizeRectangles
	*
	* @param options {Object} Object
	*/
	var resizeRectangles = function () {
		docSize = sizeDoc();
		for ( var i = 0, len = instances.length; i < len; i++ ) {
			instances[ i ].resizeContainer();
		}
	};
	
	
	
	
	/*
	* Init
	* 
	* @method init
	* @param options {Object} Object
	*/
	var init = function ( options ) {
		if( options ) {
			for( var o in options ) { 
				defaults[ o ] = options[ o ]; 
			}
		}
        
		var elems = document.querySelectorAll( defs.selectSVG );
		
		instances = [];
        docSize = sizeDoc();
		
		for ( var i = 0, len = elems.length; i<len; i++ ) {
			instances.push( new SVG( elems[ i ] ) );
			instances[ i ].resetRects();
		}

		window.removeEventListener( 'resize', resizeRectangles );
		window.addEventListener( 'resize', resizeRectangles );
		
		// temp
		document.querySelector( '.btnPseudoZoom' ).addEventListener( 'click', function () {
			console.log( 'Pseudo zoom!' );
			instances[ 0 ].pseudoZoomIn();
		});
		
	};
	

	
	
    
   
	return {
		init: init,
		resizeRectangles: resizeRectangles
	};
   
   
}( window, document ));
