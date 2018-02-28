# merl.scrollToggle

[View demo](https://andreasnymark.github.io/#merl.scrollToggle)

Toggle class of element based on scroll position and viewport.

## Default markup

	<div class="js-scrollToggle">
		<div class="block">
			<h1>Content</h1>
		</div>
		<div class="block">
			<h1>Content</h1>
		</div>
	</div>

## Default settings

|Key|Type|Default|Note|
|---|---|---|---|
|`selector`|`string`|`.js-scrollToggle`||
|`selectBlock`|`string`|`.block`||
|`classInView`|`string`|`is-inView`||
|`classOutView`|`string`|`is-outOfView`||
|`toggleAbove`|`boolean`|`false`|Toggle class when element is above viewport|
|`minWidth`|`number`|`600`|Turn off for smaller devices.|

## Init

	merl.scrollToggle.init();
