/*
**
**  Toggle.js
**
**
*/
var waylon = waylon || {};

waylon.search = ( function( window, document ) {
	"use strict";


	var defs = {
		all: [],
		input: '.js-incrementalsearch',
		expanded: 'is-expanded',
		error: 'Something seems to be wrong with the server. Try to refresh, and let’s hope …',
		noResult: 'No result.',
		max: 5
	};
	
	
	var searchTimeout = null;
	var searchAll = [];
	
	
	/**
	* Contructor IncrementalSearch
	*
	* @constructor Toggle
	* @param parent {Object} 
	* @param event {Object} Event on handle  
	* @param handle {Object} Handler of toggle
	*/
	var IncrementalSearch = function( input ) {
		var t = this;
		t.input = input;
		t.result = document.querySelector( '.Search-result' );
		t.xhrSearch = new XMLHttpRequest();
		
		t.input.addEventListener( 'input', triggerSearch.bind( t ) );
		window.addEventListener( 'keydown', traverseResults.bind( t ) );
		
		t.xhrSearch.addEventListener( 'readystatechange', xhrState.bind( t ) );
		
		IncrementalSearch.prototype.appendResult = appendResult;
		IncrementalSearch.prototype.wipeResult = wipeResult;
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
		defs.all = document.querySelectorAll( defs.input );
		for( var i = 0, len = defs.all.length; i<len; i++ ) {
			searchAll[i] = new IncrementalSearch( defs.all[ i ] );
		} 
	};
	

	
	var xhrRequest = function( query, xhr, url ) {
		var url = url + encodeURI( query );
		xhr.open( 'GET', url, true );
		xhr.setRequestHeader( 'X-Requested-With', 'XMLHttpRequest' );
		xhr.send();
	};
	
	
	
	
	var xhrState = function( evt ) {
		var xhr = evt.target;
		if ( xhr.readyState === XMLHttpRequest.DONE ) {
			if( xhr.status === 200 ){
				this.appendResult( this.xhrSearch.responseText );
			} else {
				alert( defs.error );
			}
		}
	}
	
	
	
	
	
	var triggerSearch = function() {
		clearTimeout( searchTimeout );

		// 500ms delay on input so we don’t go crazy
		searchTimeout = setTimeout( (function() { 
			if ( this.input.value.length > 2 ) {
				xhrRequest( this.input.value, this.xhrSearch, '/ajax/search/' );
			} else {
				this.wipeResult();
			}
		}).bind( this ), 500 ); 
	};
	
	
	
	
	
	/**
	* Jump between input and search results via arrows.
	*
	* @method traverseResults
	* @param evt {Object} Key down event
	*/
	var traverseResults = function( evt ) {
		var elemActive = document.activeElement; 

		// make sure we disable default key up/down only when search is open.
		if( parentsUntilClass( elemActive, 'Search' ) ) {
			var nextSibling = elemActive.parentElement.nextElementSibling;
			var prevSibling = elemActive.parentElement.previousElementSibling;
			
			// key down
			if ( evt.keyCode == 40 ) {  
				if( this.input == elemActive ) {
					var first = this.result.firstChild.firstChild || null;
					if( first != null ) first.focus();
				} else if( nextSibling != null ) {
					nextSibling.firstChild.focus(); 
				}
				evt.preventDefault();
			}
			
			// key up
			if ( evt.keyCode == 38 ) {      
				if( this.input != elemActive && prevSibling != null ) {
					prevSibling.firstChild.focus(); 
				} else if( this.input != document.activeElement ) {
					this.input.focus();
				}
				evt.preventDefault();
			}
			
		}

	};
	
	
	
	/**
	* Template
	*
	* @method markupSearchItem
	* @param title {String} Title
	* @param url {String} Url
	* return item {DOMobject} DOMObject
	*/
	var markupSearchItem = function( title, url ) {
		var item = document.createElement( 'li' );
		if ( url ) {
			var anchor = document.createElement( 'a' );
			anchor.classList.add( 'Overlay-link' );
			anchor.setAttribute( 'href', url );	
			anchor.textContent = title;
			item.appendChild( anchor );
		} else {
			item.textContent = title;	
		}
		item.classList.add( 'List-item' );
		return item;
	};
	
	
	
	/**
	* Loop and append search result
	*
	* @method appendResult
	* @param json {json} 
	*/
	var appendResult = function( json ) {
		var data = JSON.parse( json );
		var len = data.length;
		
		if( data.error ) {
			this.result.innerHTML = data.error;	
			return;
		}
		
		// empty
		this.result.innerHTML = '';
		
		if( len > 0 ) {
			for (var i = 0; i<len; i++) {
				var url = data[ i ][ 'url' ];
				var title = data[ i ][ 'title' ];		
				this.result.appendChild( markupSearchItem( title, url ) );

				// add view all if more than max
				if( i + 1 == defs.max ) {
					this.result.appendChild( markupSearchItem( 'View all', '/search?q=' + encodeURI( this.input.value ) ) );
				}
			}
		} else {
			this.result.appendChild( markupSearchItem( defs.noResult, null ) );
		}
		
		
	};

	
	
	/**
	* Traverse DOM upwards until class
	*
	* @method parentsUntilClass
	* @param el {Object} Element to start from
	* @param cls {String} Class name where to stop
	* @return {Object}
	*/
	var wipeResult = function() {
		this.result.innerHTML = '';
	};

		
	
	
	/**
	* Traverse DOM upwards until class
	*
	* @method parentsUntilClass
	* @param el {Object} Element to start from
	* @param cls {String} Class name where to stop
	* @return {Object}
	*/
	var parentsUntilClass = function ( el, cls ) {
		while ( el.parentNode ) {
			el = el.parentNode; 
			if ( el.nodeType == 1 && el.getAttribute( 'class' ) && el.classList.contains( cls ) ) {
				return el;
			}
		}
		return null;
	};
	
	
   
	return {
		init: init
	};
   
   
}( window, document ));
