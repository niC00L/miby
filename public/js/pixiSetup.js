var GAME_WIDTH = 1000;
var GAME_HEIGHT = 1000;
var stage = null;

pixySetup = function() {
	
	var rendererOptions = {
		antialiasing: true,
		transparent: false,
		resolution: window.devicePixelRatio,
		autoResize: true,
		backgroundColor: 0xcccccc
	};
	
	renderer = PIXI.autoDetectRenderer(GAME_WIDTH, GAME_HEIGHT,rendererOptions);

	var mibyContainer = document.querySelector("#miby");
	mibyContainer.appendChild(renderer.view);

	window.addEventListener("resize", resize);
	resize();

	function resize() {

		ratio = Math.min(window.innerWidth/GAME_WIDTH,
			((window.innerHeight * 0.8) - 16)/GAME_HEIGHT);

		if(stage) {
			stage.scale.x = stage.scale.y = ratio;
		}

		renderer.resize(Math.ceil(GAME_WIDTH * ratio),
			Math.ceil(GAME_HEIGHT * ratio));
	}

	return renderer;
};

newStage = function() {
	stage = new PIXI.Container();
	stage.scale.x = stage.scale.y = ratio;
	return stage;
};