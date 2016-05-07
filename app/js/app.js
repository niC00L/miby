/* 
 Created on : May 6, 2016, 4:36:09 PM
 Author     : niC00L, Ienze
 */

var colors = {plu: '0x008606', min: '0xff8000', tim: '0xf3f129', div: '0xf32929', none: '0xe1e1e1', player: '0x2eb5b3'};

//some necessary stuff
var pixySetuped = pixySetup();

var renderer = pixySetuped[0];
var stage = pixySetuped[1];
renderer.backgroundColor = 0xcccccc;

//squares dimensions
var squareGap = 30;
var canvasBorder = 30;
var squareSize = null;

//generated level object
var generatedLevel;
function loadLevel(level) {
	for (var i = stage.children.length - 1; i >= 0; i--) {
		stage.removeChild(stage.children[i]);
	}
	generatedLevel = generateLevel(level);

	//squares dimensions
	squareSize = (1000 - (generatedLevel.size * squareGap + canvasBorder)) / generatedLevel.size;

	setupTopPanel();
	setupSquares();
	setupPlayer("Linda");

	//debug
	document.querySelector("#debug pre").innerHTML = JSON.stringify({
		size: generatedLevel.size,
		baseRange: generatedLevel.baseRange,
		previousTarget: generatedLevel.previousTarget,
		targetOperations: generatedLevel.targetOperations,
		targetUsefulOperations: generatedLevel.targetUsefulOperations,
		targetPossibilities: generatedLevel.targetPossibilities,
		allowedOperations: generatedLevel.allowedOperations,
		usefulTiles: generatedLevel.usefulTiles,
		uselessTiles: generatedLevel.uselessTiles
	}, null, " ");
}

function setupTopPanel() {
	document.querySelector("#level").innerHTML = generatedLevel.level;
	document.querySelector("#target").innerHTML = generatedLevel.target;
}

function setupSquares() {
	for (var i = 0; i < generatedLevel.size; i++) {
		for (var j = 0; j < generatedLevel.size; j++) {

			var x = (squareSize + squareGap) * i + canvasBorder;
			var y = (squareSize + squareGap) * j + canvasBorder;

			var square = generatedLevel.map[i][j];
			var number = null;

			if (square) {
				op = square.operator;
				number = new PIXI.Text(square.number, {font: 'bold 48px Arial', fill: 0xffffff, align: 'center'});

				number.x = x + 10;
				number.y = y + 10;
			}
			else {
				op = 'none';
			}

			var graphics = new PIXI.Graphics();

			graphics.beginFill(colors[op]);
			graphics.drawRoundedRect(x, y, squareSize, squareSize, 10);
			graphics.endFill();

			stage.addChild(graphics);
			if (square) {
				stage.addChild(number);
			}
		}
	}
}

function setupPlayer(name) {
	var playerSettings = {
		name: name,
		x: 0,
		y: 0,
		value: 0
	}
	var playerBox = new PIXI.Graphics();
	var x = (squareSize + squareGap) * playerSettings.x + canvasBorder;
	var y = (squareSize + squareGap) * playerSettings.y + canvasBorder;

	var number = new PIXI.Text(playerSettings.value, {font: 'bold 48px Arial', fill: 0xffffff, align: 'center'});
	number.x = x + 10;
	number.y = y + 10;

	console.log(stage.children);
	stage.removeChild(9);

	playerBox.beginFill(colors.player);
	playerBox.drawRoundedRect(x, y, squareSize, squareSize, 10);
	playerBox.endFill();

	stage.addChild(playerBox);
	stage.addChild(number);

	document.addEventListener('keydown', keyPressed);
	function keyPressed(key) {
		pressed = key.keyCode;
		if (pressed == 38) { //up
			playerBox.position.y -= 1 * squareSize + squareGap;
			number.y -= 1 * squareSize + squareGap;
			playerSettings.y -= 1;
		}
		if (pressed == 40) { //down
			playerBox.position.y += 1 * squareSize + squareGap;
			number.y += 1 * squareSize + squareGap;
			playerSettings.y += 1;
		}
		if (pressed == 37) { //left
			playerBox.position.x -= 1 * squareSize + squareGap;
			number.x -= 1 * squareSize + squareGap;
			playerSettings.x -= 1;
		}
		if (pressed == 39) { //right
			playerBox.position.x += 1 * squareSize + squareGap;
			number.x += 1 * squareSize + squareGap;
			playerSettings.x += 1;
		}
		playerValue()
	}

	function playerValue() {
		var squareValue = generatedLevel.map[playerSettings.x][playerSettings.y];
		if (squareValue) {
			playerSettings.value = applyOperation(squareValue, playerSettings.value);
			number.text = playerSettings.value;
			generatedLevel.map[playerSettings.x][playerSettings.y] = null;
			
			var empty = new PIXI.Graphics();
			empty.beginFill(colors.none);
			empty.drawRoundedRect(playerSettings.x * (squareSize + squareGap)+canvasBorder, playerSettings.y * (squareSize + squareGap)+canvasBorder, squareSize, squareSize, 10);
			empty.endFill();
			
			stage.addChild(empty);
		}
	}
}

loadLevel(1);

var render = function () {
	renderer.render(stage);
	requestAnimationFrame(render);
};
render();