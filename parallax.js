

//https://codepen.io/rachsmith/post/how-to-move-elements-on-scroll-in-a-way-that-doesn-t-suck-too-bad
//https://codepen.io/anon/pen/dRPgpx

var gHeight, gWidth, gScrollHeight, gScrollOffset, gScrollPercent;
var gScrollCounter = 0;
var gLastMousePosition = {};
var gLastClickPosition = {};

var TOTAL_ROWS = 8;
var scaleElements = [];
var bubbleBackgroundElement;
var bubbleBackgroundRect;

var translateYFactors = [100, 20, -10];

var elDarkenDiv;

var elBubbles1;
var elBubbles2;
var elBubbles3;

var pre = prefix();
var gJsPrefix  = pre.lowercase;
if ( gJsPrefix == 'moz') {
	gJsPrefix = 'Moz'
}

var elFish, elFishDir, elFishChat;
var gFish = {};


export function kickStartAnimateScales(){
	resize();
	
	elDarkenDiv = document.getElementById("parallaxDarken");
	
	buildScaleElements();
	
	elBubbles1 = document.getElementById('bubbles1');
	elBubbles2 = document.getElementById('bubbles2');
	elBubbles3 = document.getElementById('bubbles3');
	
	elFish = document.getElementById('fish');
	elFishDir = document.getElementById('fish-direction');
	elFishChat = document.getElementById('fish-chat');
	moveFish();
	blowBubble();
	elFish.addEventListener("mouseover", stopFish);
	elFish.addEventListener("mouseout", moveFish);
	
	loop();
}

function stopFish(event) {
	//this is the original element the event handler was assigned to
	var e = event.toElement || event.relatedTarget;
	if (e.parentNode == this || e == this) {
	   return;
	}
		
    // handle mouse event here!
	//console.log('stopFish');
	elFish.style['transition'] = 'transform 10000s';
	
	clearTimeout(gFish.timeout);
}


function blowBubble(){
	
	var elToDestroy = document.getElementById('fish-bubble');
	if (elToDestroy){
		document.body.removeChild(elToDestroy);
	}
	
	var fishRect = elFish.getBoundingClientRect();
	var elFishBub = document.createElement('div');
	elFishBub.id = 'fish-bubble';
	elFishBub.className = 'fish-bubble';
	elFishBub.style.left = fishRect.left + 'px';
	elFishBub.style.top = fishRect.top + gHeight + 'px';
	
	if (hasClassName(elFishDir.className, 'flip-left')){
		elFishBub.className = addClassToString(elFishBub.className, 'bubble-left');
	}else{
		elFishBub.className = removeClassFromString(elFishBub.className, 'bubble-left');
	}
	
	document.body.appendChild(elFishBub);
	
	var fishTimeout = setTimeout(blowBubble, getRandom(5000));
	gFish.bubbleTimeout = fishTimeout;
}

function moveFish(){
	//console.log('moveFish');
	
	clearTimeout(gFish.timeout);
	
	var x = getRandom(gWidth) - 150;
	var y = getRandom(gHeight);
	
	if (x < gFish.previousX){
		elFishDir.className = addClassToString(elFishDir.className, 'flip-left');
		elFishDir.className = removeClassFromString(elFishDir.className, 'flip-right');
		elFishChat.className = addClassToString(elFishChat.className, 'left');
	}else{
		elFishDir.className = addClassToString(elFishDir.className, 'flip-right');
		elFishDir.className = removeClassFromString(elFishDir.className, 'flip-left');
		elFishChat.className = removeClassFromString(elFishChat.className, 'left');
		elFish.style.zIndex = '1001';
	}
	
	elFish.style['transform'] = 'translateX('+x+'px) translateY('+y+'px)';
	elFish.style['transition'] = 'transform 10s';
	
	var fishTimeout = setTimeout(moveFish, getRandom(10000));
	gFish.timeout = fishTimeout;
	
	gFish.previousX = x;
	gFish.previousY = y;
}


function loop() {
	gScrollOffset = window.pageYOffset || window.scrollTop;
	gScrollPercent = gScrollOffset/gScrollHeight || 0;
  
	for (var i=0; i<TOTAL_ROWS; i++){
		for (var j=0; j<scaleElements[i].length; j++){
			
			var translateYFactor = 0;
			var scaleFactor;
			if (i<3){
				translateYFactor = (i+1) * translateYFactors[i] * gScrollPercent;
				scaleFactor = 1-(gScrollPercent/2);
			}else if (i==3){
				scaleFactor = 1;
			}else{
				scaleFactor = 1+(gScrollPercent/2);
			}
			
			//console.log('translateY('+translateYFactor+'px) scale('+scaleFactor+')');
			scaleElements[i][j].style['webkitTransform'] = 'translateY('+translateYFactor+'px) scale('+scaleFactor+')';
		}
	}
	
	/*
	if (gScrollOffset <= 50 || !gScrollOffset){
		// Hide darken overlay if scroll is near the top so that cursor can interact with waves
		elDarkenDiv.style.display = 'none';
	}else{
		// Once user starts scrolling show overlay which will darken, and also render waves inaccessible to mouse actions
		var faderScroll = (gScrollOffset / 800);
		var fadeToColor = Math.min(faderScroll, 1);
		elDarkenDiv.style.display = 'block';
		elDarkenDiv.style.opacity = fadeToColor;
	}*/
	
	requestAnimationFrame(loop);
}


function buildScaleElements(){
	for (var i=0; i<TOTAL_ROWS; i++){
		
		var elCount = (i % 2 == 0) ? 6 : 7; 
		//alert('elCount for i = '+elCount);
		scaleElements[i] = Array();
		
		for (var j=0; j<elCount; j++){
			//alert('scaleCol'+(i+1)+'_'+(j+1));
			var scaleElement = document.getElementById('scaleCol'+(i+1)+'_'+(j+1));
			scaleElements[i].push(scaleElement);
		}
	}
}

function resize() {
  gWidth = window.innerWidth;
  gHeight = window.innerHeight;
  gScrollHeight = gHeight;
}

/* prefix detection http://davidwalsh.name/vendor-prefix */

function prefix() {
  var styles = window.getComputedStyle(document.documentElement, ''),
    pre = (Array.prototype.slice
      .call(styles)
      .join('') 
      .match(/-(moz|webkit|ms)-/) || (styles.OLink === '' && ['', 'o'])
    )[1],
    dom = ('WebKit|Moz|MS|O').match(new RegExp('(' + pre + ')', 'i'))[1];
  return {
    dom: dom,
    lowercase: pre,
    css: '-' + pre + '-',
    js: pre[0].toUpperCase() + pre.substr(1)
  };
}

function getRandom(upper) {
  return Math.random() * upper;
}


function hasClassName(className, searchClassName){
	//var hasSearchClassName = className.indexOf(searchClassName);
	//alert(hasSearchClassName);
	return (className.indexOf(searchClassName)>-1);
}
function addClassToString(className, classNameToAdd){
	var classes = className.split(classNameToAdd);
	for (var i=0; i<classes.length; i++){
		classes[i] = classes[i].trim();
	}
	classes.push(classNameToAdd)
	
	return classes.join(' ');
}

function removeClassFromString(className, classNameToRemove){
	var classes = className.split(classNameToRemove);
	for (var i=0; i<classes.length; i++){
		classes[i] = classes[i].trim();
	}
	return classes.join(' ');
}
