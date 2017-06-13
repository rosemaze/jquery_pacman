

//https://codepen.io/rachsmith/post/how-to-move-elements-on-scroll-in-a-way-that-doesn-t-suck-too-bad
//https://codepen.io/anon/pen/dRPgpx

var TOTAL_ROWS = 8;
var scaleElements = [];

var translateYFactors = [100, 20, -10];



export function kickStartAnimateScales(){
	buildScaleElements();
	
	
	loop();
}

function loop() {
	var scrollHeight = window.innerHeight;
	var scrollOffset = window.pageYOffset || window.scrollTop;
	var scrollPercent = scrollOffset/scrollHeight || 0;
  
	var thresholdPos;
	for (var i=0; i<TOTAL_ROWS; i++){
		for (var j=0; j<scaleElements[i].length; j++){
			
			var translateYFactor = 0;
			var scaleFactor;
			if (i<3){
				
				translateYFactor = (i+1) * translateYFactors[i] * scrollPercent;
				/*
				if (i==0) {
					
				}else if (i==1) {
					translateYFactor = (i+1) * 20 * scrollPercent;
				}else if (i==2) {
					translateYFactor = (i+1) * -10 * scrollPercent;
				}
				*/
				scaleFactor = 1-(scrollPercent/2);
			}else if (i==3){
				scaleFactor = 1;
			}else{
				scaleFactor = 1+(scrollPercent/2);
			}
			
			scaleElements[i][j].style['webkitTransform'] = 'translateY('+translateYFactor+'px) scale('+scaleFactor+')';
		}
	}
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