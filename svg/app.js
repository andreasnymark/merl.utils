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


	/**
	*
	*
	*/
	var init = function () {

		merl.utils.addClass( document.body, randomObj( defs.color ));



		document.querySelector( '.js-asyncLoadDoc' ).addEventListener( 'merl.newcontentloaded', function( evt ) {
			console.log( evt );
			merl.wordwrap.init();
			merl.svg.lorem();
		});



		// var navi = document.querySelectorAll( '.nav' );
		// for ( var j = 0, jLen = navi.length; j < jLen; j++ ) {
		// 	navi[ j ].addEventListener( 'click', merl.svg.lorem );
		// }









	};


	return {
		init: init,
		randomObj: randomObj,
	};
}( window, document ));
