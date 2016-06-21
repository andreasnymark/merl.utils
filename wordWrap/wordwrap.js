/*
*
*  
*
*
*/
var merl = merl || {};

merl.wordwrap = ( function( window, document ) {
	"use strict";


	var defs = {
		selector: '.js-wordwrap',
		wrapElem: 'span',
		wrapClass: ''
	};
	
	
	var instances = [];
	
	
	/*
	* 
	*
	* @constructor Canvas
	* @param color {String} Color of rectangles, defaults to grey
	*/
	var Wordwrap = function( elem ) {
		var t = this; // I use initial of contructor
		t.elem = elem;
		t.content = t.elem.innerHTML;
		t.text = t.elem.innerText;
		t.wrapElem = defs.wrapElem;
		t.wrapClass = defs.wrapClass;
		
		var data = t.elem.getAttribute( 'data-wordwrap' );		
		
		
		if ( data ) {
			var d = JSON.parse( data );
			console.log( d );
			if( d[ 'wrapElem' ] ) t.wrapElem = d[ 'wrapElem' ];
			if( d[ 'wrapClass' ] ) t.wrapClass = d[ 'wrapClass' ];
		}
		
		t.wrapWords();
	};
	
	
	/*
	* 
	*
	* @method resize
	*/
	Wordwrap.prototype.wrapWords = function() {
		var t = this;
		t.wrapTextInElem();
		if( t.wrapClass !== '' ) t.setClass();
	};
	
    
    /*
	* 
	*
	* @method resize
	*/	
	Wordwrap.prototype.updateContent = function () {
		var t = this;
		t.elem.innerHTML = t.content;
	};
		
		
		
	/*
	* 
	*
	* @method resize
	*/	
	Wordwrap.prototype.setClass = function () {
		var t = this;
		var wrapElem = t.elem.querySelectorAll( defs.wrapElem );
		for ( var i = 0, len = wrapElem.length; i < len; i++ ) {
			wrapElem[ i ].classList.add( t.wrapClass );
		}
	};
	

	
	Wordwrap.prototype.wrapTextInElem = function( elem ) {
		var t = this;
		var arr = t.text.split( ' ' );

		arr = removeDuplicates( arr );

		for ( var key in arr ) {
			t.content = t.content.replace( new RegExp( arr[ key ] , 'g' ) , 
				'<' + t.wrapElem + '>' + '\$&' + '</' + t.wrapElem + '>' );
		}
		t.updateContent();
	};
	

	var removeDuplicates = function ( a ) {
		var prims = {"boolean":{}, "number":{}, "string":{}}, objs = [];
		return a.filter( function( item ) {
			var type = typeof item;
			if( type in prims )
				return prims[ type ].hasOwnProperty( item ) ? false : ( prims[ type ][ item ] = true );
			else
				return objs.indexOf( item ) >= 0 ? false : objs.push( item );
		});
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
		
		var elems = document.querySelectorAll( defs.selector );
		
		instances = [];
		for ( var i = 0, len = elems.length; i < len; i++ ) {
			instances.push( new Wordwrap( elems[ i ] ));
		}
	};
	

   
	return {
		init: init
	};
   
   
}( window, document ));
