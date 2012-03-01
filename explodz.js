void(function(STEP, PERSPECTIVE) {
	var stepDelta = 0.001
	function traverse(element) {
		var childNodes = element.childNodes, l = childNodes.length;
		for (var i = 0; i < l; i++) {
			var childNode = childNodes[i];
			if (childNode.nodeType === 1) {
				childNode.style.overflow = 'visible';
				childNode.style.WebkitTransformStyle = 'preserve-3d';
				childNode.style.WebkitTransform = 'translateZ(' + (STEP + (l - i) * stepDelta).toFixed(3) + 'px)';
				traverse(childNode);
			}
		}
	}
	
	var body = document.body;
	body.style.overflow = 'visible';
	body.style.WebkitTransformStyle = 'preserve-3d';
	body.style.WebkitPerspective = PERSPECTIVE;
	
	var xCenter = (window.innerWidth/2).toFixed(2);
	var yCenter = (window.innerHeight/2).toFixed(2);
	body.style.WebkitPerspectiveOrigin = body.style.WebkitTransformOrigin = xCenter + "px " + yCenter +"px";
	

	traverse(body);
	
	var mode = "ROTATE";
	
	document.addEventListener("mousemove", function (e) {
		if (mode === "ROTATE") {
			var xrel = e.screenX / screen.width;
			var yrel = 1 - (e.screenY / screen.height);
			var xdeg = (yrel * 360 - 180).toFixed(2);
			var ydeg = (xrel * 360 - 180).toFixed(2);
			body.style.WebkitTransform = "rotateX(" + xdeg + "deg) rotateY(" + ydeg + "deg)";
		} else if (mode === "PARALLAX") {
			var xrel = e.screenX / screen.width;
			var yrel = e.screenY / screen.height;
			var xpct = ((xrel - 0.5) * 1000 + 50).toFixed(2);
			var ypct = ((yrel - 0.5) * 1000 + 50).toFixed(2);
			body.style.WebkitPerspectiveOrigin = xpct + "% " + ypct +"%";
		}
	}, true);
	
	document.addEventListener("mouseup", function (e) {
		mode = mode === "ROTATE" ? "PARALLAX" :
			mode === "PARALLAX" ? "DISABLED" :
				"ROTATE";
	}, true);
	
	
} (25, 5000)); 