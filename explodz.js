void(function(STEP, PERSPECTIVE) {
	function traverse(element) {
		var childNodes = element.childNodes, l = childNodes.length;
		for (var i = 0; i < l; i++) {
			var childNode = childNodes[i];
			if (childNode.nodeType === 1) {
				childNode.style.WebkitTransformStyle = 'preserve-3d';
				childNode.style.WebkitTransform = 'translateZ(' + STEP + 'px)';
				traverse(childNode);
			}
		}
	}
	
	var body = document.body;
	body.style.WebkitTransformStyle = 'preserve-3d';
	body.style.WebkitPerspective = 5000;
	
	var xCenter = (window.innerWidth/2).toFixed(2);
	var yCenter = (window.innerHeight/2).toFixed(2);
	body.style.WebkitPerspectiveOrigin = body.style.WebkitTransformOrigin = xCenter + "px " + yCenter +"px";
	

	traverse(body);
	
	document.addEventListener("mousemove", function (e) {
		var xrel = e.screenX / screen.width;
		var yrel = 1 - (e.screenY / screen.height);
		var xdeg = (yrel * 360 - 180).toFixed(2);
		var ydeg = (xrel * 360 - 180).toFixed(2);
		body.style.WebkitTransform = "rotateX(" + xdeg + "deg) rotateY(" + ydeg + "deg)";
	}, true);
} (25, 5000)); 