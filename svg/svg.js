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
        }
	};
	
	
	var instances = [];
    var docSize = { 
        height: 0, 
        width: 0 
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
		s.color = color || 'rgba( 140, 189, 170, .2 )';
        s.objects = [];
        s.level = 3;
        
        s.height = 0;
        s.height = 0;
        s.x = 0;
        s.y = 0;
        
        for( var i = s.level - 1; i>=0; i-- ) {
            
            
            var value = defs.border.width * Math.pow( defs.border.scale, i );
            
            console.log( 'Border: ' + value );
            
            s.width = docSize.width - ( 2 * ( value + s.x ) );
            s.height = docSize.height - ( 2 * ( value + s.y ) );
            s.x += value;
            s.y += value;
            
            s.addRectangle( s.x, s.y, s.width, s.height );
            
            // console.log('Rectangle loop!');
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
        
	};
    
    /*
	* 
	*
	* @method resize
	*/
	SVG.prototype.addRectangle = function( x, y, width, height ) {
		var s = this;
        var rect = document.createElementNS( defs.ns, 'rect' );
        var fromEdge = fromEdge || defs.border.width;
        
        rect.setAttributeNS( null, 'x', x );
        rect.setAttributeNS( null, 'y', y );
        rect.setAttributeNS( null, 'width', width );
        rect.setAttributeNS( null, 'height', height );
        rect.setAttributeNS( null, 'fill', s.color );
        rect.classList.add( 'is-introduced' );
        
        s.objects.push( s.elem.appendChild( rect ));
		
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
//        docSize.height = document.body.clientHeight;
//        docSize.width = document.body.clientWidth;
        
        docSize = sizeDoc();
		
		var elems = document.querySelectorAll( defs.selectSVG );
		
		instances = [];
		
		for ( var i = 0, len = elems.length; i<len; i++ ) {
			instances.push( new SVG( elems[ i ] ) );
		}

		window.removeEventListener( 'resize', ( function() { console.log( 'Resize!' ) } ) );
		window.addEventListener( 'resize', ( function() { console.log( 'Resize!' ) } ) );

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
            height: document.body.clientHeight
        };
        
        if( obj.height < window.innerHeight ) {
            obj.height = window.innerHeight;
        } 
        
        return obj;
    }
    
    
   
	return {
		init: init
	};
   
   
}( window, document ));
