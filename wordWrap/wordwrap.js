/*
* Wordwrap.js
*
* Wordwrap is a tiny javascript to wrap words, seperated 
* with a blank space, with an element.
*  
* Copyright 2016, Andreas Nymark
* Licensed under a MIT license
*
*/
var merl = merl || {};

merl.wordwrap = ( function ( window, document ) {
	"use strict";


	var defs = {
		selector: '.js-wordwrap',
		wrapElem: 'span',
		wrapClass: ''
	};
	
	
	var instances = [];
	
	
	/*
	* 
	* @constructor Wordwrap
	* @param elem {Object} 
	*/
	var Wordwrap = function ( elem ) {
		var t = this; 
		var data = elem.getAttribute( 'data-wordwrap' );	
		t.elem = elem;
		t.content = t.elem.innerHTML;
		t.text = t.elem.innerText;
		t.wrapElem = defs.wrapElem;
		t.wrapClass = defs.wrapClass;

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
	* @method wrapWords
	*/
	Wordwrap.prototype.wrapWords = function () {
		var t = this;
		t.wrapTextInElem();
		if( t.wrapClass !== '' ) t.setClass( t.elem.querySelectorAll( t.wrapElem ), t.wrapClass );
	};
	
    
    /*
	* Add content to markup.
	*
	* @method updateContent
	*/	
	Wordwrap.prototype.updateContent = function () {
		var t = this;
		t.elem.innerHTML = t.content;
	};
		
		
		
	/*
	* Finds all wrapper elements and adds a class to each.
	*
	* @method setClass
	* @param wrapElems { Object } List of elements
	* @param wrapClass { String } Class added
	*/	
	Wordwrap.prototype.setClass = function ( wrapElems, wrapClass ) {
		for ( var i = 0, len = wrapElems.length; i < len; i++ ) {
			wrapElems[ i ].classList.add( wrapClass );
		}
	};
	

	/*
	* Wraps each word in an element.
	*
	* @method wrapTextInElement
	* @param elem { Object } Element.
	*/
	Wordwrap.prototype.wrapTextInElem = function ( elem ) {
		var t = this;
		var arr = t.text.split( ' ' );

		arr = removeDuplicates( arr );

		for ( var key in arr ) {
			t.content = t.content.replace( new RegExp( arr[ key ] , 'g' ) , 
				'<' + t.wrapElem + '>' + '\$&' + '</' + t.wrapElem + '>' );
		}
		t.updateContent();
	};
	

	/*
	* Removes duplicates in an array..
	*
	* @method removeDuplicates 
	* @param a { Array } Array of words.
	* @return { Object }
	*/
	var removeDuplicates = function ( a ) {
		var prims = {"boolean":{}, "number":{}, "string":{}}, objs = [];
		return a.filter( function ( item ) {
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
	var init = function ( options ) {
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
