/*
* Wordwrap.js
*
* Wordwrap is a tiny javascript to wrap words inside an element with another 
  element. Class/style can be added to each new wrapper. Existing elements 
  will be kept as is, but class/style will be added.
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
		delay: '', // in ms, without ms
		wrapElem: 'span',
		wrapClass: '',
		wrapStyle: ''
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
		t.wrapStyle = defs.wrapStyle;
		t.delay = defs.delay;

		if ( data ) {
			var d = JSON.parse( data );
			if( d.wrapElem ) t.wrapElem = d.wrapElem;
			if( d.wrapClass ) t.wrapClass = d.wrapClass;
			if( d.wrapStyle ) t.wrapStyle = d.wrapStyle;
			if( d.delay ) t.delay = d.delay;
		}
		
		t.wrapWords();
	};
	
	
	Wordwrap.prototype = {

		/*
		* @method wrapWords
		*/
		wrapWords: function () {
			var t = this;
			t.wrapTextInElem();
			if( t.wrapClass !== '' ) t.setClass( t.elem.querySelectorAll( t.wrapElem ), t.wrapClass );
		},
		
		
		/*
		* Add content to markup. If class/style, set on each child element.
		*
		* @method updateContent
		*/	
		updateContent: function () {
			var t = this,
				children = t.elem.children;

			t.elem.innerHTML = t.content;
			if ( t.delay ) t.setDelay( children, t.delay );		
			if ( t.wrapStyle ) t.setStyle( children, t.wrapStyle );		
			if ( t.wrapClass ) t.setClass( children, t.wrapClass );
		},
		
			
		/*
		* Finds all wrapper elements and adds a class to each.
		*
		* @method setClass
		* @param wrapElems { Object } List of elements
		* @param wrapClass { String } Class added
		*/	
		setClass: function ( elems, cls ) {
			for ( var i = 0, len = elems.length; i < len; i++ ) {
				elems[ i ].classList.add( cls );
			}
		},
		
		
		/*
		* Finds all wrapper elements and adds a style attribtue to each.
		*
		* @method setStyle
		* @param wrapElems { Object } List of elements
		* @param wrapStyle { String } Style added
		*/	
		setStyle: function ( elems, wrapStyle ) {
			for ( var i = 0, len = elems.length; i < len; i++ ) {
				var elem = elems[ i ],
					currStyles = elem.getAttribute( 'style' ) || '';
				
				elem.setAttribute( 'style', currStyles + wrapStyle );
			}
		},
		
		
		/*
		* Finds all wrapper elements and adds a style attribtue to each.
		*
		* @method setStyle
		* @param wrapElems { Object } List of elements
		* @param wrapStyle { String } Style added
		*/	
		setDelay: function ( elems, delay ) {
			for ( var i = 0, len = elems.length; i < len; i++ ) {
				
				var elem = elems[ i ],
					currStyles = elem.getAttribute( 'style' ) || '';
				elem.setAttribute( 'style', 'animation-delay: ' + ( i * delay ) + 'ms;' );
			}
		},
		
		
		/*
		* Wraps each word in an element.
		*
		* @method wrapTextInElement
		* @param elem { Object } Element.
		*/
		wrapTextInElem: function ( elem ) {
			var t = this,
				re,
				arr = t.text.split( ' ' ),
				obj = removeDuplicates( arr );

			for ( var key in obj ) {
				var word = obj[ key ],
					re;

				word = word.replace( /(\r\n|\n|\r)/gm, '' );
				re = new RegExp( '(^|\\b)' + word + '($|\\s|\\?)', 'g' ); // http://www.regular-expressions.info/anchors.html
				t.content = t.content.replace( re, '<' + t.wrapElem + '>' + '\$&' + '</' + t.wrapElem + '>' );
			}
			t.updateContent();
		},
	};
    
		
	/*
	* Removes duplicates in an array..
	*
	* @method removeDuplicates 
	* @param a { Array } Array of words.
	* @return { Object }
	*/
	var removeDuplicates = function ( arr ) {
		var obj = {};
		for ( var i = 0; i < arr.length; i++ ) {
			obj[ arr[ i ]] = true;
		}
		arr = [];
		for ( var key in obj ) {
			arr.push( key );
		}
		return arr;
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
