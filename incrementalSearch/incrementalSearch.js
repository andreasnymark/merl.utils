/**
 * incrementalSearch.js
 * Real time incremental search, using XMLHttpRequest and JSON result.
 *
 * @author Andreas Nymark <andreas@nymark.me>
 * @license MIT
 * @version 1
**/
var merl = merl || {};

merl.incrementalSearch = ( function( window, document ) {
	'use strict';


	var searchTimeout = null,
		searchAll = [],
		defs = {
			all: [],
			selectInput: '.js-incrementalsearch',
			selectWrap: '.Search',
			selectResult: '.Search-result',
			minChars: 3,
			maxResult: 5,
			timeout: 500, //ms
			urlXHR: 'search.json?q=', // JSON result
			urlPage: '/search?q=', // Search term will be added, encoded.
			text: {
				error: 'Something seems to be wrong with the server. Try to refresh, and let’s hope …',
				more: 'View all',
				empty: 'No result.',
			},
			tmpl: {
				item: {
					elem: 'div',
					class: 'Search-item'
				},
				anchor: {
					class: 'Link'
				}
			}
		};


	/**
	 * @constructor IncrementalSearch
	 * @param {HTMLElement} Element
	**/
	var IncrementalSearch = function( input ) {
		var t = this;
		t.input = t.confirmInput( input );
		t.result = t.resultList();
		t.xhrSearch = new XMLHttpRequest();
		t.input.addEventListener( 'input', this.triggerSearch.bind( t ) );
		window.addEventListener( 'keydown', traverseResults.bind( t ) );
		t.xhrSearch.addEventListener( 'readystatechange', xhrState.bind( t ) );
	};


	IncrementalSearch.prototype = {

		triggerSearch: function () {
			clearTimeout( searchTimeout );
			// 500ms delay on input so we don’t go crazy
			searchTimeout = setTimeout( ( function () {
				if ( this.input.value.length >= defs.minChars ) {
					xhrRequest( this.input.value, this.xhrSearch, defs.urlXHR );
				} else {
					this.wipeResult();
				}
			}).bind( this ), defs.timeout );
		},


		/**
		 * Loop and append search result
		 *
		 * @method appendResult
		 * @param json {json}
		**/
		appendResult: function( json ) {
			var data = JSON.parse( json ),
				len = data.length,
				r = this.result;

			if( data.error ) {
				r.innerHTML = data.error;
				return;
			}

			r.innerHTML = '';

			if( len > 0 ) {

				for ( var i = 0; i < len && i < defs.maxResult; i++ ) {
					r.appendChild( markupSearchItem( data[ i ].title, data[ i ].url ) );

					// add view all if more than max
					if( i + 1 === defs.maxResult ) {
						r.appendChild( markupSearchItem( defs.text.more, defs.urlPage + encodeURI( this.input.value ) ) );
					}
				}
			} else {
				r.appendChild( markupSearchItem( defs.text.empty, null ) );
			}
		},


		/**
		 * Removes all HTML in 'result'
		 *
		 * @method wipeResult
		**/
		wipeResult: function () {
			this.result.innerHTML = '';
		},


		/**
		 * Adds a container for search result if none exist.
		 *
		 * @method resultList
		 * @return {HTMLElement} Element - A ul element, appended after input.
		**/
		resultList: function () {
			var res = document.querySelector( defs.selectResult );
			if( !res ) {
				res = document.createElement( 'div' );
				res.classList.add( defs.selectResult.substr( 1 ) );
				this.input.parentNode.appendChild( res );
			}
			res.setAttribute( 'aria-live', 'polite' );
			return res;
		},


		/**
		 * Make sure it’s an input element.
		 *
		 * @method confirmInput
		 * @param {HTMLElement} Element - The input element
		**/
		confirmInput: function ( elem ) {
			if ( elem.nodeName !== 'INPUT' ) {
				elem = elem.querySelector( 'input[type=text]' );
				if ( !elem ) console.log( 'incrementalSearch needs an input=text to work' );
			}
			return elem;
		},
	};


	var xhrRequest = function ( query, xhr, url ) {
		var newurl = url + encodeURI( query );
		xhr.open( 'GET', newurl, true );
		xhr.setRequestHeader( 'X-Requested-With', 'XMLHttpRequest' );
		xhr.send();
	};


	var xhrState = function ( evt ) {
		var xhr = evt.target;
		if ( xhr.readyState === XMLHttpRequest.DONE ) {
			if( xhr.status === 200 ){
				this.appendResult( this.xhrSearch.responseText );
			} else {
				alert( defs.text.error );
			}
		}
	};


	/**
	 * Template for each search result
	 *
	 * @method markupSearchItem
	 * @param {String} title - title of search result
	 * @param {String} url - URL to search result
	 * @return {HTMLElement} Element - as a li
	**/
	var markupSearchItem = function( title, url ) {
		var item = document.createElement( defs.tmpl.item.elem );
		if ( url ) {
			var anchor = document.createElement( 'a' );
			anchor.classList.add( defs.tmpl.anchor.class );
			anchor.setAttribute( 'href', encodeURI( url ) );
			anchor.textContent = title;
			item.appendChild( anchor );
		} else {
			item.textContent = title;
		}
		item.classList.add( defs.tmpl.item.class );
		return item;
	};


	/**
	 * Jump between input and each search result item using arrow keys.
	 *
	 * @method traverseResults
	 * @param {KeyEvent} KeyEvent
	**/
	var traverseResults = function( evt ) {
		var elemActive = document.activeElement;

		// make sure we disable default key up/down only when search is open.
		if( merl.utils.parentUntilClass( elemActive, defs.selectWrap ) ) {
			var nextSibling = elemActive.parentElement.nextElementSibling;
			var prevSibling = elemActive.parentElement.previousElementSibling;

			// key down
			if ( evt.keyCode === 40 ) {
				if ( this.input === elemActive ) {
					var first = this.result.firstChild.firstChild || null;
					if ( first !== null ) first.focus();
				} else if ( nextSibling !== null ) {
					nextSibling.firstChild.focus();
				}
				evt.preventDefault();
			}

			// key up
			if ( evt.keyCode === 38 ) {
				if ( this.input !== elemActive && prevSibling !== null ) {
					prevSibling.firstChild.focus();
				} else if ( this.input !== document.activeElement ) {
					this.input.focus();
				}
				evt.preventDefault();
			}

		}

	};


	/**
	 * Init
	 *
	 * @method init
	 * @param options {Object} Object
	**/
	var init = function( options ) {
		if ( options ) {
			for ( var o in options ) {
				defs[ o ] = options[ o ];
			}
		}

		// Include
		if ( !merl.utils ) console.log( 'incrementalSearch requires merl.utils.js' );

		defs.all = document.querySelectorAll( defs.selectInput );

		if ( defs.all.length > 0 ) {
			for( var i = 0, len = defs.all.length; i<len; i++ ) {
				searchAll[i] = new IncrementalSearch( defs.all[ i ] );
			}
		}
	};


	return {
		init: init
	};

}( window, document ));
