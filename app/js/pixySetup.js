pixySetup = function() {
	var GAME_WIDTH = 100;
	var GAME_HEIGHT = 100;

	var rendererOptions = {
		antialiasing: true,
		transparent: false,
		resolution: window.devicePixelRatio,
		autoResize: true
	}
	
	renderer = PIXI.autoDetectRenderer(GAME_WIDTH, GAME_HEIGHT,
		rendererOptions);

	stage = new PIXI.Container();

	resize();
	
	document.querySelector("#miby").appendChild(renderer.view);

	window.addEventListener("resize", resize);

	function resize() {

		ratio = Math.min(window.innerWidth/GAME_WIDTH,
			window.innerHeight/GAME_HEIGHT);

		stage.scale.x = stage.scale.y = ratio;

		renderer.resize(Math.ceil(GAME_WIDTH * ratio),
			Math.ceil(GAME_HEIGHT * ratio));
	}

	return [renderer, stage];
};