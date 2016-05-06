pixySetup = function() {
	var GAME_WIDTH = 1000;
	var GAME_HEIGHT = 1000;

	var rendererOptions = {
		antialiasing: true,
		transparent: false,
		resolution: window.devicePixelRatio,
		autoResize: true
	}
	
	renderer = PIXI.autoDetectRenderer(GAME_WIDTH, GAME_HEIGHT,
		rendererOptions);

	stage = new PIXI.Container();

	var mibyContainer = document.querySelector("#miby");
	mibyContainer.appendChild(renderer.view);

	window.addEventListener("resize", resize);
	resize();

	function resize() {

		ratio = Math.min(window.innerWidth/GAME_WIDTH,
			((window.innerHeight * 0.8) - 16)/GAME_HEIGHT);

		stage.scale.x = stage.scale.y = ratio;

		renderer.resize(Math.ceil(GAME_WIDTH * ratio),
			Math.ceil(GAME_HEIGHT * ratio));
	}

	return [renderer, stage];
};