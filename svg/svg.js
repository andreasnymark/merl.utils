/*
*
*  
*
*
*/
var merl = merl || {};

merl.svg = ( function( window, document ) {
	"use strict";


	var defs = {
		selectSVG: '.js-svg',
        ns: 'http://www.w3.org/2000/svg',
        border: {
            scale: 0.625,
            width: 50
        },
		bgColor: 'rgb( 218, 215, 212 )'
	};
	
	
	var instances = [];
    var docSize = { 
        height: 0, 
        width: 0,
		offScreen: 0
    };
	
	
	/*
	* 
	*
	* @constructor SVG
	* @param color {String} Color of rectangles, defaults to grey
	*/
	var SVG = function( elem, color ) {
		var s = this; // I use initial of contructor
        s.elem = elem;
		s.color = color || defs.bgColor;
        s.objects = [];
        s.rects = [];
        s.level = 3;
        
        s.height = 0;
        s.height = 0;
        s.x = 0;
        s.y = 0;
		
		s.running = false;
        

		
//		var r1 = createRectangle( 0, 60, ( docSize.width *.75 ), docSize.height, s.color );
//		var r2 = createRectangle( -30, 90, ( docSize.width * .75 ), docSize.height, s.color );
//		var r3 = createRectangle( -120, 180, ( docSize.width *.75 ), docSize.height, s.color );
		
//		s.rects.push( r1, r2, r3 );
		
		
		for ( var i=0; i<3; i++ ) {
			
			s.rects.push( createRectangle( 0, 60, ( docSize.width ), docSize.height, s.color ) )
			
			s.elem.appendChild( s.rects[ i ] );	
		}
		
		
		
        
        s.sizeRectangles();
        
	};
	
	
	/*
	* 
	*
	* @method resize
	*/
	SVG.prototype.sizeRectangles = function() {
		var s = this;
		
        // console.log( s.objects );
        
        s.elem.setAttribute( 'height', docSize.height );
        s.elem.setAttribute( 'width', docSize.width );
        s.elem.setAttribute( 'viewBox', '0 0 ' + docSize.width + ' ' + docSize.height );
        
		s.resetRects();
	};
    
	
	/*
	* 
	*
	* @method resize
	*/
	SVG.prototype.pseudoZoom = function() {
		var s = this;
		
		for ( var i=0, len = s.rects.length; i<len; i++ ) {
			// console.log( i );
			// s.rects[ i ].setAttribute( 'transform', 'scale( 1.2 )' );
			s.rects[ 0 ].classList.add( 'scaleOut' );
			s.rects[ 1 ].classList.add( 'scaleUp' );
			//s.rects[ 2 ].classList.add( 'scaleIn' );
			
			
		}
		
		
		
		var t = setTimeout( (function() {
			var s = this;
			for ( var i=0, len = s.rects.length; i<len; i++ ) {
				s.rects[ 0 ].classList.remove( 'scaleOut' );
				s.rects[ 1 ].classList.remove( 'scaleUp' );
				//s.rects[ 2 ].classList.remove( 'scaleIn' );


			}
			
			
		}).bind( this ), 2500 );
		
		
		
        // s.elem.setAttribute( 'trans', docSize.height );
        
        
	};
	
	
	
	/*
	* 
	*
	* @method resize
	*/
	SVG.prototype.resetRects = function() {
		var s = this;
		s.rects[ 0 ].setAttributeNS( null, 'x', -docSize.offScreen-100 );
		s.rects[ 0 ].setAttributeNS( null, 'y', '160' );
		s.rects[ 0 ].setAttributeNS( null, 'width', docSize.width );
		s.rects[ 0 ].setAttributeNS( null, 'opacity', '0' );
		

		s.rects[ 1 ].setAttributeNS( null, 'x', -docSize.offScreen-40 );
		s.rects[ 1 ].setAttributeNS( null, 'y', '100' );
		s.rects[ 1 ].setAttributeNS( null, 'width', docSize.width );
		s.rects[ 1 ].setAttributeNS( null, 'opacity', '.4' );
		
		s.rects[ 2 ].setAttributeNS( null, 'x', -docSize.offScreen );
		s.rects[ 2 ].setAttributeNS( null, 'width', docSize.width );
		s.rects[ 2 ].setAttributeNS( null, 'opacity', '.4' );
			
	}
	
	
	
	
	
	
	
	
	/*
	* 
	*
	* @method resize
	*/
	SVG.prototype.pseudoZoomIn = function() {
		var s = this;
		
		if ( !s.running ) {
		
			s.running = true;
		
			s.resetRects();
			
			s.rects[ 0 ].classList.add( 'scaleIn' );
			s.rects[ 1 ].classList.add( 'scaleUp' );
			s.rects[ 2 ].classList.add( 'scaleOut' );	


	//		s.rects[ 1 ].classList.add( 'scaleUp' );



			var t = setTimeout( (function() {
				var s = this;
				for ( var i=0; i<3; i++ ) {
					s.rects[ 0 ].classList.remove( 'scaleIn' );
					s.rects[ 1 ].classList.remove( 'scaleUp' );
					s.rects[ 2 ].classList.remove( 'scaleOut' );
					s.running = false;
				}
			}).bind( this ), 1600 );
		}
		
		
        // s.elem.setAttribute( 'trans', docSize.height );
        
        
	};
	
	
	
	
    
	
	
	
	
	
	
	
	
	
    /*
	* 
	*
	* @method resize
	*/
//	SVG.prototype.addRectangle = function( x, y, width, height ) {
//		var s = this;
//        var rect = document.createElementNS( defs.ns, 'rect' );
//        var fromEdge = fromEdge || defs.border.width;
//        
//        rect.setAttributeNS( null, 'x', x );
//        rect.setAttributeNS( null, 'y', y );
//        rect.setAttributeNS( null, 'width', width );
//        rect.setAttributeNS( null, 'height', height );
//        rect.setAttributeNS( null, 'fill', s.color );
//        rect.classList.add( 'is-introduced' );
//		
//		rect.setAttributeNS( null, 'transform', 'scale(.8)' );
//		
//        
//		// console.log( rect );
//		
//        // s.objects.push( s.elem.appendChild( rect ));
//		
//		
//		return rect;
//		
//	};
	
	
	
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
//        docSize.height = document.body.clientHeight;
//        docSize.width = document.body.clientWidth;
        
        docSize = sizeDoc();
		
		var elems = document.querySelectorAll( defs.selectSVG );
		
		instances = [];
		
		for ( var i = 0, len = elems.length; i<len; i++ ) {
			instances.push( new SVG( elems[ i ] ) );
		}
		
		instances[0].resetRects();

		window.removeEventListener( 'resize', resizeRectangles );
		window.addEventListener( 'resize', resizeRectangles );
		// window.addEventListener( 'resize', ( function() { console.log( 'Resize!' ) } ) );

		
		document.querySelector( '.btnPseudoZoom' ).addEventListener( 'click', function() {
			console.log( 'Pseudo zoom!' );
			instances[ 0 ].pseudoZoomIn();
		});
		
	};
	

    
    /*
	* Init
	* 
	* @method init
	* @param options {Object} Object
	*/
    var sizeDoc = function() {
        var obj = {
            width: document.body.clientWidth,
            height: document.body.clientHeight,
			offScreen: document.body.clientWidth * 0.18
        };
        
        if( obj.height < window.innerHeight ) {
            obj.height = window.innerHeight;
        } 
        
        return obj;
    }
    
	
	
	
	
	
	
	var createRectangle = function( x, y, width, height, color, cls ) {
		// var s = this;
        var rect = document.createElementNS( defs.ns, 'rect' );
        var fromEdge = fromEdge || defs.border.width;
        
        rect.setAttributeNS( null, 'x', x );
        rect.setAttributeNS( null, 'y', y );
        rect.setAttributeNS( null, 'width', width );
        rect.setAttributeNS( null, 'height', height );
        rect.setAttributeNS( null, 'fill', color );

		if( cls && typeof cls === 'string' ) rect.classList.add( cls );
		
		return rect;
	};
	
	
	
	
	
	var resizeRectangles = function () {
		docSize = sizeDoc();
		for ( var i = 0, len = instances.length; i < len; i++ ) {
			instances[ i ].sizeRectangles();
		}
	};
	
	
	
	
	
	
	
    
   
	return {
		init: init,
		resizeRectangles: resizeRectangles
	};
   
   
}( window, document ));
