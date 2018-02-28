/*
*
*
*/
var merl = merl || {};

merl.app = ( function ( window, document ) {
	"use strict";

	var defs = {
		color: [ 'one', 'two', 'three', 'four' ]
	};

	var navItems = [];

	/**
	*
	*
	*/
	var randomObj = function ( obj ) {
		if ( typeof obj === 'object' ) {
			var rnd = Math.floor( Math.random() * obj.length );
			return obj[ rnd ];
		}
	};



	var activeNav = function ( evt ) {
		var current = evt.target,
			nav;

		for ( var i = 0, len = navItems.length; i < len; i++ ) {
			nav = navItems[ i ];
			if ( current === nav ) {
				merl.utils.addClass( nav, 'is-active' );
			} else {
				merl.utils.removeClass( nav, 'is-active' );
			}
		}
	};


	/**
	*
	*
	*/
	var init = function () {

		merl.utils.addClass( document.body, randomObj( defs.color ));



		document.querySelector( '.js-asyncLoadDoc' ).addEventListener( 'merl.newcontentloaded', function( evt ) {
			// console.log( evt );
			merl.wordwrap.init();
			merl.svg.lorem();

			window.scroll( 0, 0 );
		});


		navItems = document.querySelectorAll( '.nav' );


		for ( var i = 0, len = navItems.length; i < len; i++ ) {
			navItems[ i ].addEventListener( 'click', activeNav );
		}









	};


	return {
		init: init,
		randomObj: randomObj,
	};
}( window, document ));
