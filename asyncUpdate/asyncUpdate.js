/**
 * @author Andreas Nymark <andreas@nymark.me>
 * @license MIT
 * @version 1
**/
var merl = merl || {};

merl.asyncUpdate = ( function( window, document ) {
	'use strict';


	var searchTimeout = null,
		searchAll = [],
		defs = {
			all: [],
			selectElem: '[data-asynctoggle]',
		};


	/**
	 * @constructor IncrementalSearch
	 * @param {HTMLElement} Element
	**/
	var AsyncUpdate = function( elem ) {
		var t = this;
		t.xhr = new XMLHttpRequest();
		t.xhr.addEventListener( 'readystatechange', t.xhrState.bind( t ) );
		t.elem = elem;
		t.elem.addEventListener( 'click', t.update.bind( t ) );
		t.data = JSON.parse( t.elem.getAttribute( 'data-asynctoggle' ) );
	};


	AsyncUpdate.prototype = {
		update: function () {
			var t = this;
			// var hash = t.elem.getAttribute( 'data-hash' );
			console.log( t.data.hash, t.data.url );

			t.xhrRequest( t.data.hash, t.xhr, t.data.url );
		},
		xhrRequest: function ( query, xhr, url ) {
			// var newurl = url + '?' + encodeURI( query );
			xhr.open( 'GET', url, true );
			xhr.setRequestHeader( 'X-Requested-With', 'XMLHttpRequest' );
			xhr.send( query );
		},
		xhrState: function ( evt ) {
			var t = this;
			var xhr = evt.target;
			// console.log( xhr, this );

			if ( xhr.readyState === XMLHttpRequest.DONE ) {
				if( xhr.status === 200 ){
					// alert( 'Works!' );

					var resp = JSON.parse( xhr.response );
					console.log( resp.starred );

					t.elem.classList.add( 'active' );
				} else {
					alert( 'Error' );
				}
			}
		},
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

		defs.all = document.querySelectorAll( defs.selectElem );

		if ( defs.all.length > 0 ) {
			for( var i = 0, len = defs.all.length; i<len; i++ ) {
				searchAll[i] = new AsyncUpdate( defs.all[ i ] );
			}
		}
	};


	return {
		init: init
	};

}( window, document ));
