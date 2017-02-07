window.onload = function(){
					drawRail();
				};

$(window).resize( function() {
	drawRail();
});

function drawRail(){
	var w = $('#SVG').width();
	var h = $('#SVG').height();
	
	var d = "";
	d += "M 0 " + parseInt(h * 0.1) + " ";									// xy coord to start path
	d += "L " + parseInt(w * 0.75) + " " + parseInt(h * 0.1) + " ";			// draw straight line halfway across screen
	d += "q " + parseInt(w * 0.4) + " " + parseInt((h * 0.8) * 0.5) + " ";	// quadratic Bézier curve control point
	d += "0 " + parseInt(h * 0.8) + " ";									// end point of curve directly below start
	d += "L 0 " + parseInt(h * 0.9);										// straight line back to left of screen

	$('#path1').attr('d', d);
}

function redraw(){
	c1 = $('#C1')[0];
	c2 = $('#C2')[0];
	x1 = c1.getBoundingClientRect().left + 2;
	y1 = c1.getBoundingClientRect().top + 2;
	x2 = c2.getBoundingClientRect().left + 2;
	y2= c2.getBoundingClientRect().top + 2;
	
	$('#L1').attr('d','M ' + x1 + ' ' + y1 + ' L ' + x2 + ' ' + y2);
	
	window.requestAnimationFrame(redraw);
}

 window.requestAnimationFrame(redraw);
