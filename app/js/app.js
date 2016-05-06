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
var generatedLevel = generateLevel(1);

function setupSquares() {
	//squares dimensions
	var squareGap = 30;
	var canvasBorder = 30;

	var levelArray = generatedLevel.level;

	var squareSize = (1000-(generatedLevel.size*squareGap+canvasBorder))/generatedLevel.size;

	for (var i = 0; i < generatedLevel.size; i++) {
		for (var j = 0; j < generatedLevel.size; j++) {
			
			var x = (squareSize + squareGap) * i + canvasBorder;
			var y = (squareSize + squareGap) * j + canvasBorder;

			var square = levelArray[i][j];
			if (square) {
				var op = square.operator;
				var number = new PIXI.Text(square.number, {font: 'bold 48px Arial', fill: 0xffffff, align : 'center'});
				number.x = x + 10;
				number.y = y + 10;
			}
			else {
				var op = 'none';
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
	}


}

setupSquares();
setupPlayer("Linda");

var render = function () {
	renderer.render(stage);
	requestAnimationFrame(render);
}
render();