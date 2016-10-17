/*
*
*  
*
*
*/
var merl = merl || {};

merl.asyncPage = ( function( window, document ) {
	"use strict";


	var defs = {
		selectAsyncPage: '.js-asyncPage',
		selectTrigger: 'a[href]',
		classTransition: 'anim',
		eventBeforeChange: 'transitionend'
	};
	
	
	var instances = [];
	var currInstance = null;
	var initLocation = document.location.href;
	var origin = null;
	
	
	/*
	* Contructor AsyncPage. Holds XHR
	*
	* @constructor Toggle
	* @param elem {Object} Element
	*/
	var AsyncPage = function( elem ) {
		var t = this;
		t.xhrPage = new XMLHttpRequest();
		t.xhrPop = new XMLHttpRequest();
		t.url = null;
		t.elem = elem;
		t.title = null;
		t.statePop = false;
		t.newTriggers = null;
		t.xhrPage.addEventListener( 'readystatechange', statePage.bind( t ) );
		t.xhrPop.addEventListener( 'readystatechange', statePage.bind( t ) );
		t.initTriggers = document.querySelectorAll( defs.selectTrigger );
		t.setTriggers();
		
		if( defs.eventBeforeChange ) t.elem.addEventListener( defs.eventBeforeChange, eventEnd.bind( t ) );
	};
	
	
	AsyncPage.prototype = {
		
		/*
		* Set triggers based on whats defs.
		*
		* @method setTriggers
		*/
		setTriggers: function() {
			var t = this;
			var triggers = t.newTriggers || t.initTriggers;
			for ( var i = 0, len = triggers.length; i<len; i++ ) {
				triggers[ i ].addEventListener( 'click', getContent.bind( t ) );
			}
		},


		/*
		* XMLHTTPRequest
		*
		* @method xhRequest
		* @param xhr {XMLHttpRequest}
		* @param url {String} URL to new page
		*/
		xhRequest: function( xhr, url ) {
			xhr.open( 'GET', url, true );
			xhr.setRequestHeader( 'X-Requested-With', 'XMLHttpRequest' );
			xhr.send();
		},
	
	
		/*
		* Adds new page history
		*
		* @method addHistory
		*/
		addHistory: function() {
			if ( history.pushState ) {
				window.history.pushState( { url: this.url }, this.title, this.url );
			}
		},
	}
	
	
	/*
	* This is bind from AsyncPage
	*
	* @method getContent
	* @param evt { XMLHTTPRequestObject } 
	*/
	var getContent = function( evt ) {
		var domain = extractDomain( evt.target.href );
		if( domain === origin ) {
			var t = this;
			currInstance = t;
			t.url = evt.target.href;
			t.statePop = false;

			if( defs.eventBeforeChange ) {
				t.elem.classList.add( defs.classTransition );		
			} else {
				t.xhRequest( t.xhrPage, t.url );
			}
			evt.preventDefault();	
		}
	};
	
	
	/*
	* This is bind from AsyncPage
	*
	* @method eventEnd
	*/
	var eventEnd = function() {
		var t = this;
		if( t.elem.classList.contains( defs.classTransition ) ) t.xhRequest( t.xhrPage, t.url );
	};
	

	/*
	* 
	*
	* @method statePage
	* @param evt { XMLHTTPRequestObject } 
	*/
	var statePage = function( evt ) {
		var t = this;
		var xhr = evt.target;
		if ( xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200 ){
			var pageObj = newPageContent( xhr.responseText );
			document.title = pageObj.title;
			t.elem.innerHTML = pageObj.content;
			t.newTriggers = t.elem.querySelectorAll( defs.selectTrigger );
			t.setTriggers();
			
			if( defs.eventBeforeChange ) t.elem.classList.remove( defs.classTransition ); 
			
			// Don’t add popstate to history 
			if( !t.statePop ) t.addHistory();
		} 
	}
	
	
	/*
	* When using history in browser
	* Uses initLocation is user goes all the way back to start.
	* Adds class to fade out if this has been added.
	* Else immedietly request url via popstate
	*
	* @method statePop
	* @param evt { PopStateEvent } evt
	*/
	var statePop = function( evt ) {
		var url = ( evt.state ) ? evt.state.url : initLocation;		
		currInstance.statePop = true;
		currInstance.url = url;
		if( defs.eventBeforeChange ) currInstance.elem.classList.add( defs.classTransition );
		if( !defs.eventBeforeChange ) currInstance.xhRequest( currInstance.xhrPop, currInstance.url );
		evt.preventDefault(); 
	};
	
	
	/*
	* Returns content and title for new page.
	*
	* @method getContent
	* @param evt { XMLHTTPRequestObject } 
	* return obj { Object } Holds .title and .content for new page
	*/
	var newPageContent = function( html ) {
		if( html ) {
			var doc = document.implementation.createHTMLDocument( 'example' );
			doc.documentElement.innerHTML = html;

			var pageContent = doc.querySelector( defs.selectAsyncPage ).innerHTML;
			var pageTitle = doc.querySelector( 'title' ).textContent;

			var obj = {
				content: pageContent, 
				title: pageTitle
			}
			return obj;
		}
		return null;
	};
	
	
	/*
	*
	*/
	var extractDomain = function( url ) {
		var domain;
		
		if( url.indexOf ( '://' ) > -1 ) {
			domain = url.split( '/' )[2];
		} else {
			domain = url.split('/')[0];
		}

		//find & remove port number
		domain = domain.split(':')[0];

		return domain;
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
		
		var elemsAsyncPage = document.querySelectorAll( defs.selectAsyncPage );
		
		instances = [];
		
		for ( var i = 0, len = elemsAsyncPage.length; i<len; i++ ) {
			instances.push( new AsyncPage( elemsAsyncPage[ i ] ) );
		}
		
		window.removeEventListener( 'popstate', statePop );
		window.addEventListener( 'popstate', statePop );
		origin = extractDomain( document.location.origin );
	};
	
	
	return {
		init: init
	};
   
   
}( window, document ));
