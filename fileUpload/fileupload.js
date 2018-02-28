/**
 * File upload via XMLHttpRequest.
 *
 * @author Andreas Nymark <andreas@nymark.me>
 * @license MIT
 * @version 1
**/
var merl = merl || {};

merl.fileUpload = ( function( window, document ) {
	"use strict";


	var defs = {
			event: 'click',
			selectElem: '.js-fileUpload',
			action: '/ajax/file',
		},
		instances = [],
		eventOpen = document.createEvent( 'Event' ),
		eventClose = document.createEvent( 'Event' );

	eventOpen.initEvent( 'merl.toggle.open', true, true);
	eventClose.initEvent( 'merl.toggle.close', true, true);

	/**
	 * Contructor
	 *
	**/
	var FileUpload = function ( elem ) {
		var t = this;
		t.xhr = new XMLHttpRequest();
		t.path = window.location.pathname;
		t.elem = elem;
		t.input = t.elem.querySelector( 'input[type="file"]' );
		t.action = defs.action;
		t.input.addEventListener( 'change', t.uploadFile.bind( t ) );
		t.xhr.addEventListener( 'load', t.xhrComplete.bind( t ) );
		t.xhr.addEventListener( 'error', t.xhrError.bind( t ) );
		t.xhr.addEventListener( 'abort', t.xhrAbort.bind( t ) );
		t.xhr.addEventListener( 'progress', t.xhrProgress.bind( t ) );
	};


	FileUpload.prototype = {

		/**
		 * Lorem
		 *
		 * @method handleLive
		**/
		uploadFile: function ( evt ) {
			var t = this,
				formData = new FormData(),
				files = evt.target.files;

			console.log( 'uploadFile!', files );

			// https://www.html5rocks.com/en/tutorials/file/xhr2/
			//for ( var i = 0, file; file = files[ i ]; ++i ) {
				formData.append( 'file', files[ 0 ] );
//console.log(file);

			//}

			formData.append( 'path', t.path );

			console.log( t.action );

			t.xhr.open( 'POST', t.action, true );
			t.xhr.setRequestHeader( 'X-Requested-With', 'XMLHttpRequest' );
			//t.xhr.setRequestHeader( 'Content-Type', 'application/x-www-form-urlencoded' );


			t.xhr.send( formData );



		},




		createThumb: function ( img ) {
			var t = this;



			var thumb = document.createElement( 'li' );
			thumb.classList.add( 'List-item' );
			thumb.innerHTML = '<img src="' + img + '" width="300">';



			var parElem = t.elem.parentNode;


			parElem.insertBefore( thumb, t.elem );

			t.input.setAttribute( 'style', '' );

			t.createNewFileUpload();

		},

		createNewFileUpload: function () {
			var t = this;

			var newElem = t.elem.cloneNode( true );

			var parElem = t.elem.parentNode;

			parElem.insertBefore( newElem, t.elem.nextSibling );
			parElem.removeChild( t.elem );



			instances.push( new FileUpload( newElem ) );

		},











		xhrProgress: function ( evt ) {
			var data = JSON.parse( this.xhr.responseText );

			if ( data.login ) window.location.href = '/';

			if ( evt.lengthComputable ) {
				console.log( ( evt.loaded / evt.total) * 100 + '%');
			}
		},
		xhrError: function ( evt ) {
			console.log( 'error', evt );
		},
		xhrAbort: function ( evt ) {},
		xhrComplete: function () {
			var data = JSON.parse( this.xhr.responseText );
			// console.log(  );
			this.createThumb( data.galleryimageurl );



		},

	};


    /**
     * Initiate plugin
     *
     * @method init
     * @param {Object} options - override default settings
    **/
    var init = function( options ) {
        if( options ) {
            for( var o in options ) {
                defs[ o ] = options[ o ];
            }
        }
        var all = document.querySelectorAll( defs.selectElem );
        // window.addEventListener( 'keydown', escapeToggle );
        // setup();

		for ( var i = 0, len = all.length; i < len; i++ ) {
			instances.push( new FileUpload( all[ i ] ) );
		}


		window.addEventListener( 'dragenter', function () {
			console.log( 'enter window dragging' );

			var i = instances[ instances.length - 1 ];
			i.elem.classList.add( 'make-big' );
			// slow

			merl.utils.css( i.input, {
				position: 'fixed',
				left: 0,
				top: 0,
				right: 0,
				bottom: 0,
				width: '100%',
				background: 'rgba(0,0,0,0.5)',
			});
			// add a Merl.css = https://plainjs.com/javascript/styles/set-and-get-css-styles-of-elements-53/
			// merl.css( i.input, { position:'fixed' } )

		} );


        document.querySelector( 'input[type="file"]' ).addEventListener( 'change', function( evt ) {

			if ( this.files.length > 0 ) {
				console.log( 'Trigger file upload', this.files );
			}
        	//uploadFiles('/server', this.files);
        }, false);
    };


	return {
		init: init,
	};

}( window, document ));
