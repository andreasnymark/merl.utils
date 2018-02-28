# merl.wordWrapper

[View demo](https://andreasnymark.github.io/#merl.wordWrapper)

…

## Default markup

	<h1 class="js-wordWrapper">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempora dolorum, a eligendi doloribus amet similique. </h1>	

## Default settings

|Key|Type|Default|Note|
|---|---|---|---|
|`selector`|`string`|`.js-wordWrapper`||
|`delay`|`number`|`100`|Adds styles (animation-delay) for each word.|
|`initDelay`|`number`|`500`|Adds inital delay before the animation starts.|
|`wrapElem`|`string`|`span`|What element|
|`wrapClass`|`string`||Class name added to each word|
|`wrapStyle`|`string`||Style added to each word|
|`attrData`|`string`|`data-wordWrapper`|Override default settings|

### Override default settings

	<h1 class="js-wordWrapper" data-wordWrapper='{"wrapElem": "u", "class": "blue"}'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempora dolorum, a eligendi doloribus amet similique.</h1>


## Event

|Event|Type|
|---|---|
|`merl.wordWrapper.end`|`animationend`|

## Init

	merl.wordWrapper.init();
