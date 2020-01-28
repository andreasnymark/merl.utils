/**
 * Typer is a small, basic type testing tool using sample 
 * texts and the most core styling capabilities. 

 * @author Andreas Nymark <andreas@nymark.me>
 * @license MIT
 * @version 1
**/
var merl = merl || {};

merl.typer = ( function ( window, document ) {
	"use strict";

	var instances = [];
	var defs = {
		selector: '.js-typer',
		selectPreivew: '.Typer-preview',
		attrProperty: 'data-typer-prop',
		attrSync: 'data-typer-sync',
		sample: {
			'sv-h': 'Rubrik på svenska',
			'sv-p': 'Det kom en visshet över honom, medan han stod där, att han hade idel fiender i kyrkan, fiender i alla bänkar. Bland herrskaperna på läktaren, bland bönderna nere i kyrkan, bland nattvardsbarnen i koret hade han fiender, idel fiender. Det var en fiende, som trampade orgeln, en fiende, som spelade den. I kyrkovärdarnas bänk hade han fiender. Alla hatade honom, alltifrån de små barnen, som hade burits in i kyrkan, ända till kyrkvaktaren, en stel och styv soldat, som hade varit med vid Leipzig. ',
			'en-h': 'English headline',
			'en-p': 'Alice was beginning to get very tired of sitting by her sister on the bank and of having nothing to do: once or twice she had peeped into the book her sister was reading, but it had no pictures or conversations in it, “and what is the use of a book,” thought Alice, “without pictures or conversations?” — So she was considering, in her own mind (as well as she could, for the hot day made her feel very sleepy and stupid), whether the pleasure of making a daisy-chain would be worth the trou- ble of getting up and picking the daisies.',
			'fr-h': 'French headline',
			'fr-p': 'Longtemps, je me suis couché de bonne heure. Parfois, à peine ma bougie éteinte, mes yeux se fermaient si vite que je n’avais pas le temps de me dire: «Je m’endors.» Et, une demi-heure après, la pen- sée qu’il était temps de chercher le sommeil m’éveillait; je voulais poser le volume que je croyais avoir encore dans les mains et souffler ma lumière.',
		}
	};


	/**
	 * Initiate plugin

	 * @method init
	 * @param {Object} options - override default settings
	**/
	var init = function ( options ) {
		if( options ) {
			for( var o in options ) {
				defs[ o ] = options[ o ];
			}
		}

		instances = [];
		var items = document.querySelectorAll( defs.selector );
		var len = items.length;

		if ( len > 0 ) {
			for ( var i = 0; i < len; i++ ) {
				instances.push( new Typer( items[ i ] ) );
			}
		}
	};


	/**
	* @constructor Typer
	* @param {HTMLElement} elem - DOM Element
	*/
	var Typer = function ( elem ) {
		var t = this;
		if ( ! ( t instanceof Typer ) ) {
			return new Typer( elem );
		}

		t.elem = elem;
		t.hasCustom = false;
		t.customText = '';

		t.inputs = t.elem.querySelectorAll( '[' + defs.attrProperty + ']' );
		t.elemText = t.elem.querySelector( defs.selectPreivew );
		/* Handle this */ t.sampleSelect = t.elem.querySelector( '.js-sampleSelect' );

		t.update = t.update.bind( t );
		t.addCustomOpt = t.addCustomOpt.bind( t );
		t.updateText = t.updateText.bind( t );
		t.setLang = t.setLang.bind( t );
		
		t.updateStyle = t.updateStyle.bind( t );
		t.pasteRawText = t.pasteRawText.bind( t );
		t.inputCustomText = t.inputCustomText.bind( t );

		for ( var i = 0, len = t.inputs.length; i < len; i++ ) {
			t.inputs[ i ].addEventListener( 'input', t.update );
			t.inputs[ i ].addEventListener( 'focusin', selectAll );
		}
		t.elemText.addEventListener( 'paste', t.pasteRawText );
		t.elemText.addEventListener( 'input', t.inputCustomText );
	};

	Typer.prototype = {
		/**
		 * Core Type update event

		 * @method update
		 * @param evt { Object } Event
		**/
		update: function ( evt ) {
			if ( evt ) {
				var t = this;
				var val = evt.target.value;
				var prop = evt.target.getAttribute( defs.attrProperty );
				var sync = evt.target.getAttribute( defs.attrSync ) || false;
				
				if ( prop === 'sample' ) {
					if ( val === 'custom' ) {
						t.updateText( t.customText );
					} else {
						var lang = evt.target.querySelector( ':checked' ).getAttribute( 'data-typer-lang' ) || null;
						t.updateText( defs.sample[ val ] );	
						t.setLang( lang )
					}
				} else if ( prop === 'font-size' ) {
					t.updateStyle( prop, val + 'px' );
				} else {
					t.updateStyle( prop, val );
				}

				if ( sync ) t.elem.querySelector( sync ).value = val;
			}
		},

		/**
		 * Just pasting clean text, no HTML.

		 * @method pasteRawText
		 * @param evt {Object} Event
		**/
		pasteRawText: function ( evt ) {
			var t = this;
			var c = t.customText;

			if ( evt.clipboardData || evt.originalEvent.clipboardData ) {
				c = ( evt.originalEvent || evt ).clipboardData.getData( 'text/plain' );
			} else if ( window.clipboardData ) {
				c = window.clipboardData.getData( 'Text' );
			}

		  t.updateText( c );
  		evt.preventDefault();
		},

		/**
		 * Remove lang attribute, since we can’t 
		 * tell every time.
		**/
		setLang: function ( lang ) {
			var t = this;
			if ( lang ) {
				t.elemText.setAttribute( 'lang', lang );	
			} else {
				t.elemText.removeAttribute( 'lang' );
			}
		},

		/**
		 * Create element and add custom option 
		 * in sample select.
		**/
		addCustomOpt: function () {
			var t = this;
			var grp = document.createElement( 'optgroup' );
			var opt = document.createElement( 'option' );

			opt.value = 'custom';
			opt.innerHTML = 'Custom sample';
			
			grp.label = 'Other';
			grp.appendChild( opt );

			t.sampleSelect.appendChild( grp );
		},

		/**
		 * When user add/change sample text, we create and select 
		 * a custom option in select. Latest edit will always be 
		 * available to use again.
		**/
		inputCustomText: function ( evt ) {
			var t = this;
			t.customText = evt.target.innerText;
			if ( ! t.hasCustom ) {
				t.hasCustom = true;
				t.addCustomOpt();
			}
			t.activateCustom();
		},

		/**
		 * Set to custom option in sample select. 
		**/
		activateCustom: function () {
			var t = this;
			if ( t.hasCustom ) {
				var sample = t.sampleSelect;
				var opts = sample.options;
				for ( var opt, i = 0; opt = opts[ i ]; i++ ) {
					if ( opt.value == 'custom' ) {
						sample.selectedIndex = i;
						break;
					}
				}
			}
		},

		/**
		 * Set as innerText in element.

		 * @method updateText
		 * @param txt { String } 
		**/
		updateText: function ( txt ) {
			var t = this;
			try {
				if ( getWinWidth() < 600 ) {
					console.log( getWinWidth() );
					t.elemText.innerText = txt.substring( 0, 120 );		
				} else {
					t.elemText.innerText = txt;	
				}
				t.setLang();
			} catch ( err ) {
				alert( err.name + ' ' + err.message );
			}
		}, 

		/**
		 * With property from data-typer-prop, update and 
		 * set styles for text element.

		 * @method updateText
		 * @param prop { String } Correct CSS property, not javascript
		 * @param val { String } Correct CSS value
		**/
		updateStyle: function ( prop, val ) {
			var t = this;
			try {
				t.elemText.style[ prop ] = val;
			} catch ( err ) {
				alert( err.name + ' ' + err.message );
			}
		},
	};

	var selectAll = function ( evt ) {
		if ( evt.target.nodeName === 'INPUT' ) {
			evt.target.select();	
		}
	};

	/**
	 * @method getWinWidth
	 * @return { Number }
	**/
	var getWinWidth = function () {
		return ( window.innerWidth || document.documentElement.clientWidth );
	};

	return {
		init: init,
	};

} ( window, document ) );
