/* 
Created on : May 6, 2016, 4:36:09 PM
Author     : niC00L, Ienze
*/

var colors = {plu: '0x008606', min: '0xff8000', tim: '0xf3f129', div: '0xf32929', none: '0xe1e1e1'};

//some necessary stuff
var pixySetuped = pixySetup();

var renderer = pixySetuped[0];
var stage = pixySetuped[1];
renderer.backgroundColor = 0xcccccc;

//generated level object
var generatedLevel;

function loadLevel(level) {
	for (var i = stage.children.length - 1; i >= 0; i--) {
		stage.removeChild(stage.children[i]);
	}
	generatedLevel = generateLevel(level);

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
	//squares dimensions
	var squareGap = 30;
	var canvasBorder = 30;

	var squareSize = (1000-(generatedLevel.size*squareGap+canvasBorder))/generatedLevel.size;

	for (var i = 0; i < generatedLevel.size; i++) {
		for (var j = 0; j < generatedLevel.size; j++) {
			
			var x = (squareSize + squareGap) * i + canvasBorder;
			var y = (squareSize + squareGap) * j + canvasBorder;

			var square = generatedLevel.map[i][j];
			var number = null;

			if (square) {
				op = square.operator;
				number = new PIXI.Text(square.number, {font: 'bold 48px Arial', fill: 0xffffff, align : 'center'});
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
		y: 0
	};
}

loadLevel(1);

var render = function () {
	renderer.render(stage);
	requestAnimationFrame(render);
};
render();