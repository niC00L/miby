/* 
 Created on : May 6, 2016, 4:36:09 PM
 Author     : niC00L, Ienze
 */

var colors = {plu: '0x008606', min: '0xff8000', tim: '0xf3f129', div: '0xf32929', none: '0xe1e1e1', player: '0x2eb5b3'};

//some necessary stuff
var renderer = pixySetup();

//squares dimensions
var squareGap = 30;
var canvasBorder = 30;
var squareSize = null;

//generated level object
var generatedLevel;

var playerSettings = {
	seed: "miby",
	name: name,
	x: 0,
	y: 0,
	value: null
};

function loadLevel(level) {
	newStage();

	generatedLevel = generateLevel(playerSettings.seed, level);

	//squares dimensions
	squareSize = (1000 - (generatedLevel.size * squareGap + canvasBorder)) / generatedLevel.size;

	setupTopPanel();
	setupSquares();
	setupPlayer();
	startLevel();
}

function changeSeed(seed) {
	playerSettings.seed = seed;
	loadLevel(generatedLevel.level);
}

function setupTopPanel() {
	document.querySelector("#level").innerHTML = generatedLevel.level;
	document.querySelector("#target").innerHTML = generatedLevel.target;
}

function setupSquares() {
	stage.squareContainers = [];
	for (var i = 0; i < generatedLevel.size; i++) {
		stage.squareContainers[i] = [];
		for (var j = 0; j < generatedLevel.size; j++) {

			var squareContainer = new PIXI.Container();
			squareContainer.x = (squareSize + squareGap) * i + canvasBorder;
			squareContainer.y = (squareSize + squareGap) * j + canvasBorder;

			var square = generatedLevel.map[i][j];
			var number = null;

			if (square) {
				op = square.operator;
				number = new PIXI.Text(square.number, {font: 'bold 48px Arial', fill: 0xffffff, align: 'center'});
				number.x = 20;
				number.y = 20;
			}
			else {
				op = 'none';
			}

			var graphics = new PIXI.Graphics();

			graphics.beginFill(colors[op]);
			graphics.drawRoundedRect(0, 0, squareSize, squareSize, 10);
			graphics.endFill();

			squareContainer.addChild(graphics);
			squareContainer.graphics = graphics;
			if (square) {
				squareContainer.addChild(number);
				squareContainer.number = number;
			}

			stage.addChild(squareContainer);
			stage.squareContainers[i][j] = squareContainer;
		}
	}
}

function setupPlayer() {

	playerSettings.value = generatedLevel.previousTarget;

	var playerContainer = new PIXI.Container();
	playerContainer.moved = function () {
		this.x = (squareSize + squareGap) * playerSettings.x + canvasBorder;
		this.y = (squareSize + squareGap) * playerSettings.y + canvasBorder;
	}
	playerContainer.moved();

	var playerBox = new PIXI.Graphics();

	var number = new PIXI.Text(playerSettings.value, {font: 'bold 48px Arial', fill: 0xffffff, align: 'center'});
	number.x = 20;
	number.y = 20;

	playerBox.beginFill(colors.player);
	playerBox.drawRoundedRect(0, 0, squareSize, squareSize, 10);
	playerBox.endFill();

	playerContainer.addChild(playerBox);
	playerContainer.playerBox = playerBox;
	playerContainer.addChild(number);
	playerContainer.number = number;

	stage.addChild(playerContainer);
	stage.playerContainer = playerContainer;
}

document.addEventListener("touchmove", function (event) {
	event.preventDefault();
}, false);

var swipe = new Hammer(document.querySelector("#miby"), {preventDefault: true});
swipe.get('swipe').set({direction: Hammer.DIRECTION_ALL});

swipe.on('dragleft swipeleft', function (ev) {
	keyPressed({keyCode: 37}, true);
});
swipe.on('dragright swiperight', function (ev) {
	keyPressed({keyCode: 39}, true);
});
swipe.on('dragup swipeup', function (ev) {
	keyPressed({keyCode: 38}, true);
});
swipe.on('dragdown swipedown', function (ev) {
	keyPressed({keyCode: 40}, true);
});

document.addEventListener('keydown', keyPressed);
function keyPressed(key, a) {
//	preventDefault(key);
	pressed = key.keyCode;
	if (pressed == 38) { //up
		//kedze pri touch evente nedostava cely objekt key, tak by to hadzalo chybu
		//preto je tu podmienka na disable len ked je stlacene tlacidlo
		if (!a) {
			key.preventDefault();
		}
		if (playerSettings.y == 0) {
			playerSettings.y = generatedLevel.size;
		}
		playerSettings.y -= 1;
		submitMoves += "u";
	}
	if (pressed == 40) { //down
		if (!a) {
			key.preventDefault();
		}
		if (playerSettings.y == generatedLevel.size - 1) {
			playerSettings.y = 0;
		} else {
			playerSettings.y += 1;
		}
		submitMoves += "d";
	}
	if (pressed == 37) { //left
		if (!a) {
			key.preventDefault();
		}
		if (playerSettings.x == 0) {
			playerSettings.x = generatedLevel.size;
		}
		playerSettings.x -= 1;
		submitMoves += "l";

	}
	if (pressed == 39) { //right
		if (!a) {
			key.preventDefault();
		}
		if (playerSettings.x == generatedLevel.size - 1) {
			playerSettings.x = 0;
		} else {
			playerSettings.x += 1;
		}
		submitMoves += "r";
	}

	stage.playerContainer.moved();

	playerValue();
}

function playerValue() {
	var squareValue = generatedLevel.map[playerSettings.x][playerSettings.y];
	if (squareValue) {
		playerSettings.value = applyOperation(squareValue, playerSettings.value);
		stage.playerContainer.number.text = playerSettings.value;
		generatedLevel.map[playerSettings.x][playerSettings.y] = null;

		//edit square
		var squareContainer = stage.squareContainers[playerSettings.x][playerSettings.y];
		squareContainer.graphics.clear();
		squareContainer.graphics.beginFill(colors.none);
		squareContainer.graphics.drawRoundedRect(0, 0, squareSize, squareSize, 10);
		squareContainer.graphics.endFill();
		squareContainer.removeChild(squareContainer.number);

		//proceed to next level
		if (playerSettings.value == generatedLevel.target) {
			nextLevel();
		}
	}
}

function nextLevel() {
	endLevel();
	loadLevel(generatedLevel.level + 1);
}

var submitTimer = null;
var submitStart = null;
var submitMoves = null;
function startLevel() {
	submitTimer = Date.now();
	submitStart = {
		x: playerSettings.x,
		y: playerSettings.y
	};
	submitMoves = "";
}

function endLevel() {
	var time = Date.now() - submitTimer;
	var serverAddress = 'http://ienze.me/miby';
	try {
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.open("POST", serverAddress+"/api/level");
		xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
		xmlhttp.send(JSON.stringify({
			"success": true,
			"name": playerSettings.name,
			"seed": playerSettings.seed,
			"generator": 1,
			"level": generatedLevel.level,
			"value": playerSettings.value,
			"time": time,
			"start": submitStart,
			"moves": submitMoves
		}));
	} catch (e) { }
}

loadLevel(1);

var render = function () {
	renderer.render(stage);
	requestAnimationFrame(render);
};
render();
